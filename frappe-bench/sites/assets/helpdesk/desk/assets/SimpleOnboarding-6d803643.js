import{d as f,x as b,Q as _,o as l,i as u,f as o,q as d,aj as U,v as x,g as m,h as s,_ as $,ak as L,N,F as O,r as j,n as W,w as B,a1 as G,S as C,a4 as T,E as w,al as D,ai as R,$ as z,e as S,G as Y,z as k,B as q,u as P,a as J,am as Q,b as X,an as Z}from"./index-a86022ab.js";import{I as K,L as ee,a as te,b as oe,c as ae,d as se,e as ne}from"./yandex-0c7818c3.js";import{u as le}from"./error-90c51c34.js";import{F as A}from"./FileUploader-c45cb8d3.js";const ie={class:"flex flex-col gap-2 text-gray-800"},re="We're excited to have you join us and explore the world of efficient customer support. 	We are here to transform the way you handle customer inquiries, streamline ticket 	management, and deliver outstanding service.",ce="Once again, welcome to Frappe Helpdesk! Let's hope for a long and smooth journey!",ue=f({__name:"OnboardingIntro",setup(p){return b(()=>_("onboarding_started")),(t,n)=>(l(),u("div",ie,[o("div",{class:"text-base text-gray-900"},d(re)),o("div",{class:"text-base text-gray-900"},d(ce))]))}}),H=U("onboarding",()=>{const p=x(0),t=x("");function n(){p.value++}return{next:n,service:t,step:p}}),de={class:"flex flex-col gap-4"},me="Did you know that our Helpdesk becomes even more powerful when 	integrated with email? With this integration, you can send and 	receive emails directly from your Helpdesk inbox. It streamlines 	communication and enhances productivity. Would you like assistance 	in setting up your email integration now?",_e=f({__name:"EmailIntro",setup(p){const{next:t}=H();return(n,i)=>(l(),u("div",de,[o("div",{class:"text-gray-700"},d(me)),m(s($),{label:"Let's go!",variant:"outline",class:"w-max",onClick:s(t)},null,8,["onClick"])]))}}),pe={class:"flex flex-col gap-4"},ge={class:"grid grid-cols-4 gap-4"},fe=["onClick"],ve=["src"],he={key:0,class:"flex items-center gap-2 rounded-xl p-2 ring-1 ring-gray-200"},xe={class:"text-xs text-gray-700"},be="Which service do you want to add?",ye=f({__name:"SelectService",setup(p){const t=H(),{next:n}=t,{service:i}=L(t),e=[{name:"GMail",icon:ee,info:"Setting up GMail requires you to enable two factor authentication 		and app specific passwords. Read more at https://support.google.com/accounts/answer/185833"},{name:"Outlook",icon:te},{name:"Sendgrid",icon:oe},{name:"SparkPost",icon:ae},{name:"Yahoo",icon:se},{name:"Yandex",icon:ne}],a=N(()=>e.find(c=>c.name===i.value)?.info);return b(()=>_("onboarding_email_select_service_reached")),(c,y)=>(l(),u("div",pe,[o("div",{class:"text-gray-700"},d(be)),o("div",ge,[(l(),u(O,null,j(e,r=>o("div",{key:r.name,class:W(["flex h-20 w-20 cursor-pointer items-center justify-center place-self-center rounded-xl bg-gray-100 hover:bg-gray-200",{"ring-2":r.name===s(i),"ring-gray-300":r.name===s(i)}]),onClick:v=>i.value=r.name},[m(s(G),{text:r.name},{default:B(()=>[o("img",{src:r.icon,class:"h-12 w-12"},null,8,ve)]),_:2},1032,["text"])],10,fe)),64))]),a.value?(l(),u("div",he,[m(s(K),{class:"h-12 w-12 text-blue-500"}),o("div",xe,d(a.value),1)])):C("",!0),m(s($),{label:"Continue",disabled:s(T.isEmpty)(s(i)),class:"w-max",variant:"outline",onClick:s(n)},null,8,["disabled","onClick"])]))}}),ke={class:"flex flex-col gap-4"},we=f({__name:"EmailCredentials",setup(p){const t=H(),{next:n}=t,{service:i}=L(t),e=x(""),a=x(""),c=x(""),y={GMail:{email_server:"imap.gmail.com",use_ssl:1,smtp_server:"smtp.gmail.com"},outlook:{email_server:"imap-mail.outlook.com",use_ssl:1,smtp_server:"smtp-mail.outlook.com"},Sendgrid:{smtp_server:"smtp.sendgrid.net",smtp_port:587},SparkPost:{smtp_server:"smtp.sparkpostmail.com"},Yahoo:{email_server:"imap.mail.yahoo.com",use_ssl:1,smtp_server:"smtp.mail.yahoo.com",smtp_port:587},Yandex:{email_server:"imap.yandex.com",use_ssl:1,smtp_server:"smtp.yandex.com",smtp_port:587}},r=w({url:"frappe.client.insert",onSuccess:()=>{_("onboarding_email_credentials_success"),n()},onError:E=>{le()(E),_("onboarding_email_credentials_fail")}}),v=z(()=>{r.submit({doc:{doctype:"Email Account",email_account_name:e.value,email_id:a.value,password:c.value,enable_incoming:!0,enable_outgoing:!0,default_incoming:!0,default_outgoing:!0,email_sync_option:"ALL",initial_sync_count:100,imap_folder:[{append_to:"HD Ticket",folder_name:"INBOX"}],create_contact:!0,track_email_status:!0,service:i.value,use_tls:1,use_imap:1,smtp_port:587,...y[i.value]}})},500);return b(()=>_("onboarding_email_credentials_reached")),(E,h)=>(l(),u("div",ke,[o("form",{class:"space-y-4",onSubmit:h[3]||(h[3]=R((...g)=>s(v)&&s(v)(...g),["prevent"]))},[m(s(D),{modelValue:e.value,"onUpdate:modelValue":h[0]||(h[0]=g=>e.value=g),label:"Account name",placeholder:"John Doe (Example.com)",type:"text",required:""},null,8,["modelValue"]),m(s(D),{modelValue:a.value,"onUpdate:modelValue":h[1]||(h[1]=g=>a.value=g),label:"Email",placeholder:"john.doe@example.com",type:"email",required:""},null,8,["modelValue"]),m(s(D),{modelValue:c.value,"onUpdate:modelValue":h[2]||(h[2]=g=>c.value=g),label:"Password",placeholder:"••••••••",type:"password",required:""},null,8,["modelValue"])],32),m(s($),{label:"Finish!",disabled:!e.value||!a.value||!c.value,loading:s(r).loading,class:"w-max",variant:"outline",onClick:s(v)},null,8,["disabled","loading","onClick"])]))}}),Se={class:"flex flex-col items-center justify-center gap-4"},$e="✔️",Ce="Fantastic! Your email is now active. You are ready unleash true 	potential of Frappe Helpdesk!",He=f({__name:"SuccessMessage",setup(p){return b(()=>_("onboarding_email_finished")),(t,n)=>(l(),u("div",Se,[o("div",{class:"text-7xl"},d($e)),o("div",{class:"text-center text-base italic text-gray-900"},d(Ce))]))}}),Ee={class:"flex flex-col gap-4"},De=f({__name:"SetupEmail",setup(p){const t=H(),{step:n}=L(t),i=[_e,ye,we,He];return b(()=>_("onboarding_email_reached")),(e,a)=>(l(),u("div",Ee,[(l(),S(Y(i[s(n)])))]))}}),Le={class:"flex flex-col gap-4"},Be=["src"],Fe="A favicon enhances your website by providing a small, recognizable icon that 	appears in browser tabs. It improves brand recognition, adds professionalism, 	aids navigation, establishes trust, and maintains brand consistency",Ie=f({__name:"SetupFavicon",setup(p){const t=x(null),n=w({url:"frappe.client.set_value",debounce:1e3,onSuccess(e){t.value=e.brand_favicon,_("onboarding_favicon_changed")}});function i(e){n.submit({doctype:"HD Settings",name:"HD Settings",fieldname:"brand_favicon",value:e.file_url})}return b(()=>_("onboarding_favicon_reached")),(e,a)=>{const c=k("Button"),y=k("ErrorMessage");return l(),u("div",Le,[o("div",{class:"text-gray-700"},d(Fe)),t.value?(l(),u("img",{key:0,class:"m-auto h-8 w-8",src:t.value},null,8,Be)):C("",!0),m(s(A),{onSuccess:a[0]||(a[0]=r=>i(r))},{default:B(({error:r,openFileSelector:v})=>[o("span",null,[m(c,{label:"Upload Favicon",loading:s(n).loading,class:"w-max",variant:"outline",onClick:v},null,8,["loading","onClick"]),m(y,{class:"mt-2",message:r},null,8,["message"])])]),_:1})])}}}),Ve={class:"flex flex-col gap-4"},Me=["src"],Ne="this will be used in many places, including login and loading screens. 	An image with transparent background and a resolution of 160 x 32 is preferred",Oe=f({__name:"SetupLogo",setup(p){const t=x(null),n=w({url:"frappe.client.set_value",debounce:1e3,onSuccess(e){t.value=e.brand_logo,_("onboarding_logo_changed")}});function i(e){n.submit({doctype:"HD Settings",name:"HD Settings",fieldname:"brand_logo",value:e.file_url})}return b(()=>_("onboarding_logo_reached")),(e,a)=>{const c=k("Button"),y=k("ErrorMessage");return l(),u("div",Ve,[o("div",{class:"text-gray-700"},d(Ne)),t.value?(l(),u("img",{key:0,class:"m-auto h-8",src:t.value},null,8,Me)):C("",!0),m(s(A),{onSuccess:a[0]||(a[0]=r=>i(r))},{default:B(({error:r,openFileSelector:v})=>[o("span",null,[m(c,{label:"Upload Logo",loading:s(n).loading,class:"w-max",variant:"outline",onClick:v},null,8,["loading","onClick"]),m(y,{class:"mt-2",message:r},null,8,["message"])])]),_:1})])}}}),je={viewBox:"0 0 256 256",width:"1.2em",height:"1.2em"},Ye=o("path",{fill:"currentColor",d:"m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"},null,-1),qe=[Ye];function Ae(p,t){return l(),u("svg",je,[...qe])}const Ue={name:"ph-check-bold",render:Ae},We={class:"flex flex-col gap-4 text-gray-800"},Ge={class:"relative flex items-center justify-end"},Te="Now, let's set a name for your Helpdesk that reflects your organization's 	identity and values. So, what would you like to name your Helpdesk?",Re="Choose a name that resonates with your brand and instills 	trust in your customers",ze="My Helpdesk",Pe=f({__name:"SetupName",setup(p){const t=x(!1),n=w({url:"frappe.client.set_value",debounce:1e3,onSuccess(){t.value=!0,_("onboarding_name_changed")}});function i(e){t.value=!1,n.submit({doctype:"HD Settings",name:"HD Settings",fieldname:"helpdesk_name",value:e})}return b(()=>_("onboarding_name_reached")),(e,a)=>{const c=k("Input");return l(),u("div",We,[q(d(Te)+" "),o("div",Ge,[m(c,{type:"text",class:"w-full",placeholder:ze,onInput:i}),t.value?(l(),S(s(Ue),{key:0,class:"absolute mr-2 w-6 text-green-500"})):C("",!0)]),o("div",{class:"italic text-gray-800"},d(Re))])}}}),Je={class:"flex flex-col gap-4 text-gray-800"},Qe="Did you know that our Helpdesk is designed to function independently, 	without relying on email? Our customer portal is finely tuned to be a 	standalone solution, eliminating the hassle of email setup. Would you 	like me to disable the email workflow for you?",Xe=f({__name:"SetupSkipEmail",setup(p){const t=x(!1),n=w({url:"frappe.client.set_value",debounce:1e3,onSuccess(e){t.value=e.skip_email_workflow;const c="onboarding_skip_email_"+(t.value?"yes":"no");_(c)}});function i(e){n.submit({doctype:"HD Settings",name:"HD Settings",fieldname:"skip_email_workflow",value:e})}return b(()=>_("onboarding_skip_email_reached")),(e,a)=>(l(),u("div",Je,[q(d(Qe)+" "),m(s($),{label:t.value?"No":"Yes",class:"w-max",variant:"outline",onClick:a[0]||(a[0]=c=>i(!t.value))},null,8,["label"])]))}}),Ze={class:"flex flex-col gap-4"},Ke=o("div",{class:"font-medium"},"Don't forget to star our GitHub repo",-1),et=o("div",{class:"font-medium"}," If you find any bugs, report them at the issue tracker ",-1),tt=o("div",{class:"font-medium"}," For any queries or support, reach out to our support portal ",-1),ot=o("div",{class:"font-medium"},"Or via our e-mail",-1),at=["href"],F="https://github.com/frappe/helpdesk",I="https://github.com/frappe/helpdesk/issues",V="https://frappedesk.com/helpdesk",M="hello@frappe.io",st=f({__name:"SuccessMessage",setup(p){return b(()=>_("onboarding_finished")),(t,n)=>(l(),u("div",Ze,[o("div",null,[Ke,o("a",{class:"text-sm text-gray-800",href:F,target:"_blank"},d(F))]),o("div",null,[et,o("a",{class:"text-sm text-gray-800",href:I,target:"_blank"},d(I))]),o("div",null,[tt,o("a",{class:"text-sm text-gray-800",href:V,target:"_blank"},d(V))]),o("div",null,[ot,o("a",{class:"text-sm text-gray-800",href:"mailto:"+M},d(M),8,at)])]))}}),nt={class:"flex h-screen w-screen items-center justify-center bg-gray-100"},lt={class:"container-box w-1/3 rounded-xl text-base text-gray-900"},it={class:"rounded-t-xl bg-white px-8 py-6"},rt={class:"mb-4 text-xl font-semibold"},ct={class:"flex justify-end rounded-b-xl bg-gray-200 px-8 py-3"},ut=f({__name:"SimpleOnboarding",setup(p){const t=X(),n=P(),i=J(),e=x(0),a=[{title:"Welcome to Frappe Helpdesk! 🎉",component:ue},{title:"Begin with a name! 🖋️",component:Pe},{title:"Let's set a logo 💫",component:Oe},{title:"How about a Favicon? 🌏",component:Ie},{title:"Did you know? 💡",component:Xe},{title:"Let's setup an email 📬",component:De},{title:"That's it for now! 🙏",component:st}],c=N(()=>[{label:"← Previous",appearance:"minimal",variant:"ghost",onClick(){e.value--},condition:e.value+1>1&&e.value+1<=a.length},{label:"Next →",appearance:"primary",variant:"solid",onClick(){e.value++},condition:e.value+1<a.length},{label:"Finish ✓",variant:"solid",onClick(){y()},condition:e.value+1===a.length}].filter(v=>v.condition));function y(){w({url:"frappe.client.set_value"}).submit({doctype:"HD Settings",name:"HD Settings",fieldname:"setup_complete",value:!0}).then(r)}function r(){t.replace({path:"/"})}return Q(()=>{(!n.hasDeskAccess||i.isSetupComplete)&&r()}),(v,E)=>{const h=k("Button");return l(),u("div",nt,[o("div",lt,[o("div",it,[o("div",rt,d(a[e.value].title),1),(l(),S(Y(a[e.value].component)))]),o("div",ct,[(l(!0),u(O,null,j(c.value,g=>(l(),S(h,{key:g.label,label:g.label,variant:g.variant,onClick:g.onClick},null,8,["label","variant","onClick"]))),128))])])])}}});const gt=Z(ut,[["__scopeId","data-v-ca2ae264"]]);export{gt as default};
//# sourceMappingURL=SimpleOnboarding-6d803643.js.map