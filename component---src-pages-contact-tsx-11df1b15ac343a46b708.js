(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"0Aie":function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",(function(){return f}));var n=a("q1tI"),l=a.n(n),r=a("mwIZ"),o=a.n(r),c=a("qhky"),m=a("kCIJ"),s=a("9Dj+"),u=a("FgC2"),i=a("EWsq"),d=a("vOnD");const p=d.e.div.withConfig({displayName:"contact-form__Label",componentId:"qcq6kj-0"})([""]),E=d.e.button.withConfig({displayName:"contact-form__Button",componentId:"qcq6kj-1"})(["background:#ddd;color:black;border:0;border-radius:2px;padding:0.5em calc(var(",") * 1px);cursor:pointer;&:active{background:#bbb;}"],u.PADDING),b=d.e.input.withConfig({displayName:"contact-form__Input",componentId:"qcq6kj-2"})(["background:white;color:black;border:1px solid #ddd;border-radius:2px;padding:0.5em calc(var(",") * 1px);width:100%;"],u.PADDING),h=d.e.textarea.withConfig({displayName:"contact-form__Textarea",componentId:"qcq6kj-3"})(["background:white;color:black;border:1px solid #ddd;border-radius:2px;padding:0.5em calc(var(",") * 1px);width:100%;"],u.PADDING);class w extends l.a.Component{constructor(e){super(e),this.state={status:""},this.submitForm=this.submitForm.bind(this)}render(){const{status:e}=this.state;return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.Column,{m:1,l:2}),l.a.createElement(u.Column,{m:6,l:8},l.a.createElement("form",{onSubmit:this.submitForm,action:"https://formspree.io/xrgyykye",method:"POST"},l.a.createElement(u.Row,null,l.a.createElement(u.Column,{m:4},l.a.createElement("label",null,l.a.createElement(p,null,"Email:"),l.a.createElement(b,{type:"email",name:"email"}))),l.a.createElement(u.Column,null),l.a.createElement(u.Column,{m:4},l.a.createElement("label",null,l.a.createElement(p,null,"Message:"),l.a.createElement(h,{name:"message"}))),l.a.createElement(u.Column,null,"SUCCESS"===e?l.a.createElement("p",null,"Thanks!"):l.a.createElement(E,null,"Submit"),"ERROR"===e&&l.a.createElement("p",null,"Ooops! There was an error."))))))}submitForm(e){e.preventDefault();const t=e.target,a=new FormData(t),n=new XMLHttpRequest;n.open(t.method,t.action),n.setRequestHeader("Accept","application/json"),n.onreadystatechange=()=>{n.readyState===XMLHttpRequest.DONE&&(200===n.status?(t.reset(),this.setState({status:"SUCCESS"})):this.setState({status:"ERROR"}))},n.send(a)}}var C=a("IujW"),g=a.n(C),k=a("v3JS");t.default=Object(m.injectIntl)(e=>{const t=o()(e,"data.site.siteMetadata.title"),a=o()(e,"data.contentfulPage.slots"),n=o()(e,"data.contentfulLocation");return l.a.createElement(s.a,null,l.a.createElement(c.a,{title:`${e.intl.messages.contact} | ${t}`}),l.a.createElement(u.Row,null,l.a.createElement(u.Column,{raw:!0},l.a.createElement("h1",null,"Contact")),l.a.createElement(u.Column,{m:1,l:2}),l.a.createElement(u.Column,{m:6,l:8},l.a.createElement("div",null,l.a.createElement("a",{href:"tel:"+Object(k.c)(n.telephone)},n.telephone)),l.a.createElement(g.a,{source:n.address.childMarkdownRemark.rawMarkdownBody})),l.a.createElement(u.Column,{m:1,l:2}),a.map(({__typename:e,id:t,...a})=>l.a.createElement(u.Column,{key:t},l.a.createElement(i.a,Object.assign({contentType:e},a)))),l.a.createElement(w,null)))});const f="331396595"}}]);
//# sourceMappingURL=component---src-pages-contact-tsx-11df1b15ac343a46b708.js.map