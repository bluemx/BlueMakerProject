import{g as x,l as d,G as f,v as D,r as B,o as i,c as b,e as a,H as C,I as M,f as o,z as I,F as j,i as F,y as _,w as S,t as U,s as $,j as G,J as m}from"./app-9aebb73f.js";import{u as g}from"./builder-6253cffa.js";const H={class:"flex"},L=["disabled"],N={grid:"","grid-cols-2":"","my-5":"","gap-1":"","md:grid-cols-6":""},T={__name:"BuilderDocManager",props:{defaultDoc:Object},setup(p){const n=g(),c=d(),e=d(""),u=d([]),s=f(()=>e.value==""||e.value==null?u.value:u.value.filter(t=>t.key.toLowerCase().includes(e.value.toLowerCase())));async function v(){const{data:t,error:l}=await $.from("documents").select("key");u.value=t}function y(){e.value=e.value.toUpperCase()}const w=f(()=>{let t=!1;return s.value&&s.value.length&&s.value[0].key==e.value&&(t=!0),t});return D(()=>{c.value.showModal(),v()}),(t,l)=>{const h=B("router-link");return i(),b("dialog",{ref_key:"dialog",ref:c,class:"flex flex-col gap-2 bg-slate-100"},[a("div",H,[C(a("input",{"onUpdate:modelValue":l[0]||(l[0]=r=>I(e)?e.value=r:null),required:"","flex-grow":"","rounded-tl":"","p-2":"","text-center":"",type:"email",placeholder:"ID",onInput:y},null,544),[[M,o(e)]]),a("button",{disabled:o(w),"border-1":"","rounded-tr":"","bg-slate":"","px-6":"","py-1":"","text-xs":"","text-white":"","disabled:bg-slate-1":"",onClick:l[1]||(l[1]=r=>o(n).newDoc(o(e),p.defaultDoc))}," Nuevo ",8,L)]),a("div",N,[(i(!0),b(j,null,F(o(s),(r,z)=>(i(),_(h,{to:`/${o(n).type}/${r.key}`,"border-1":"","border-slate":"",rounded:"","p-1":"","text-center":"","text-xs":""},{default:S(()=>[a("button",null,U(r.key),1)]),_:2},1032,["to"]))),256))])],512)}}},V=x(T,[["__file","/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BuilderDocManager.vue"]]),k={__name:"index",setup(p){const n=g();n.type="riodas",n.doc=null;const c={title:"Title",clock:!0,countdown:0,intro:{buttons:{start:"Start"},content:[{block:"text",class:"",tag:!1,content:"Text at start"}]},activity:{scenes:[{block:"scene",name:"SC1",countdown:0,instructions:{open:!0,content:[{block:"group",class:"flex gap-2 items-center",content:[{block:"audio",class:"",file:"instruction.mp3"},{block:"text",class:"",text:"Instructions text goes here..."}]}]},content:[{block:"group",class:"",content:[{block:"text",class:"",text:"Activity content goes here..."},{block:"group",class:"text-center mt-10",content:[{block:"button",class:"mx-auto",content:"Finalize",to:"/end"}]}]}]}]},end:{buttons:{restart:!1},content:[{block:"group",class:"bg-slate-100 rounded p-5 text-center w-full",content:[{block:"text",content:"Congratulations, you finished the activity."}]},{block:"group",class:"text-center p-5",content:[{block:"finished"}]}]},symbols:{}};return(e,u)=>{const s=V;return o(n).doc?G("v-if",!0):(i(),_(s,{key:0,"default-doc":c}))}}};typeof m=="function"&&m(k);const A=x(k,[["__file","/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/riodas/index.vue"]]);export{A as default};