import{d as p,E as u,o as e,i as t,F as n,r as c,h as i,b as g,f as r,e as h,G as b,q as l,H as f}from"./index-a86022ab.js";import{g as y}from"./util-e9020baf.js";import"./iconify-6a43d462.js";const k={class:"container my-8 grid grid-cols-3 gap-4"},v={class:"flex items-center gap-2 text-gray-800"},x={class:"text-lg font-medium"},B={class:"ml-6 space-y-2 text-base text-gray-700"},C=["onClick"],H=p({__name:"KnowledgeBasePublicHome",setup(w){const d=g(),_=u({url:"helpdesk.helpdesk.doctype.hd_article_category.api.get_list_public",auto:!0});function m(o){d.push({name:f,params:{categoryId:o}})}return(o,E)=>(e(),t("div",k,[(e(!0),t(n,null,c(i(_).data,s=>(e(),t("div",{key:s.name,class:"space-y-4"},[r("div",v,[(e(),h(b(i(y)(s.icon)),{class:"h-4 w-4"})),r("div",x,l(s.category_name),1)]),r("div",B,[(e(!0),t(n,null,c(s.sub_categories,a=>(e(),t("div",{key:a.name,class:"w-max cursor-pointer border-b border-b-transparent pb-1 hover:border-b-gray-700",onClick:R=>m(a.name)},l(a.category_name),9,C))),128))])]))),128))]))}});export{H as default};
//# sourceMappingURL=KnowledgeBasePublicHome-784bca25.js.map
