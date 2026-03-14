var R=Object.defineProperty,I=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var V=(i,t,r)=>t in i?R(i,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[t]=r,C=(i,t)=>{for(var r in t||(t={}))L.call(t,r)&&V(i,r,t[r]);if(_)for(var r of _(t))U.call(t,r)&&V(i,r,t[r]);return i},z=(i,t)=>I(i,A(t));import{f as j,g as G,o as h,h as f,n as S,j as N,a as o,t as b,i as F,u as P,k as E,v as W,x as w,b as s,w as p,d as n,F as J,y as Y,r as T}from"./index.c7605047.js";import{R as q,_ as H,s as u}from"./BasePage.fcaa71f8.js";import{s as K}from"./selectbutton.esm.16ac88ec.js";import{s as M,a as v}from"./dialog.esm.99c23aaa.js";import"./inputtext.esm.d1f21fa9.js";var g={name:"ToggleButton",emits:["update:modelValue","change"],props:{modelValue:Boolean,onIcon:String,offIcon:String,onLabel:String,offLabel:String,iconPos:{type:String,default:"left"}},methods:{onClick(i){this.$attrs.disabled||(this.$emit("update:modelValue",!this.modelValue),this.$emit("change",i))}},computed:{buttonClass(){return{"p-button p-togglebutton p-component":!0,"p-button-icon-only":this.hasIcon&&!this.hasLabel,"p-disabled":this.$attrs.disabled,"p-highlight":this.modelValue===!0}},iconClass(){return[this.modelValue?this.onIcon:this.offIcon,"p-button-icon",{"p-button-icon-left":this.iconPos==="left"&&this.label,"p-button-icon-right":this.iconPos==="right"&&this.label}]},hasLabel(){return this.onLabel&&this.onLabel.length>0&&this.offLabel&&this.offLabel.length>0},hasIcon(){return this.onIcon&&this.onIcon.length>0&&this.offIcon&&this.offIcon.length>0},label(){return this.hasLabel?this.modelValue?this.onLabel:this.offLabel:"&nbsp;"}},directives:{ripple:q}};const Q=["aria-checked","tabindex"],X={class:"p-button-label"};function Z(i,t,r,e,d,c){const k=j("ripple");return G((h(),f("div",{class:S(c.buttonClass),onClick:t[0]||(t[0]=x=>c.onClick(x)),role:"checkbox","aria-checked":r.modelValue,tabindex:i.$attrs.disabled?null:"0"},[c.hasIcon?(h(),f("span",{key:0,class:S(c.iconClass)},null,2)):N("",!0),o("span",X,b(c.label),1)],10,Q)),[[k]])}g.render=Z;var y={name:"Divider",props:{align:{type:String,default:null},layout:{type:String,default:"horizontal"},type:{type:String,default:"solid"}},computed:{containerClass(){return["p-divider p-component","p-divider-"+this.layout,"p-divider-"+this.type,{"p-divider-left":this.layout==="horizontal"&&(!this.align||this.align==="left")},{"p-divider-center":this.layout==="horizontal"&&this.align==="center"},{"p-divider-right":this.layout==="horizontal"&&this.align==="right"},{"p-divider-top":this.layout==="vertical"&&this.align==="top"},{"p-divider-center":this.layout==="vertical"&&(!this.align||this.align==="center")},{"p-divider-bottom":this.layout==="vertical"&&this.align==="bottom"}]}}};const ee={key:0,class:"p-divider-content"};function te(i,t,r,e,d,c){return h(),f("div",{class:S(c.containerClass),role:"separator"},[i.$slots.default?(h(),f("div",ee,[F(i.$slots,"default")])):N("",!0)],2)}function ne(i,t){t===void 0&&(t={});var r=t.insertAt;if(!(!i||typeof document=="undefined")){var e=document.head||document.getElementsByTagName("head")[0],d=document.createElement("style");d.type="text/css",r==="top"&&e.firstChild?e.insertBefore(d,e.firstChild):e.appendChild(d),d.styleSheet?d.styleSheet.cssText=i:d.appendChild(document.createTextNode(i))}}var oe=`
.p-divider-horizontal {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    position: relative;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.p-divider-horizontal:before {
    position: absolute;
    display: block;
    top: 50%;
    left: 0;
    width: 100%;
    content: "";
}
.p-divider-horizontal.p-divider-left {
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
}
.p-divider-horizontal.p-divider-right {
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
}
.p-divider-horizontal.p-divider-center {
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}
.p-divider-content {
    z-index: 1;
}
.p-divider-vertical {
    min-height: 100%;
    margin: 0 1rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}
.p-divider-vertical:before {
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    height: 100%;
    content: "";
}
.p-divider-vertical.p-divider-top {
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
}
.p-divider-vertical.p-divider-center {
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.p-divider-vertical.p-divider-bottom {
    -webkit-box-align: end;
        -ms-flex-align: end;
            align-items: flex-end;
}
.p-divider-solid.p-divider-horizontal:before {
    border-top-style: solid;
}
.p-divider-solid.p-divider-vertical:before {
    border-left-style: solid;
}
.p-divider-dashed.p-divider-horizontal:before {
    border-top-style: dashed;
}
.p-divider-dashed.p-divider-vertical:before {
    border-left-style: dashed;
}
.p-divider-dotted.p-divider-horizontal:before {
    border-top-style: dotted;
}
.p-divider-dotted.p-divider-horizontal:before {
    border-left-style: dotted;
}
`;ne(oe);y.render=te;const ie=o("b",null,"Deal play by",-1),le={class:"played-by"},ae=o("span",null,null,-1),se={class:"round-data"},re=o("b",null,"Deal data",-1),de={class:"field-checkbox-input"},ce=o("label",{for:"binary"},[o("span",null,"Terz")],-1),pe={class:"field-checkbox-input"},ue=o("label",{for:"binary"},[o("span",null,"Poltina")],-1),me=o("b",null,"Deal points",-1),be={class:"round-scores"},he={class:"round-scores-team"},fe={class:"round-scores-team"},ve={class:"button-wrapper"},ge=o("div",{class:"confirmation-content"},[o("h3",null,"Reset current game?")],-1),Ve={__name:"RoundSetup",setup(i){const t=P(),r=E([{value:"teamOne",name:t.teamOne},{value:"teamTwo",name:t.teamTwo}]),e=W({roundNumber:t.currentRoundNumber,dealer:"",playedBy:null,trump:"diamonds",terzAmount:0,poltinaAmount:0,bella:!1,teamOneScore:0,teamTwoScore:0,teamOneNoBribes:!1,teamTwoNoBribes:!1}),d=w(()=>{const m=e.terzAmount?e.terzAmount*20:0,a=e.poltinaAmount?e.poltinaAmount*50:0,l=e.bella?20:0;return 162+m+a+l}),c=()=>{e.teamOneScore=d.value-e.teamTwoScore},k=()=>{e.teamTwoScore=d.value-e.teamOneScore},x=w(()=>e.teamOneScore+e.teamTwoScore!==d.value||!e.playedBy),O=w(()=>e.teamOneScore===e.teamTwoScore),B=()=>{t.updateFullRoundScore(z(C({},e),{currentRoundSum:d,isDraw:O.value}));const m={isGameOn:t.isGameOn,teamOne:t.teamOne,teamTwo:t.teamTwo,fullGame:t.fullGame,game:t.game};localStorage.setItem("game",JSON.stringify(m)),T.push("/scores")},$=()=>{t.resetGame(),localStorage.removeItem("game"),T.push("/game-setup")},D=()=>{t.toggleDialog(),$()};return(m,a)=>(h(),f(J,null,[s(H,{"page-title":`Deal #${n(t).currentRoundNumber}`,class:"round-setup"},{content:p(()=>[s(n(y),{align:"left",type:"dashed"},{default:p(()=>[ie]),_:1}),o("div",le,[s(n(K),{modelValue:e.playedBy,"onUpdate:modelValue":a[0]||(a[0]=l=>e.playedBy=l),options:r.value,"data-key":"value"},{option:p(l=>[o("span",null,b(l.option.name),1),ae]),_:1},8,["modelValue","options"])]),o("div",se,[s(n(y),{align:"left",type:"dashed"},{default:p(()=>[re]),_:1}),o("div",de,[ce,s(n(v),{modelValue:e.terzAmount,"onUpdate:modelValue":a[1]||(a[1]=l=>e.terzAmount=l),"show-buttons":"","button-layout":"horizontal",type:"tel",step:1,min:0,max:6,"decrement-button-class":"p-button-danger","increment-button-class":"p-button-success","increment-button-icon":"pi pi-plus","decrement-button-icon":"pi pi-minus"},null,8,["modelValue"])]),o("div",pe,[ue,s(n(v),{modelValue:e.poltinaAmount,"onUpdate:modelValue":a[2]||(a[2]=l=>e.poltinaAmount=l),"show-buttons":"",type:"tel","button-layout":"horizontal",step:1,min:0,max:4,"decrement-button-class":"p-button-danger","increment-button-class":"p-button-success","increment-button-icon":"pi pi-plus","decrement-button-icon":"pi pi-minus"},null,8,["modelValue"])]),s(n(g),{modelValue:e.bella,"onUpdate:modelValue":a[3]||(a[3]=l=>e.bella=l),class:"no-bribes-button","on-label":"Bela","off-label":"Bela","on-icon":"pi pi-check","off-icon":"pi pi-times"},null,8,["modelValue"]),s(n(y),{align:"left",type:"dashed"},{default:p(()=>[me,Y(" "+b(n(d)),1)]),_:1}),o("div",be,[o("div",he,[o("h4",null,b(n(t).teamOne),1),s(n(v),{modelValue:e.teamOneScore,"onUpdate:modelValue":a[4]||(a[4]=l=>e.teamOneScore=l),type:"tel",placeholder:"0",min:0,max:n(d),class:"w-5rem"},null,8,["modelValue","max"]),s(n(u),{icon:"pi pi-refresh",class:"p-button-secondary refresh-button",onClick:k}),s(n(g),{modelValue:e.teamOneNoBribes,"onUpdate:modelValue":a[5]||(a[5]=l=>e.teamOneNoBribes=l),disabled:e.teamOneScore!==0,class:"no-bribes-button","on-label":"No tricks","off-label":"No tricks","on-icon":"pi pi-check","off-icon":"pi pi-times"},null,8,["modelValue","disabled"])]),o("div",fe,[o("h4",null,b(n(t).teamTwo),1),s(n(v),{modelValue:e.teamTwoScore,"onUpdate:modelValue":a[6]||(a[6]=l=>e.teamTwoScore=l),type:"tel",placeholder:"0",min:0,max:n(d),class:"w-5rem"},null,8,["modelValue","max"]),s(n(u),{icon:"pi pi-refresh",class:"p-button-secondary refresh-button",onClick:c}),s(n(g),{modelValue:e.teamTwoNoBribes,"onUpdate:modelValue":a[7]||(a[7]=l=>e.teamTwoNoBribes=l),disabled:e.teamTwoScore!==0,class:"no-bribes-button","on-label":"No tricks","off-label":"No tricks","on-icon":"pi pi-check","off-icon":"pi pi-times"},null,8,["modelValue","disabled"])])])])]),actions:p(()=>[o("div",ve,[s(n(u),{icon:"pi pi-prime",class:"p-button p-button-lg p-button-secondary w-2rem",onClick:n(t).toggleDialog},null,8,["onClick"]),s(n(u),{disabled:n(x),label:"Record the deal",class:"p-button-lg p-button-primary",onClick:B},null,8,["disabled"])])]),_:1},8,["page-title"]),s(n(M),{visible:n(t).showDialog,"onUpdate:visible":a[8]||(a[8]=l=>n(t).showDialog=l),header:"Confirmation",modal:!0},{footer:p(()=>[s(n(u),{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:n(t).toggleDialog},null,8,["onClick"]),s(n(u),{label:"Yes",icon:"pi pi-check",class:"p-button-text",autofocus:"",onClick:D})]),default:p(()=>[ge]),_:1},8,["visible"])],64))}};export{Ve as default};
