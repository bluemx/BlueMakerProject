import{g as _,l as p,G as b,v as C,r as M,o as u,c as x,e as s,H as I,J as j,f as l,y as F,F as N,i as S,D as g,w as U,t as G,s as H,j as L,K as m}from"./app-380ca943.js";import{u as k}from"./builder-84dd1132.js";const T={class:"flex"},V=["disabled"],$={grid:"","grid-cols-2":"","my-5":"","gap-1":"","md:grid-cols-6":"","dark:text-neutral":""},P={__name:"BuilderDocManager",props:{defaultDoc:Object},setup(f){const o=f,r=k(),i=p(),e=p(""),n=p([]),a=b(()=>e.value==""||e.value==null?n.value:n.value.filter(t=>t.key.toLowerCase().includes(e.value.toLowerCase())));async function y(){const{data:t,error:d}=await H.from("documents").select("key");n.value=t}function D(){e.value=e.value.toUpperCase()}const h=b(()=>{let t=!1;return a.value&&a.value.length&&a.value[0].key==e.value&&(t=!0),t}),w=()=>{console.log(e.value,o.defaultDoc),r.newDoc(e.value,o.defaultDoc)};return C(()=>{i.value.showModal(),y()}),(t,d)=>{const B=M("router-link");return u(),x("dialog",{ref_key:"dialog",ref:i,class:"flex flex-col gap-2 bg-slate-100"},[s("div",T,[I(s("input",{"onUpdate:modelValue":d[0]||(d[0]=c=>F(e)?e.value=c:null),required:"","flex-grow":"","rounded-tl":"","p-2":"","text-center":"","dark:text-neutral":"",type:"email",placeholder:"ID",onInput:D},null,544),[[j,l(e)]]),s("button",{disabled:l(h),"border-1":"","rounded-tr":"","bg-slate":"","px-6":"","py-1":"","text-xs":"","text-white":"","disabled:bg-slate-1":"",onClick:w}," Nuevo ",8,V)]),s("div",$,[(u(!0),x(N,null,S(l(a),(c,z)=>(u(),g(B,{to:`/${l(r).type}/${c.key}`,"border-1":"","border-slate":"",rounded:"","p-1":"","text-center":"","text-xs":""},{default:U(()=>[s("button",null,G(c.key),1)]),_:2},1032,["to"]))),256))])],512)}}},q=_(P,[["__file","/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BuilderDocManager.vue"]]),v={__name:"index",setup(f){const o=k();o.type="riodas",o.doc=null;const r={title:"Title",clock:!0,countdown:0,intro:{buttons:{start:"Start"},content:[{block:"text",class:"",tag:!1,content:"Text at start"}]},activity:{scenes:[{block:"scene",name:"SC1",countdown:0,instructions:{open:!0,content:[{block:"group",class:"flex gap-2 items-center",content:[{block:"audio",class:"",file:"instruction.mp3"},{block:"text",class:"",text:"Instructions text goes here..."}]}]},content:[{block:"group",class:"",content:[{block:"text",class:"",text:"Activity content goes here..."},{block:"group",class:"text-center mt-10",content:[{block:"button",class:"mx-auto",content:"Finalize",to:"/end"}]}]}]}]},end:{buttons:{restart:!1},content:[{block:"group",class:"bg-slate-100 rounded p-5 text-center w-full",content:[{block:"text",content:"Congratulations, you finished the activity."}]},{block:"group",class:"text-center p-5",content:[{block:"finished"}]}]},symbols:{}};return(i,e)=>{const n=q;return l(o).doc?L("v-if",!0):(u(),g(n,{key:0,"default-doc":r}))}}};typeof m=="function"&&m(v);const J=_(v,[["__file","/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/riodas/index.vue"]]);export{J as default};