import{c as o,j as n,k as i,x as r,I as f}from"./frappe-ui-CNy1brZ0.js";const u={viewBox:"0 0 48 24",preserveAspectRatio:"xMidYMin slice",class:"h-[84px] w-[84px] -mt-10"},p=r("circle",{cx:"24",cy:"24",r:"9",fill:"#fff"},null,-1),d=r("circle",{class:"stroke-current text-gray-200",cx:"24",cy:"24",r:"9",fill:"transparent","stroke-width":"4"},null,-1),h=["stroke-dasharray","stroke-dashoffset"],x={__name:"SemicircleChart",props:{percentage:{type:Number,default:0},colorClass:{type:String,default:"text-orange-500"}},setup(s){const c=s,a=o(()=>2*Math.PI*9),l=o(()=>{let e=a.value/2;if(isNaN(c.percentage))return e;let t=c.percentage;return t>100&&(t=100),e-t/100*e});return(e,t)=>(n(),i("svg",u,[p,d,r("circle",{class:f(["stroke-current",s.colorClass]),cx:"24",cy:"24",r:"9",fill:"transparent","stroke-width":"4","stroke-dasharray":a.value,"stroke-dashoffset":l.value},null,10,h)]))}};export{x as default};
//# sourceMappingURL=SemicircleChart-BtgAnm9U.js.map
