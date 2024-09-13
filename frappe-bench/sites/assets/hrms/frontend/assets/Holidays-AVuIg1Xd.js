import{I as Y}from"./index-hZNpbKUh.js";import{i as g,O as B,c as C,f as H,j as t,k as o,x as e,q as r,a5 as h,F as d,H as b,l as w,t as v,K as c,y as k,n as M,I as V}from"./frappe-ui-CNy1brZ0.js";const D={class:"flex flex-col gap-5 w-full"},E={class:"flex flex-row justify-between items-center"},I=e("div",{class:"text-lg text-gray-800 font-bold"},"Upcoming Holidays",-1),N={key:0,id:"open-holiday-list",class:"text-sm text-gray-800 font-semibold cursor-pointer underline underline-offset-2"},S={key:0,class:"flex flex-col bg-white rounded"},$={class:"flex flex-row items-center gap-3 grow"},A={class:"text-base font-normal text-gray-800"},F={class:"text-base font-bold text-gray-800"},L={class:"bg-white w-full flex flex-col items-center justify-center pb-5"},q=e("div",{class:"w-full pt-8 pb-5 border-b text-center"},[e("span",{class:"text-gray-900 font-bold text-lg"},"Holiday List")],-1),z={class:"w-full flex flex-col items-center justify-center gap-5 p-4"},K={class:"flex flex-row items-center gap-3 grow"},O={class:"text-base font-normal text-gray-800"},J={__name:"Holidays",setup(R){const j=g("$employee"),f=g("$dayjs"),i=B({url:"hrms.api.get_holidays_for_employee",params:{employee:j.data.name},auto:!0,transform:l=>l.map(s=>{const n=f(s.holiday_date);return s.is_upcoming=n.isAfter(f()),s.formatted_holiday_date=n.format("ddd, D MMM YYYY"),s})}),_=C(()=>{var s;const l=(s=i.data)==null?void 0:s.filter(n=>n.is_upcoming);return l==null?void 0:l.slice(0,5)});return(l,s)=>{var m,u,p,x,y;const n=H("EmptyState");return t(),o(d,null,[e("div",D,[e("div",E,[I,(u=(m=r(i))==null?void 0:m.data)!=null&&u.length?(t(),o("div",N," View All ")):h("",!0)]),(p=_.value)!=null&&p.length?(t(),o("div",S,[(t(!0),o(d,null,b(_.value,a=>(t(),o("div",{class:"flex flex-row flex-start p-4 items-center justify-between border-b",key:a.holiday_date},[e("div",$,[w(r(v),{name:"calendar",class:"h-5 w-5 text-gray-500"}),e("div",A,c(a.description),1)]),e("div",F,c(a.formatted_holiday_date),1)]))),128))])):(t(),k(n,{key:1,message:"You have no upcoming holidays"}))]),(y=(x=r(i))==null?void 0:x.data)!=null&&y.length?(t(),k(r(Y),{key:0,ref:"modal",trigger:"open-holiday-list","initial-breakpoint":1,breakpoints:[0,1]},{default:M(()=>[e("div",L,[q,e("div",z,[(t(!0),o(d,null,b(r(i).data,a=>(t(),o("div",{key:a.holiday_date,class:"flex flex-row items-center justify-between w-full"},[e("div",K,[w(r(v),{name:"calendar",class:"h-5 w-5 text-gray-500"}),e("div",O,c(a.description),1)]),e("div",{class:V(["text-base font-bold",a.is_upcoming?"text-gray-800":"text-gray-500"])},c(a.formatted_holiday_date),3)]))),128))])])]),_:1},512)):h("",!0)],64)}}};export{J as default};
//# sourceMappingURL=Holidays-AVuIg1Xd.js.map
