# Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals

import json
import re
from copy import deepcopy

import frappe
from bs4 import BeautifulSoup, PageElement
from frappe.utils import cstr, strip_html_tags, update_progress_bar
from frappe.utils.synchronization import filelock
from redis.commands.search.field import TagField, TextField
from redis.commands.search.indexDefinition import IndexDefinition
from redis.commands.search.query import Query
from redis.exceptions import ResponseError

from helpdesk.utils import is_agent

STOPWORDS = [
    "a",
    "is",
    "the",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "but",
    "by",
    "for",
    "if",
    "in",
    "into",
    "it",
    "no",
    "not",
    "of",
    "on",
    "or",
    "such",
    "that",
    "their",
    "then",
    "there",
    "these",
    "they",
    "this",
    "to",
    "was",
    "will",
    "with",
    "how",
    "what",
    "where",
    "when",
    "i",
    "you",
    "me",
    "do",
]


class Search:
    unsafe_chars = re.compile(r"[\[\]{}<>+]")

    def __init__(self, index_name, prefix, schema) -> None:
        self.redis = frappe.cache()
        self.index_name = index_name
        self.prefix = prefix
        self.schema = []
        for field in schema:
            self.schema.append(frappe._dict(field))

    def create_index(self):
        index_def = IndexDefinition(
            prefix=[f"{self.redis.make_key(self.prefix).decode()}:"],
        )
        schema = []
        for field in self.schema:
            kwargs = {
                k: v
                for k, v in field.items()
                if k in ["weight", "sortable", "no_index", "no_stem"]
            }
            if field.type == "tag":
                schema.append(TagField(field.name, **kwargs))
            else:
                schema.append(TextField(field.name, **kwargs))

        self.redis.ft(self.index_name).create_index(
            schema,
            definition=index_def,
            stopwords=STOPWORDS,
        )
        self._index_exists = True

    def add_document(self, id, doc):
        doc = frappe._dict(doc)
        doc_id = self.redis.make_key(f"{self.prefix}:{id}").decode()
        mapping = {}
        for field in self.schema:
            if field.name in doc:
                mapping[field.name] = cstr(doc[field.name])
        if self.index_exists():
            self.redis.ft(self.index_name).add_document(doc_id, replace=True, **mapping)

    def remove_document(self, id):
        key = self.redis.make_key(f"{self.prefix}:{id}").decode()
        if self.index_exists():
            self.redis.ft(self.index_name).delete_document(key)

    def search(
        self,
        query,
        start=0,
        page_length=5,
        highlight=False,
    ):
        query = self.clean_query(query)
        query = Query(query).paging(start, page_length)
        if highlight:
            query = query.highlight(tags=["<mark>", "</mark>"])

        query.summarize(fields=["description"])
        query.scorer("DISMAX")

        try:
            result = self.redis.ft(self.index_name).search(query)
        except ResponseError as e:
            print(e)
            return frappe._dict({"total": 0, "docs": [], "duration": 0})

        out = frappe._dict(docs=[], total=result.total, duration=result.duration)
        for doc in result.docs:
            id = doc.id.split(":", 1)[1]
            _doc = frappe._dict(doc.__dict__)
            _doc.id = id
            _doc.payload = json.loads(doc.payload) if doc.payload else None
            out.docs.append(_doc)
        return out

    def clean_query(self, query):
        query = query.strip().replace("-*", "*")
        query = self.unsafe_chars.sub(" ", query)
        query.strip()
        return query

    def spellcheck(self, query, **kwargs):
        return self.redis.ft(self.index_name).spellcheck(query, **kwargs)

    def drop_index(self):
        if self.index_exists():
            self.redis.ft(self.index_name).dropindex(delete_documents=True)

    def index_exists(self):
        self._index_exists = getattr(self, "_index_exists", None)
        if self._index_exists is None:
            try:
                self.redis.ft(self.index_name).info()
                self._index_exists = True
            except ResponseError:
                self._index_exists = False
        return self._index_exists


class HelpdeskSearch(Search):
    schema = [
        {"name": "name", "weight": 2},
        {"name": "subject", "weight": 6},
        {"name": "description", "weight": 6},
        {"name": "headings", "weight": 8},
        {"name": "team", "type": "tag"},
        {"name": "modified", "sortable": True},
        {"name": "creation", "sortable": True},
    ]

    DOCTYPE_FIELDS = {
        "HD Ticket": [
            "name",
            "subject",
            "description",
            "agent_group",
            "modified",
            "creation",
        ],
        "HD Article": [
            "name",
            "category",
            "title",
            "content",
            "modified",
            "creation",
            "category.category_name as category",
        ],
    }

    def __init__(self):
        super().__init__("helpdesk_idx", "search_doc", self.schema)

    def build_index(self):
        self.drop_index()
        self.create_index()
        records = self.get_records("HD Ticket") + self.get_records("HD Article")
        total = len(records)
        for i, doc in enumerate(records):
            self.index_doc(doc)
            if not hasattr(frappe.local, "request"):
                update_progress_bar("Indexing", i, total)

    def index_doc(self, doc):
        id = f"{doc.doctype}:{doc.name}"
        fields = None
        if doc.doctype == "HD Ticket":
            fields = {
                "doctype": doc.doctype,
                "name": doc.name,
                "subject": doc.subject,
                "team": doc.agent_group,
                "modified": doc.modified,
            }
        if doc.doctype == "HD Article":
            fields = {
                "doctype": doc.doctype,
                "name": doc.name,
                "subject": doc.title,
                "description": strip_html_tags(doc.content),
                "headings": doc.headings,
                "modified": doc.modified,
            }
        if fields:
            self.add_document(id, fields)

    def remove_doc(self, doc):
        key = f"{doc.doctype}:{doc.name}"
        self.remove_document(key)

    def extract_headings(self, content: str | None) -> str:
        try:
            soup = BeautifulSoup(content, "html.parser")
        except TypeError:
            ret = []
        else:
            ret = []
            for tag in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                for heading in soup.find_all(tag):
                    ret.append(heading.text)
        return json.dumps(ret)

    def get_sections(self, content: str) -> list[tuple[str, str]]:
        try:
            soup = BeautifulSoup(content, "html.parser")
        except TypeError:
            return []
        else:
            sections = []
            tag: PageElement
            section = ""
            heading = ""
            for tag in soup.find_all():
                if tag.name in ["p", "blockquote", "code"]:
                    section += tag.text + "\n"
                elif tag.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                    sections.append((heading, section))
                    section = ""
                    heading = tag.text
            sections.append((heading, section))
            return sections

    def scrub(self, text: str):
        # For permalink
        return re.sub(r"[^a-zA-Z0-9]+", "-", text).lower()

    def get_records(self, doctype):
        records = []
        for d in frappe.db.get_all(doctype, fields=self.DOCTYPE_FIELDS[doctype]):
            d.doctype = doctype
            if doctype == "HD Article":
                for heading, section in self.get_sections(d.content):
                    cd = deepcopy(d)
                    cd.name = d.name + f"#{self.scrub(heading)}"
                    cd.content = section
                    cd.headings = heading
                    records.append(cd)
            elif doctype == "HD Ticket":
                d.headings = self.extract_headings(d.description)
                records.append(d)
        return records


@frappe.whitelist()
def search(query, only_articles=False):
    search = HelpdeskSearch()
    query = search.clean_query(query)
    query_parts = query.split(" ")
    query = " ".join(
        [f"%{q}%" for q in query_parts if q not in STOPWORDS]
    )  # for stopwords to be ignored
    result = search.search(query, start=0, highlight=True)
    groups = {}
    for r in result.docs:
        doctype, name = r.id.split(":")
        r.doctype = doctype
        r.name = name
        if doctype == "HD Ticket" and not only_articles:
            if not is_agent():
                r = []
            groups.setdefault("Tickets", []).append(r)
        if doctype == "HD Article":
            groups.setdefault("Articles", []).append(r)

    out = []
    for key in groups:
        out.append({"title": key, "items": groups[key]})
    return out


@filelock("helpdesk_search_indexing", timeout=60)
def build_index():
    frappe.cache().set_value("helpdesk_search_indexing_in_progress", True)
    search = HelpdeskSearch()
    search.build_index()
    frappe.cache().set_value("helpdesk_search_indexing_in_progress", False)


def build_index_in_background():
    if not frappe.cache().get_value("helpdesk_search_indexing_in_progress"):
        frappe.enqueue(build_index, queue="long")


def build_index_if_not_exists():
    search = HelpdeskSearch()
    if not search.index_exists():
        build_index()


@filelock("helpdesk_corpus_download", timeout=60)
def download_corpus():
    from nltk import data, download

    try:
        data.find("taggers/averaged_perceptron_tagger_eng.zip")
        data.find("tokenizers/punkt_tab.zip")
    except LookupError:
        download("averaged_perceptron_tagger_eng")
        download("punkt_tab")