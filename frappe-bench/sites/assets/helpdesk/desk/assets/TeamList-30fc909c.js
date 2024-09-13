import{d as v,v as u,E as w,a6 as T,z as b,o as g,i as y,g as t,w as n,h as a,f as E,ai as x,b as N,bo as p,a4 as d,O as V,D as k}from"./index-a86022ab.js";import{c as h}from"./listManager-63aba0ed.js";import{u as C}from"./error-90c51c34.js";import{_ as D}from"./PageTitle.vue_vue_type_script_setup_true_lang-022e67c2.js";import"./vuedraggable.umd-9334f31c.js";import{_ as B}from"./LV.vue_vue_type_script_setup_true_lang-23701244.js";import"./iconify-6a43d462.js";import{_ as A}from"./plus-3ad50efe.js";import"./EmptyMessage.vue_vue_type_script_setup_true_lang-123dde9f.js";import"./TabButtons-ea997705.js";import"./label-fe9568ec.js";const L={class:"flex flex-col"},j=v({__name:"TeamList",setup(M){const c=N(),l=u(!1),o=u(null),f=[{label:"Name",key:"name",width:"w-80"},{label:"Assignment rule",key:"assignment_rule",width:"w-80"}],_=h({doctype:"HD Team",fields:["name","assignment_rule"],auto:!0,transform:r=>{for(const e of r)e.onClick={name:p,params:{teamId:e.name}};return r}}),m=w({url:"frappe.client.insert",makeParams(){return{doc:{doctype:"HD Team",team_name:o.value}}},validate(r){if(d.isEmpty(r.doc.team_name))return"Title is required"},auto:!1,onSuccess(){c.replace({name:p,params:{teamId:o.value}})},onError:C({title:"Error creating team"})});return T(()=>({title:"Teams"})),(r,e)=>{const i=b("Button");return g(),y("div",L,[t(D,{title:"Teams"},{right:n(()=>[t(i,{label:"New team",theme:"gray",variant:"solid",onClick:e[0]||(e[0]=s=>l.value=!l.value)},{prefix:n(()=>[t(a(A),{class:"h-4 w-4"})]),_:1})]),_:1}),t(a(B),{columns:f,resource:a(_),class:"mt-2.5",doctype:"HD Team"},null,8,["resource"]),t(a(k),{modelValue:l.value,"onUpdate:modelValue":e[3]||(e[3]=s=>l.value=s),options:{title:"New team"}},{"body-content":n(()=>[E("form",{class:"space-y-2",onSubmit:e[2]||(e[2]=x((...s)=>a(m).submit&&a(m).submit(...s),["prevent"]))},[t(a(V),{modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=s=>o.value=s),label:"Title",placeholder:"Product experts",type:"text"},null,8,["modelValue"]),t(i,{disabled:a(d.isEmpty)(o.value),class:"w-full",label:"Create",theme:"gray",variant:"solid"},null,8,["disabled"])],32)]),_:1},8,["modelValue"])])}}});export{j as default};
//# sourceMappingURL=TeamList-30fc909c.js.map