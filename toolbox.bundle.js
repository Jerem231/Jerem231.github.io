var Toolbox=(()=>{var J=Object.defineProperty;var yt=Object.getOwnPropertyDescriptor;var kt=Object.getOwnPropertyNames;var Et=Object.prototype.hasOwnProperty;var E=(p,t)=>{for(var e in t)J(p,e,{get:t[e],enumerable:!0})},Ct=(p,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of kt(t))!Et.call(p,i)&&i!==e&&J(p,i,{get:()=>t[i],enumerable:!(s=yt(t,i))||s.enumerable});return p};var St=p=>Ct(J({},"__esModule",{value:!0}),p);var Tt={};E(Tt,{ActionItem:()=>q,CheckboxItem:()=>A,ContextMenu:()=>j,DataTable:()=>C,EditableText:()=>N,LoadingScreen:()=>U,MenuItem:()=>S,Navigator:()=>z,PopUp:()=>T,SeparatorItem:()=>M,Slider:()=>F,Toast:()=>W,context_menu:()=>X,editable_text:()=>K,loading_screen:()=>ot,navigator:()=>V,pop_up:()=>Y,slider:()=>nt,table:()=>it,toast:()=>rt});var X={};E(X,{ActionItem:()=>q,CheckboxItem:()=>A,ContextMenu:()=>j,MenuItem:()=>S,SeparatorItem:()=>M});var at=`.context-menu{position:fixed;z-index:9999;min-width:180px;max-width:320px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.12);padding:6px 0;font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto}\r
.context-menu__item{display:flex;gap:8px;align-items:center;padding:8px 12px;cursor:pointer;user-select:none;white-space:nowrap}\r
.context-menu__item:hover{background:#f5f5f7}\r
.context-menu__item[aria-disabled="true"]{opacity:.5;pointer-events:none;cursor:default}\r
.context-menu__icon{width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 16px}\r
.context-menu__label{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis}\r
.context-menu__check{margin-left:auto}\r
.context-menu__sep{height:1px;background:#eee;margin:6px 0}\r
.context-menu__item--danger:hover{background:#fee2e2}`;function v(p,t){if(typeof document>"u"||t&&document.getElementById(t))return;let e=document.createElement("style");t&&(e.id=t),e.textContent=p,document.head.appendChild(e)}var S=class{visible(t){return!0}enabled(t){return!0}render(t,e){throw new Error("implement render()")}},q=class extends S{constructor({label:t,on_click:e,icon_html:s=null,visible:i=null,enabled:o=null,danger:r=!1}){super(),this.label=t,this.on_click=e,this.icon_html=s,this.danger=!!r,i&&(this.visible=i),o&&(this.enabled=o)}render(t,e){let s=document.createElement("div");return s.className="context-menu__item"+(this.danger?" context-menu__item--danger":""),s.setAttribute("role","menuitem"),s.innerHTML=`${this.icon_html?`<span class="context-menu__icon">${this.icon_html}</span>`:""}<span class="context-menu__label">${this.label}</span>`,this.enabled(t)?s.addEventListener("click",i=>{i.stopPropagation(),e.close(),this.on_click?.(t)}):s.setAttribute("aria-disabled","true"),s}},A=class extends S{constructor({label:t,get_checked:e,on_toggle:s,visible:i=null,enabled:o=null}){super(),this.label=t,this.get_checked=e,this.on_toggle=s,i&&(this.visible=i),o&&(this.enabled=o)}render(t,e){let s=!!this.get_checked?.(t),i=document.createElement("div");return i.className="context-menu__item",i.setAttribute("role","menuitemcheckbox"),i.setAttribute("aria-checked",String(s)),i.innerHTML=`<span class="context-menu__label">${this.label}</span><span class="context-menu__check">${s?"\u2713":""}</span>`,this.enabled(t)?i.addEventListener("click",o=>{o.stopPropagation(),this.on_toggle?.(!s,t),e.close()}):i.setAttribute("aria-disabled","true"),i}},M=class extends S{render(){let t=document.createElement("div");return t.className="context-menu__sep",t.setAttribute("role","separator"),t}},j=class{constructor({activation:t="contextmenu",mode:e="always",selector:s=null,container:i=document,items:o=[],context_fn:r=null}={}){this.activation=t,this.mode=e,this.selector=s,this.container=i,this.items=o,this.context_fn=r,this.menu_el=this._create_root(),this.is_open=!1,this._bind()}set_items(t){this.items=t??[]}add_item(t){this.items.push(t)}items_list(t=[]){for(let e of t)this.add_item(e);return this}action(t,e,s={}){return this.add_item(new q({label:t,on_click:e,...s||{}})),this}check(t,e,s,i={}){return this.add_item(new A({label:t,get_checked:e,on_toggle:s,...i||{}})),this}sep(){return this.add_item(new M),this}open_for_event(t){let e=this._resolve_target(t);if(!e)return;t.preventDefault?.(),t.stopPropagation?.();let s=this._build_ctx(t,e);this._render_items(s),this._open_at(t.clientX??0,t.clientY??0)}open_at(t,e,s={}){this._render_items(s),this._open_at(t,e)}close(){this.is_open&&(this.is_open=!1,this.menu_el.style.display="none",document.removeEventListener("click",this._on_doc_click,!0),document.removeEventListener("keydown",this._on_doc_key,!0),window.removeEventListener("resize",this._on_win_resize,!0),window.removeEventListener("scroll",this._on_win_resize,!0))}destroy(){this.close(),this.menu_el.remove(),this._unbind()}_create_root(){let t=document.createElement("div");return t.className="context-menu",t.style.display="none",t.setAttribute("role","menu"),document.body.appendChild(t),t}_bind(){let t=Array.isArray(this.activation)?this.activation:[this.activation];this._on_trigger=e=>this.open_for_event(e);for(let e of t)this.container.addEventListener(e,this._on_trigger)}_unbind(){let t=Array.isArray(this.activation)?this.activation:[this.activation];if(this._on_trigger)for(let e of t)this.container.removeEventListener(e,this._on_trigger)}_resolve_target(t){return this.mode==="always"?t.target:this.mode==="selector"&&this.selector?t.target.closest(this.selector):null}_build_ctx(t,e){return{event:t,target:e,data:e?.dataset??{},...this.context_fn?this.context_fn(t,e)||{}:{}}}_render_items(t){this.menu_el.innerHTML="";for(let e of this.items){if(!e.visible(t))continue;let s=e.render(t,this);this.menu_el.appendChild(s)}if(!this.menu_el.childElementCount){let e=document.createElement("div");e.className="context-menu__item",e.textContent="No actions",e.setAttribute("aria-disabled","true"),this.menu_el.appendChild(e)}}_open_at(t,e){this.menu_el.style.display="block",this.menu_el.style.left="0px",this.menu_el.style.top="0px";let{width:s,height:i}=this.menu_el.getBoundingClientRect(),o=document.documentElement.clientWidth,r=document.documentElement.clientHeight,a=Math.min(t,o-s-4),n=Math.min(e,r-i-4);this.menu_el.style.left=`${Math.max(4,a)}px`,this.menu_el.style.top=`${Math.max(4,n)}px`,this.is_open=!0,this._on_doc_click=l=>{this.menu_el.contains(l.target)||this.close()},this._on_doc_key=l=>{l.key==="Escape"&&this.close()},this._on_win_resize=()=>this.close(),document.addEventListener("click",this._on_doc_click,!0),document.addEventListener("keydown",this._on_doc_key,!0),window.addEventListener("resize",this._on_win_resize,!0),window.addEventListener("scroll",this._on_win_resize,!0)}};v(at,"webtool__context_menu_css");var K={};E(K,{EditableText:()=>N});var lt=`.editable-text{display:inline-block;position:relative}\r
.editable-text .edit{display:none;font:inherit;border:1px solid #ccc;padding:2px 6px;background:transparent}\r
.editable-text.is-editing .view{display:none}\r
.editable-text.is-editing .edit{display:inline-block}\r
`;var N=class p{static _reg=new Map;static _inited=!1;static _esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}static _uid(){return"et_"+Math.random().toString(36).slice(2,8)+Date.now().toString(36)}constructor({value:t,tag:e="h2",id:s=null,on_save:i=null,on_cancel:o=null}){this.id=s||p._uid(),this.value=t??"",this.tag=e,this.on_save=i,this.on_cancel=o,p._reg.set(this.id,this),p.init()}toString(){let t=p._esc(this.value);return`<div class="editable-text" data-editable-id="${this.id}">
        <${this.tag} class="view">${t}</${this.tag}>
        <input class="edit" type="text" value="${t}">
      </div>`}static init(){p._inited||(p._inited=!0,document.addEventListener("dblclick",t=>{let e=t.target.closest(".editable-text");if(!e)return;let s=e.querySelector(".edit"),o=e.querySelector(".view").textContent.trim();e.setAttribute("data-initial",o),s.value=o,e.classList.add("is-editing"),s.size=Math.max(1,s.value.length),s.focus(),s.select()}),document.addEventListener("keydown",t=>{if(!t.target.matches(".editable-text.is-editing .edit"))return;let e=t.target.closest(".editable-text");if(t.key==="Enter")t.preventDefault(),p._commit(e);else if(t.key==="Escape")t.preventDefault(),p._cancel(e);else if(t.key.length===1){let s=e.querySelector(".edit");queueMicrotask(()=>s.size=Math.max(1,s.value.length))}}),document.addEventListener("blur",t=>{t.target.matches(".editable-text.is-editing .edit")&&p._commit(t.target.closest(".editable-text"))},!0))}static async _commit(t){if(!t||!t.classList.contains("is-editing"))return;let e=t.querySelector(".edit"),s=t.querySelector(".view"),i=p._reg.get(t.getAttribute("data-editable-id")),o=t.getAttribute("data-initial")??s.textContent.trim(),r=(e.value||"").trim();if(t.classList.remove("is-editing"),!r||r===o){e.value=o;return}let a=s.textContent;s.textContent=r;try{if(i?.on_save){let n=i.on_save(r,i);n&&typeof n.then=="function"&&await n}i&&(i.value=r)}catch(n){s.textContent=a,e.value=a,console.error("editable_text save failed:",n)}}static _cancel(t){if(!t)return;let e=t.querySelector(".edit"),s=t.querySelector(".view"),i=p._reg.get(t.getAttribute("data-editable-id"));e.value=t.getAttribute("data-initial")??s.textContent.trim(),t.classList.remove("is-editing");try{i?.on_cancel?.(i)}catch{}}};v(lt,"webtool__editable_text_css");var V={};E(V,{Navigator:()=>z});var dt=`\r
.navigator {\r
    width: 100%;\r
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;\r
    border-radius: 8px;\r
    overflow: hidden;\r
}\r
\r
.navigator-bar {\r
    display: flex;\r
    gap: 0.25rem;\r
    border-bottom: 1px solid rgba(0,0,0,0.05);\r
    position: relative;\r
    z-index: 2;\r
}\r
\r
.navigator-tab {\r
    background: #f1f3f5;\r
    color: #495057;\r
    border: 1px solid transparent;\r
    border-radius: 6px 6px 0 0;\r
    padding: 0.3rem 1rem;\r
    cursor: pointer;\r
    transition: all 0.2s ease-in-out;\r
    position: relative;\r
    top: 2px;\r
    z-index: 1;\r
    margin-bottom: 2px;\r
    display: flex;\r
    align-items: center;\r
    gap: 4px;\r
}\r
\r
.navigator-tab > span {\r
    font-size: 18px;\r
}\r
\r
.navigator-tab:hover {\r
    background-color: #dee2e6;\r
}\r
\r
.navigator-tab.active {\r
    background: #fff;\r
    color: #0d6efd;\r
    border: 1px solid rgba(0,0,0,0.1);\r
    border-bottom: 1px solid #fff; /* Seamless with content */\r
    z-index: 3;\r
    font-weight: 500;\r
    margin: 0;\r
}\r
\r
.navigator-content {\r
    background: #fff;\r
    padding: 18px;\r
    border-radius: 0 0 8px 8px;\r
    border: 1px solid rgba(0,0,0,0.1);\r
    position: relative;\r
    top: -1px;\r
    z-index: 1;\r
}\r
\r
.print-bundle { display: none; }\r
\r
@media print {\r
  /* n\u2019imprimer que le bundle */\r
  body:has( .print-bundle) > *:not(.print-bundle) { display: none !important; }\r
  .print-bundle { display: flex !important; flex-direction: column; break-inside: auto;}\r
\r
  /* couleurs/fonds conserv\xE9s */\r
  html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }\r
\r
\r
  .print-page {\r
    display: block;\r
    width: auto !important;\r
    overflow: visible !important;\r
    border: none !important;\r
    break-inside: avoid;\r
    break-before: page;\r
    break-after: page;\r
  }\r
\r
  /* Neutraliser des styles web potentiellement g\xEAnants */\r
  .print-bundle .navigator-content,\r
  .print-bundle .data-wrapper {\r
    width: auto !important;\r
    max-height: none !important;\r
    overflow: visible !important;\r
    box-shadow: none !important;\r
    padding: 0 !important;\r
    margin: 0 !important;\r
    break-inside: auto;\r
  }\r
}\r
`;var z=class p{constructor(t=-1,e=null,s=null,i=null){this.tabs=new Map,this.current=null,this.max_tab_number=t,this.max_tab_message=e,this.tab_count=0,this.delete_event=i,this.open_tab_event=s}draw(t){let e=typeof t=="string"?document.querySelector(t):t;this.container=document.createElement("div"),this.container.className="navigator",this.navbar=document.createElement("div"),this.navbar.className="navigator-bar",this.content_area=document.createElement("div"),this.content_area.className="navigator-content",this.container.appendChild(this.navbar),this.container.appendChild(this.content_area),e.appendChild(this.container)}add(t,e,s,{closable:i=!1,hidden:o=!1,count_towards_limit:r=!0}={}){if(this.tabs.has(t))return;if(r&&this.max_tab_number>=0&&this.tab_count===this.max_tab_number){this.max_tab_message&&toast("warning",this.max_tab_message);return}r&&(this.tab_count+=1);let a=null;if(!o){if(a=document.createElement("button"),a.className="navigator-tab",a.id=t,a.textContent=e,a.addEventListener("click",()=>this.open(t)),i){let l=document.createElement("span");l.className="material-symbols-outlined btn-close",l.innerHTML="close",l.addEventListener("click",c=>{c.stopPropagation(),this.delete(t)}),a.appendChild(l)}this.navbar.appendChild(a)}let n=document.createElement("div");n.id=t,n.style.display="none",typeof s=="string"?n.innerHTML=s:n.appendChild(s.cloneNode(!0)),this.content_area.appendChild(n),this.tabs.set(t,{label:e,button:a,content:n,hidden:!!o,count_towards_limit:!!r}),!this.current&&!o&&this.open(t)}add_hidden(t,e,s,i={}){return this.add(t,e,s,{...i,hidden:!0})}set(t,e){let s=this.tabs.get(t);s&&(s.content.innerHTML="",typeof e=="string"?s.content.innerHTML=e:s.content.appendChild(e.cloneNode(!0)))}open(t){if(!this.tabs.has(t)){console.error(`tab id: <${t}> not found in <${Array.from(this.tabs.keys())}>`);return}if(this.open_tab_event?.(t),this.current&&this.tabs.has(this.current)){let s=this.tabs.get(this.current);s.button?.classList.remove("active"),s.content.style.display="none"}let e=this.tabs.get(t);e.button?.classList.add("active"),e.content.style.display="block",this.current=t}delete(t){let e=this.tabs.get(t);if(e&&(this.delete_event?.(t),e.button?.remove(),e.content.remove(),this.tabs.delete(t),e.count_towards_limit&&(this.tab_count-=1),this.current===t)){let s=this.tabs.keys().next().value;this.current=null,s&&this.open(s)}}order(t){let e=[];for(let s of t){let i=this.tabs.get(s);i?.button&&e.push(i.button)}e.length&&this.navbar.append(...e)}ids({include_hidden:t=!1}={}){let e=[];for(let[s,i]of this.tabs.entries())(t||!i.hidden)&&e.push(s);return e}static from(t,{max_tab_number:e=-1,max_tab_message:s=null,delete_event:i=null}={}){let o=new p(e,s,null,i);return o.container=t,o.container.classList.contains("navigator")||o.container.classList.add("navigator"),o.navbar=o.container.querySelector(".navigator-bar"),o.content_area=o.container.querySelector(".navigator-content"),o.container.querySelectorAll("[data-tab-id]").forEach(r=>{let a=r.getAttribute("data-tab-id"),n=r.getAttribute("data-tab-name")||a,l=r.getAttribute("data-closable")==="true",c=r.getAttribute("data-hidden")==="true",u=r.querySelector(".navigator-tab-content");o.add(a,n,u,{closable:l,hidden:c})}),o}print_tabs(t,{filename:e=null}={}){let s=document.title;e&&(document.title=e);let i=document.createElement("div");i.className="print-bundle";for(let r of t){let a=this.tabs.get(r);if(!a)continue;let n=document.createElement("section");n.className="print-page navigator-content";let l=a.content.cloneNode(!0);l.style.removeProperty("display"),l.querySelectorAll('[style*="display: none"]').forEach(c=>c.style.removeProperty("display")),l.querySelectorAll("canvas").forEach(c=>{try{let u=new Image;u.src=c.toDataURL("image/png"),u.width=c.width,u.height=c.height,c.replaceWith(u)}catch{}}),n.appendChild(l),i.appendChild(n)}document.body.appendChild(i);let o=()=>{i.remove(),document.title=s,window.removeEventListener("afterprint",o)};window.addEventListener("afterprint",o),setTimeout(()=>window.print(),0)}};v(dt,"webtool__navigator_css");var Y={};E(Y,{PopUp:()=>T});var ct=`/* PopUp \u2013 styles unifi\xE9s, sans blur */\r
.pop-up-wrapper{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:9999}\r
.pop-up-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.45)}\r
.showcase-background{position:absolute;inset:0;pointer-events:none;outline:9999px solid rgba(0,0,0,.35)}\r
\r
.pop-up{\r
  position:relative;min-width:280px;max-width:90vw;max-height:90vh;overflow:auto;\r
  background:#fff;border:1px solid #e5e7eb;border-radius:10px;\r
  box-shadow:0 12px 32px rgba(0,0,0,.18);padding:16px\r
}\r
\r
.pop-up .title{font-size:1.5rem;margin-bottom:14px;width:100%;text-align:center}\r
.pop-up-message{margin-bottom:12px}\r
\r
.pop-up-buttons{display:flex; gap:8px; justify-content:flex-end; margin-top:16px}\r
\r
/* Boutons \u2014 pas de transform, effet net via background/border/shadow + anneau ::after */\r
.pop-up button{\r
  position: relative; padding:6px 20px; cursor:pointer;\r
  border: 1px solid #e5e7eb; background:#f8fafc;\r
  transition: background-color .18s ease, border-color .18s ease, box-shadow .18s ease;\r
}\r
.pop-up button:hover{\r
  box-shadow:0 2px 8px rgba(0,0,0,.06), 0 6px 18px rgba(0,0,0,.08);\r
}\r
.pop-up button::after{\r
  content:""; position:absolute; inset:-1px; border-radius:inherit;\r
  box-shadow:0 0 0 0 rgba(59,130,246,.28); opacity: 0; pointer-events:none;\r
  transition:box-shadow .18s ease, opacity .18s ease;\r
}\r
.pop-up button:hover::after{ box-shadow:0 0 0 2px rgba(59,130,246,.16); opacity:1 }\r
\r
.pop-up button:focus-visible{ outline: 1px solid #94a3b8; outline-offset: 1px }\r
\r
\r
button.yes-button {\r
    background-color: #e0f7e9;\r
    border: solid 1px #34c759;\r
    color: #34c759;\r
    border-radius: 4px;\r
}\r
\r
button.no-button {\r
    background-color: #fbe2e0;\r
    border: solid 1px #d4342b;\r
    color: #d4342b;\r
    border-radius: 4px;\r
}\r
\r
button.next-button {\r
    background-color: #d8f2fd;\r
    border: solid 1px #7a9bb0;\r
    color: #7a9bb0;\r
    border-radius: 4px;\r
}\r
\r
`;var T=class p{static _id=0;constructor({content:t="",backdrop:e=!0,backdrop_click_closes:s=!0,esc_closes:i=!0,extra_backdrop_class:o=null,buttons:r=[],on_open:a=null,on_close:n=null}={}){if(this.id=`pop-up-${p._id++}`,this.on_open=a,this.on_close=n,this._wrapper=document.createElement("div"),this._wrapper.className="pop-up-wrapper",this._wrapper.id=this.id,e&&(this._backdrop=document.createElement("div"),this._backdrop.className="pop-up-backdrop",this._wrapper.appendChild(this._backdrop),s&&this._backdrop.addEventListener("click",()=>this.close())),o){let l=document.createElement("div");l.className=o,this._wrapper.appendChild(l)}this._dialog=document.createElement("div"),this._dialog.className="pop-up",this._wrapper.appendChild(this._dialog),this._message=document.createElement("div"),this._message.className="pop-up-message",this._dialog.appendChild(this._message),this._buttons=document.createElement("div"),this._buttons.className="pop-up-buttons",this._dialog.appendChild(this._buttons),this.set_content(t),this.replace_buttons(r),this._on_keydown=l=>{l.key==="Escape"&&i&&this.close()}}set_content(t){return t instanceof Node?this._message.replaceChildren(t):this._message.innerHTML=t??"",this}add_button({label:t,class_name:e="",auto_close:s=!0,on_click:i=null}){let o=document.createElement("button");return e&&(o.className=e),o.textContent=t,o.addEventListener("click",()=>{i&&i(),s&&this.close()}),this._buttons.appendChild(o),this}replace_buttons(t=[]){this._buttons.replaceChildren();for(let e of t)this.add_button(e);return this}open(){return document.body.appendChild(this._wrapper),document.addEventListener("keydown",this._on_keydown,!0),this.on_open&&this.on_open(this),this}close(){return this._wrapper.isConnected?(document.removeEventListener("keydown",this._on_keydown,!0),this._wrapper.remove(),this.on_close&&this.on_close(this),this):this}static confirm(t,{yes_label:e="Yes",no_label:s="No",on_yes:i=null,on_no:o=null}={}){return new p({content:t,buttons:[{label:e,class_name:"yes-button",auto_close:!0,on_click:i},{label:s,class_name:"no-button",auto_close:!0,on_click:o}]})}static next(t,{text:e="Next",on_next:s=null,backdrop:i=!0,backdrop_click_closes:o=!1,before_open:r=null}={}){return new p({content:t,backdrop:i,backdrop_click_closes:o,buttons:[{label:e,class_name:"next-button",auto_close:!0,on_click:s}],on_open:a=>{r&&r(a._dialog)}})}static showcase(t){return new p({content:t,backdrop:!0,extra_backdrop_class:"showcase-background"})}};v(ct,"webtool__pop_up_css");var it={};E(it,{DataTable:()=>C});var pt=`/* .dtbl{border-collapse:collapse;width:100%}\r
.dtbl-sticky thead th{position:sticky;top:0;background:#fff;z-index:1}\r
.dtbl thead th{border-bottom:1px solid #e5e7eb;padding:.45rem .55rem;white-space:nowrap}\r
.dtbl td{padding:.4rem .55rem;border-bottom:1px solid #f1f5f9}\r
.dtbl tbody tr:nth-child(odd){background:#fafafa}\r
.dtbl thead th .dtbl-sort{margin-left:.35rem;opacity:.6;font-size:.8em}\r
.dtbl-toolbar{display:flex;gap:.5rem;align-items:center;margin:.5rem 0;flex-wrap:wrap}\r
.dtbl-search{padding:.35rem .5rem;min-width:240px}\r
.dtbl-dl{display:flex;gap:.5rem}\r
.dtbl-dl button,.dtbl-pager button{padding:.35rem .6rem;cursor:pointer;border:1px solid #e5e7eb;border-radius:6px;background:#f8fafc}\r
.dtbl-pager{display:flex;gap:.5rem;align-items:center;margin:.5rem 0}\r
.dtbl-page-label{min-width:7.5rem;text-align:center} */\r
\r
/* barre */\r
.dtbl-toolbar {\r
    display: flex;\r
    align-items: center;\r
}\r
.dtbl-btn.dtbl-btn-icon { display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border:1px solid #e5e7eb; border-radius:6px; background:#fff; cursor:pointer; }\r
.dtbl-btn.dtbl-btn-icon:hover { background:#f8fafc; }\r
\r
/* popup contenu */\r
.dtbl-dl__stats { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px 12px; margin-bottom:12px; font-size:.9rem; border: solid 3px #f8fafc; padding: 8px;}\r
.dtbl-dl__scope { display:flex; gap:16px; align-items:center; margin:10px 0 14px 6px; flex-wrap:wrap; }\r
.dtbl-dl__legend { font-weight:600; margin-right:6px; }\r
.dtbl-dl__actions { display:flex; flex-wrap:wrap; gap:8px; }\r
.dtbl-dl__btn, .dtbl-page-prev, .dtbl-page-next { padding:6px 12px; border:1px solid #e5e7eb; background:#fff; border-radius:6px; cursor:pointer; display: flex; align-items: center; gap: 6px;}\r
.dtbl-dl__btn:hover, .dtbl-page-prev:not([disabled]):hover, .dtbl-page-next:not([disabled]):hover { background:#f3f4f6; }\r
.dtbl-page-prev[disabled], .dtbl-page-next[disabled] {cursor: default;}\r
\r
.dtbl-dl__btn.btn-csv { color:#2e7d32; }\r
.dtbl-dl__btn.btn-tsv { color:#388e3c; }\r
.dtbl-dl__btn.btn-json{ color:#ef6c00; }\r
.dtbl-dl__btn.btn-md  { color:#1565c0; }\r
.dtbl-dl__btn.btn-copy{ color:#6a1b9a; }\r
\r
.dtbl-pager {\r
    display: flex;\r
    gap: 6px;\r
    margin: 12px 0;\r
    align-items: center;\r
}\r
\r
th .dtbl-sort{ margin-left:6px; font-size:.9em; opacity:.75; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center;}\r
th.is-sorted .dtbl-sort{ opacity:1; }\r
th .dtbl-sort-idx{\r
  margin-left:4px; font-size:.7em; vertical-align:super; opacity:.85;\r
  padding:0 .25em; border-radius:6px; background:rgba(212, 210, 210, 0.06);\r
}\r
\r
:root{\r
    --dtbl-row-even: #F5F5F5;\r
    --dtbl-row-odd:  #fff;\r
}\r
\r
\r
.dtbl tbody tr.dtbl-row-odd  { background: var(--dtbl-row-odd); }\r
.dtbl tbody tr.dtbl-row-even { background: var(--dtbl-row-even); }\r
\r
\r
.table-1 {\r
    border-collapse: collapse;\r
    width: 100%;\r
    font-size: 14px;\r
    color: #999999;\r
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;\r
}\r
\r
.table-1 td {\r
    padding: 8px 12px;\r
    text-align: center;\r
}\r
\r
.table-1 thead > tr:nth-child(1) th:not(.outside):first-of-type {\r
    border-radius: 8px 0 0 0;\r
}\r
\r
.table-1 thead > tr:nth-child(1) th:not(.outside):last-of-type,\r
.table-1 thead > tr:has(> th:last-child.outside) > th:nth-last-child(2) {\r
    border-radius: 0 8px 0 0;\r
}\r
\r
.table-1 th:not(.outside) {\r
    background-color: #36304A;\r
    font-weight: 400;\r
    color: #f4f1f6;\r
    text-align: center;\r
    padding: 4px 12px;\r
    min-width: max-content;\r
    border-bottom: solid 1px #c1b8c7;\r
}\r
\r
.table-1 tbody tr:hover td:not(.outside) {\r
    color: #292929;\r
}\r
\r
.table-1 td {\r
    white-space: nowrap;\r
}\r
\r
.table-1.static td {\r
    border: solid 1px #d9d9d9;\r
    color: #292929 !important;\r
}\r
\r
.table-1 .outside {\r
    background-color: var(--background-color);\r
    border: none;\r
    width: fit-content;\r
    cursor: default;\r
}\r
\r
.table-1 th .dtbl-sort { display:inline-block; width:1.2em; text-align:center; margin-left:6px; opacity:.75; }\r
.table-1 th.is-sorted .dtbl-sort { opacity:1; }\r
.table-1 th .dtbl-sort-idx{\r
  display:inline-block; min-width:1.1em; margin-left:4px; font-size:.9em; vertical-align:super;\r
  padding:0 .35em; border-radius:6px; background:#fff; color: #000000; position: absolute;\r
}\r
`;var L=class{static reg=new Map;static inited=!1;static uid(){return"dt_"+Math.random().toString(36).slice(2,8)+Date.now().toString(36)}static init(){this.inited||(this.inited=!0,document.addEventListener("input",t=>{let e=t.target.closest("[data-dtbl-id]");if(!e)return;let s=this.reg.get(e.dataset.dtblId);s&&s._dispatch_input(t)}),document.addEventListener("click",t=>{let e=t.target.closest("[data-dtbl-id]");if(!e)return;let s=this.reg.get(e.dataset.dtblId);s&&s._dispatch_click(t)}))}};var I=class{constructor({locale:t}={}){this.collator=new Intl.Collator(t,{numeric:!0,sensitivity:"base"}),this.formatters=new Map,this._columns=[],this._rows=[],this._view_rows=[],this._sort_state=[],this._query="",this._page_size=null,this._page=1}get_columns(){return JSON.parse(JSON.stringify(this._columns))}set_columns(t){return this._columns=this._norm_cols(t||[]),this}update_column(t,e={}){let s=this.flat_columns().find(i=>i.id===t);if(!s)throw new Error(`TableState.update_column: unknown column "${t}"`);return Object.assign(s,e),this}set_columns_meta(t={}){let e=this.flat_columns();for(let[s,i]of Object.entries(t)){let o=e.find(r=>r.id===s);o&&Object.assign(o,i)}return this}flat_columns(){let t=[];return(function e(s){s.forEach(i=>i.children?e(i.children):t.push(i))})(this._columns),t}get_flat_columns(){return this.flat_columns().map(e=>({id:e.id,label:e.label,type:e.type,sortable:e.sortable===!0,width:e.width,align:e.align,searchable:e.searchable===!0}))}header_depth(){let t=e=>Math.max(0,...e.map(s=>s.children?1+t(s.children):1));return t(this._columns)}leaf_count(t){return t.children?t.children.reduce((e,s)=>e+this.leaf_count(s),0):1}set_rows(t){return this._rows=Array.isArray(t)?t.slice():[],this}add_rows(t=[]){return Array.isArray(t)||(t=[t]),this._rows.push(...t),this}clear_rows(){return this._rows.length=0,this}update_row_at(t,e={}){if(t<0||t>=this._rows.length)throw new Error("TableState.update_row_at: index out of range");return Object.assign(this._rows[t],e),this}set_cell_at(t,e,s){if(t<0||t>=this._rows.length)throw new Error("TableState.set_cell_at: index out of range");return(this._rows[t]??={})[e]=s,this}get_rows(t="view"){if(this.apply(),t==="raw")return this._rows.slice();if(t==="view")return this._view_rows.slice();if(t==="page")return this.page_slice().rows.slice();throw new Error(`TableState.get_rows: unknown scope "${t}"`)}set_query(t){return this._query=String(t||""),this}set_page_size(t){return this._page_size=t||null,this._page=1,this}set_page(t){return this._page=Math.max(1,parseInt(t||1,10)),this}sort_by(t,e=!0,s=!1){return s||(this._sort_state=[]),this._sort_state.push({key:t,asc:e}),this}set_sort(t=[]){return this._sort_state=Array.isArray(t)?t.filter(e=>e&&e.key):[],this}clear_sort(){return this._sort_state=[],this}apply(){let t=this._query.toLowerCase(),e=this.flat_columns(),s=e.filter(i=>i.searchable===!0);if(t?s.length===0?this._view_rows=[]:this._view_rows=this._rows.filter(i=>s.some(o=>String(i[o.id]??"").toLowerCase().includes(t))):this._view_rows=this._rows.slice(),this._sort_state.length){let i=this._view_rows.map((r,a)=>({row:r,idx:a})),o=r=>e.find(a=>a.id===r)?.type||"text";i.sort((r,a)=>{for(let n of this._sort_state){let l=o(n.key),c=r.row[n.key],u=a.row[n.key],h=this._compare_values(l,c,u);if(h)return n.asc?h:-h}return r.idx-a.idx}),this._view_rows=i.map(r=>r.row)}return this}page_slice(){if(!this._page_size)return{rows:this._view_rows,page:1,total_pages:1};let t=Math.max(1,Math.ceil(this._view_rows.length/this._page_size));this._page>t&&(this._page=t);let e=(this._page-1)*this._page_size;return{rows:this._view_rows.slice(e,e+this._page_size),page:this._page,total_pages:t}}format(t,e){return this.formatters.set(t,e),this}get sort_state(){return this._sort_state}get page_size(){return this._page_size}get page(){return this._page}_norm_cols(t,e=0,s=null){return t.map(i=>({id:i.id,label:i.label??i.id,type:i.type||"text",sortable:i.sortable!==!1,searchable:i.searchable===!0,width:i.width||null,align:i.align||null,comparator:i.comparator||null,children:i.children?this._norm_cols(i.children,e+1,i):null,_depth:e,_parent:s}))}_compare_values(t,e,s){let i=e==null||e==="",o=s==null||s==="";if(i&&o)return 0;if(i)return 1;if(o)return-1;if(t==="number"){let r=Number(e),a=Number(s),n=Number.isFinite(r)?r:-1/0,l=Number.isFinite(a)?a:-1/0;return n-l}if(t==="date"){let r=this._coerce_date(e),a=this._coerce_date(s);return r-a}return this.collator.compare(String(e),String(s))}_coerce_date(t){if(t instanceof Date)return t.getTime();let e=Date.parse(t);return Number.isFinite(e)?e:-864e13}};var O=class{constructor(t){this.table=t}toolbar_html(){return`<div class="dtbl-toolbar">${this.table.plugins.map(t=>t.toolbar_html?.()||"").join("")}</div>`}table_html(){let t=this.table.model.apply(),e=t.flat_columns(),s=t.header_depth(),i=[];(function a(n,l=0,c){i[l]??=[],n.forEach(u=>{let h=!!u.children;i[l].push({label:u.label,id:h?null:u.id,colspan:h?c.leaf_count(u):1,rowspan:h?1:s-l,align:u.align,sortable:u.sortable!==!1}),h&&a(u.children,l+1,c)})})(t.columns,0,t);let o=t.page_slice(),r=`<table class="dtbl ${this.table.opts.sticky_header?"dtbl-sticky":""}"><thead>`;for(let a of i){r+="<tr>";for(let n of a){let l=[];n.colspan>1&&l.push(`colspan="${n.colspan}"`),n.rowspan>1&&l.push(`rowspan="${n.rowspan}"`),n.id&&l.push(`data-col-id="${n.id}"`),n.align&&l.push(`style="text-align:${n.align}"`),r+=`<th ${l.join(" ")}>${n.label}${n.id&&n.sortable?'<span class="dtbl-sort">\u2195</span>':""}</th>`}r+="</tr>"}r+="</thead><tbody>";for(let a of o.rows){r+="<tr>";for(let n of e){let l=a[n.id],c=this.table.model.formatters.get(n.id),u=c?c(l,a):l==null?"":String(l);r+=`<td${n.align?` style="text-align:${n.align}"`:""}>${u}</td>`}r+="</tr>"}return r+="</tbody></table>",r+=this.table.plugins.map(a=>a.footer_html?.(o)||"").join(""),r}};var B=class{constructor(t={}){this.id=L.uid(),this.opts={sticky_header:!0,locale:void 0,...t},this.mode="virtual",this.model=new I({locale:this.opts.locale}),this.renderer=new O(this),this.plugins=[],this._plugin_by_name=new Map,this._wrap=null,this._adopt_table=null,this._adopt_sort_state=null,this._adopt_page=null,L.reg.set(this.id,this),L.init()}};function ht(p){return class extends p{static plugins=Object.create(null);static _names=[];static register_plugin(e,s){let i=String(e).toLowerCase();this.plugins[i]=s,this._names.includes(i)||this._names.push(i);let o=i.replace(/(^|[_-])(\w)/g,(r,a,n)=>n.toUpperCase());Object.hasOwn(this,o)||Object.defineProperty(this,o,{value:s,enumerable:!0})}static plugin_names(){return[...this._names]}use(e,s){let i,o;if(typeof e=="string"){o=e.toLowerCase();let a=this.constructor.plugins[o];if(!a)throw new Error(`unknown plugin "${o}". Available: ${this.constructor.plugin_names().join(", ")||"none"}`);i=new a(s||{})}else i=e,o=(i?.name||i?.constructor?.name||"plugin").toString().toLowerCase();i.attach?.(this),this.plugins.push(i),this._plugin_by_name.set(o,i);let r=o.replace(/-+/g,"_");return Object.hasOwn(this,r)||Object.defineProperty(this,r,{value:i,enumerable:!0}),this._render_toolbar_dom?.(),this}}}function _t(p){return class extends p{get_columns(){return this.model.get_columns()}get_flat_columns(){return this.model.get_flat_columns()}set_columns(e,{render:s=!0}={}){return this.model.set_columns(e),this.mode==="virtual"?s&&this._render_virtual_body?.(!0):(this._apply_column_meta_to_thead?.(this.model.get_flat_columns()),s&&this._render_toolbar_dom?.()),this}update_column(e,s={},{render:i=!0}={}){if(this.model.update_column(e,s),this.mode==="virtual")i&&this._render_virtual_body?.(!0);else{let o=this.model.get_flat_columns().find(r=>r.id===e);this._apply_column_meta_to_thead?.({[e]:o})}return this}set_columns_meta(e={},{render:s=!0}={}){return this.model.set_columns_meta(e),this.mode==="virtual"?s&&this._render_virtual_body?.(!0):(this._apply_column_meta_to_thead?.(e),s&&this._render_toolbar_dom?.()),this}}}function ut(p){return class extends p{set_rows(e,{render:s=!0}={}){if(this.model.set_rows(e),this.mode==="virtual")s&&this._render_virtual_body?.(!1);else if(s){let i=this._wrap?.querySelector(".dtbl-search")?.value||"";this._adopt_filter?.(i)}return this}add_rows(e=[],{render:s=!0}={}){if(this.model.add_rows(e),this.mode==="virtual")s&&this._render_virtual_body?.(!1);else if(s){let i=this._wrap?.querySelector(".dtbl-search")?.value||"";this._adopt_filter?.(i)}return this}clear_rows(){return this.model.clear_rows(),this.mode==="virtual"?this._render_virtual_body?.(!1):this._adopt_filter?.(this._wrap?.querySelector(".dtbl-search")?.value||""),this}update_row_at(e,s={},{render:i=!1}={}){return this.model.update_row_at(e,s),i&&(this.mode==="virtual"?this._render_virtual_body?.(!1):this._adopt_filter?.(this._wrap?.querySelector(".dtbl-search")?.value||"")),this}set_cell_at(e,s,i,{render:o=!1}={}){return this.model.set_cell_at(e,s,i),o&&(this.mode==="virtual"?this._render_virtual_body?.(!1):this._adopt_filter?.(this._wrap?.querySelector(".dtbl-search")?.value||"")),this}get_rows(e="view"){return this.model.get_rows(e)}from_nested_dict(e,s="row"){let i=new Set;for(let r in e)Object.keys(e[r]||{}).forEach(a=>i.add(a));let o=[...i].map(r=>{let a={[s]:r};for(let n in e)a[n]=e[n]?.[r];return a});return this.set_rows(o)}format(e,s){return this.model.format(e,s),this}}}function mt(p){return class extends p{toString(){return`<div class="dtbl-wrap" data-dtbl-id="${this.id}">${this.renderer.toolbar_html()}${this.renderer.table_html()}</div>`}_render_virtual_body(e=!1){let s=document.querySelector(`[data-dtbl-id="${this.id}"]`);if(s){if(e&&s.querySelector("table")?.remove(),e)s.insertAdjacentHTML("beforeend",this.renderer.table_html());else{let i=s.querySelector("table");if(!i){s.insertAdjacentHTML("beforeend",this.renderer.table_html());return}let o=document.createElement("tbody"),r=this.model.apply(),{rows:a,page:n,total_pages:l}=r.page_slice(),c=r.flat_columns();for(let _ of a){let b=document.createElement("tr");for(let m of c){let f=document.createElement("td");m.align&&(f.style.textAlign=m.align);let x=this.model.formatters.get(m.id),g=_[m.id];f.innerHTML=x?x(g,_):g==null?"":String(g),b.appendChild(f)}o.appendChild(b)}i.tBodies[0]?.replaceWith(o);let u=s.querySelector(".dtbl-page-label");u&&(u.textContent=`Page ${n} / ${l}`);let h=s.querySelector(".dtbl-page-prev"),d=s.querySelector(".dtbl-page-next");h&&(h.disabled=n<=1),d&&(d.disabled=n>=l)}this._update_sort_icons(),e&&this._lock_column_widths?.(),this._apply_zebra?.()}}_update_sort_icons(){let e=document.querySelector(`[data-dtbl-id="${this.id}"]`);if(!e)return;let s=e.querySelector("thead");if(!s)return;let i=Array.from(s.rows);if(!i.length)return;let o=i.length-1,r=[],a=(h,d,_)=>{(r[h]??=[])[d]=_};for(let h=0;h<i.length;h++){let d=0;for(let _ of i[h].cells){let b=Math.max(1,_.colSpan||1),m=Math.max(1,_.rowSpan||1);for(;r[h]?.[d]!=null;)d++;let f=d,x=f+b-1;for(let g=h;g<h+m;g++)for(let w=f;w<=x;w++)a(g,w,_);d=x+1}}let n=(r[o]||[]).filter(Boolean),l=[];this.mode==="virtual"?l=(this.model.sort_state||[]).map(h=>({key:h.key,asc:h.asc})):l=(this._adopt_sort_state||[]).map(h=>{let d=n[h.index];return d?{key:d.dataset.colId,asc:h.asc}:null}).filter(Boolean);let c=l.length,u=h=>{let d=l.findIndex(_=>_.key===h);return d>=0?d+1:0};for(let h of n){let d=h.dataset.colId||"";if(h.dataset.sort!=="true"){h.querySelector(".dtbl-sort")?.remove(),h.querySelector(".dtbl-sort-idx")?.remove(),h.classList.remove("is-sorted"),h.removeAttribute("data-sort-order");continue}let _=h.querySelector(".dtbl-sort");_||(_=document.createElement("span"),_.className="dtbl-sort",h.appendChild(_));let b=null;if(this.mode==="virtual"){let x=(this.model.sort_state||[]).find(g=>g.key===d);b=x?x.asc:null}else{let x=n.indexOf(h),g=(this._adopt_sort_state||[]).find(w=>w.index===x);b=g?g.asc:null}_.textContent=b==null?"\u2195":b?"\u25B2":"\u25BC";let m=u(d),f=h.querySelector(".dtbl-sort-idx");m>0&&c>1?(f||(f=document.createElement("sup"),f.className="dtbl-sort-idx",h.appendChild(f)),f.textContent=String(m),h.classList.add("is-sorted"),h.dataset.sortOrder=String(m)):(f?.remove(),b==null?(h.classList.remove("is-sorted"),h.removeAttribute("data-sort-order")):(h.classList.add("is-sorted"),h.dataset.sortOrder="1"))}}_apply_zebra(){let s=(this._adopt_table||document.querySelector(`[data-dtbl-id="${this.id}"] table`))?.tBodies?.[0];if(!s)return;let i=0;for(let o of s.rows){let r=o.dataset.hidden==="true"||o.style.display==="none";o.classList.remove("dtbl-row-odd","dtbl-row-even"),!r&&(o.classList.add(i%2?"dtbl-row-even":"dtbl-row-odd"),i++)}}_lock_column_widths({include_icons:e=!0,extra_px:s=6}={}){let i=this._adopt_table||document.querySelector(`[data-dtbl-id="${this.id}"] table`);if(!i)return;let o=i.tHead||i.querySelector("thead");if(!o)return;let r=Array.from(o.rows);if(!r.length)return;let a=r.length-1,n=[],l=(_,b,m)=>{n[_]??=[],n[_][b]=m};for(let _=0;_<r.length;_++){let b=0;for(let m of r[_].cells){let f=Math.max(1,m.colSpan||1),x=Math.max(1,m.rowSpan||1);for(;n[_]?.[b]!=null;)b++;let g=b,w=g+f-1;for(let k=_;k<_+x;k++)for(let $=g;$<=w;$++)l(k,$,m);b=w+1}}let c=(n[a]||[]).filter(Boolean),u=_=>{let b=Math.ceil(Math.max(_.scrollWidth||0,_.getBoundingClientRect().width||0));if(!e)return b+s;let m=0,f=x=>{if(!x)return;let g=getComputedStyle(x),w=g.position;if(w==="absolute"||w==="fixed"){let k=x.getBoundingClientRect(),$=parseFloat(g.marginLeft)||0,vt=parseFloat(g.marginRight)||0;m+=Math.ceil(k.width+$+vt)}};return f(_.querySelector(".dtbl-sort")),f(_.querySelector(".dtbl-sort-idx")),b+m+s},h=c.map(u),d=i.querySelector("colgroup[data-dtbl-colgroup]");for(d||(d=document.createElement("colgroup"),d.setAttribute("data-dtbl-colgroup","true"),i.insertBefore(d,i.firstChild));d.children.length<h.length;)d.appendChild(document.createElement("col"));for(;d.children.length>h.length;)d.removeChild(d.lastChild);h.forEach((_,b)=>{d.children[b].style.width=`${_}px`}),i.style.tableLayout="fixed"}_render_toolbar_dom(){let e=this._wrap||this._adopt_table?.closest(".dtbl-wrap");if(!e)return;e.querySelector(".dtbl-toolbar")?.remove();let s=document.createElement("div");s.innerHTML=`<div class="dtbl-toolbar">${this.plugins.map(a=>a.toolbar_html?.()||"").join("")}</div>`,e.prepend(s.firstChild),e.querySelector(".dtbl-pager")?.remove();let o=this.model.apply().page_slice(),r=this.plugins.map(a=>a.footer_html?.(o)||"").join("");r&&e.insertAdjacentHTML("beforeend",r)}_dispatch_input(e){for(let s of this.plugins)s.handle_input?.(e)}_dispatch_click(e){for(let s of this.plugins)s.handle_click?.(e)}}}function bt(p){return class extends p{static enhance(e,s={}){let i=new this(s);i.mode="adopt";let o=typeof e=="string"?document.querySelector(e):e;if(!o||o.tagName!=="TABLE")throw new Error("enhance: provide <table>");i._adopt_table=o,o.classList.add("dtbl"),i.opts.sticky_header&&o.classList.add("dtbl-sticky"),i._ingest_columns_from_thead(o.tHead||o.querySelector("thead"));let r=document.createElement("div");return r.className="dtbl-wrap",r.dataset.dtblId=i.id,o.parentNode.insertBefore(r,o),r.appendChild(o),i._wrap=r,i._render_toolbar_dom?.(),i._update_sort_icons?.(),i._lock_column_widths?.(),i}static _slug(e){let s=String(e||"").trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu,"_").replace(/^_+|_+$/g,"");return s?/\d/.test(s[0])?`c_${s}`:s:"col"}_ingest_columns_from_thead(e){let s=Array.from(e?.rows||[]);if(!s.length)return;let i=[],o=s.map(()=>[]),r=(d,_,b)=>{i[d]??=[],i[d][_]=b};for(let d=0;d<s.length;d++){let _=0;for(let b of s[d].cells){let m=Math.max(1,b.colSpan||1),f=Math.max(1,b.rowSpan||1);for(;i[d]?.[_]!=null;)_++;let x=_,g=x+m-1;for(let w=d;w<d+f;w++)for(let k=x;k<=g;k++)r(w,k,b);o[d].push({th:b,row:d,col_start:x,col_end:g,row_span:f,col_span:m}),_=g+1}}let a=s.length-1,n=d=>String(d??"").trim().toLowerCase()==="true",l=(d,_)=>{let b=(d.textContent||"").trim()||_,m=(d.dataset.colId||"").trim();m||(m=this.constructor._slug(b),d.dataset.colId=m);let f=n(d.dataset.sort),x=d.style.textAlign&&/^(left|center|right)$/.test(d.style.textAlign)?d.style.textAlign:null,g=n(d.dataset.search);return{id:m,label:b,sortable:f,align:x,searchable:g}},c=d=>{d.children?d.children.forEach(c):d.searchable=!0},u=d=>{let _=d.row+d.row_span,b=[];if(_<=a)for(let m of o[_])m.col_start>=d.col_start&&m.col_end<=d.col_end&&b.push(u(m));if(b.length){let m=l(d.th,`Group ${d.row}:${d.col_start}`),f={label:m.label,children:b};return m.searchable&&c(f),f}else{let{id:m,label:f,sortable:x,align:g,searchable:w}=l(d.th,`Col ${d.row}:${d.col_start}`);return{id:m,label:f,sortable:x,align:g,searchable:w}}},h=o[0].map(u);this.model.set_columns(h),this._adopt_cache_searchable_indexes_from_model()}_adopt_cache_searchable_indexes_from_model(){let e=this.model.get_flat_columns(),s=[];for(let i=0;i<e.length;i++)e[i]?.searchable===!0&&s.push(i);this._adopt_search_cols=s}_adopt_cache_searchable_indexes(e){let s=e?.rows?.[e.rows.length-1];if(!s){this._adopt_search_cols=null;return}let i=[];Array.from(s.cells).forEach((o,r)=>{o.dataset.search==="true"&&i.push(r)}),this._adopt_search_cols=i}_apply_column_meta_to_thead(e){if(!this._adopt_table)return;let s=this._adopt_table.tHead||this._adopt_table.querySelector("thead");if(!s)return;let i=s.rows[s.rows.length-1];if(!i)return;let o=Array.isArray(e)?Object.fromEntries(e.filter(r=>r&&r.id).map(r=>[r.id,r])):e;for(let r of i.cells){let a=(r.dataset.colId||"").trim();if(!a||!o[a])continue;let n=o[a];if(n.label!=null){let l=r.querySelector(".dtbl-sort");r.textContent=String(n.label),l&&r.appendChild(l)}if(n.align&&(r.style.textAlign=n.align),n.sortable!=null){r.dataset.sort=n.sortable?"true":"false";let l=r.querySelector(".dtbl-sort");n.sortable?l||(l=document.createElement("span"),l.className="dtbl-sort",l.textContent="\u2195",r.appendChild(l)):l?.remove()}n.searchable!=null&&(r.dataset.search=n.searchable?"true":"false")}this._adopt_cache_searchable_indexes_from_model(),this._update_sort_icons?.()}_adopt_filter(e){let s=this._adopt_table.tBodies[0],i=(e||"").toLowerCase();this._adopt_search_cols||this._adopt_cache_searchable_indexes_from_model();let o=this._adopt_search_cols||[];for(let r of s.rows){let a=i==="";if(!a)for(let n=0;n<o.length;n++){let l=o[n],c=r.cells[l];if(c&&c.textContent.toLowerCase().includes(i)){a=!0;break}}r.dataset.hidden=a?"false":"true",r.style.display=a?"":"none"}this._adopt_page!=null&&this._apply_adopt_pagination(),this._apply_zebra?.()}_adopt_sort(e,s,{new_first:i=!0,tri_state:o=!0,alt_clears_all:r=!1,alt:a=!1}={}){if(!e||e.dataset.sort!=="true")return;this._adopt_sort_state??=[];let n=[...e.parentNode.children].indexOf(e);if(r&&a){this._adopt_sort_state=[],this._apply_adopt_sort_to_dom();return}let l=this._adopt_sort_state.findIndex(c=>c.index===n);if(!s)l<0?this._adopt_sort_state=[{index:n,asc:!0}]:o&&this._adopt_sort_state[l].asc?this._adopt_sort_state=[{index:n,asc:!1}]:this._adopt_sort_state=[];else if(l<0){let c={index:n,asc:!0};i?this._adopt_sort_state.unshift(c):this._adopt_sort_state.push(c)}else{let c=this._adopt_sort_state[l];if(o&&c.asc?this._adopt_sort_state[l]={index:n,asc:!1}:this._adopt_sort_state.splice(l,1),i&&l!==0&&l<this._adopt_sort_state.length){let[u]=this._adopt_sort_state.splice(l,1);this._adopt_sort_state.unshift(u)}}this._apply_adopt_sort_to_dom()}_apply_adopt_sort_to_dom(){let e=this._adopt_table?.tBodies?.[0];if(!e)return;let s=[...e.rows],i=s.filter(a=>a.dataset.hidden!=="true"),o=s.filter(a=>a.dataset.hidden==="true");if(!this._adopt_sort_state.length)return;let r=this.model.collator;i.sort((a,n)=>{for(let l of this._adopt_sort_state){let c=a.cells[l.index]?.textContent.trim()??"",u=n.cells[l.index]?.textContent.trim()??"",h=parseFloat(c),d=parseFloat(u),_=!Number.isNaN(h)&&!Number.isNaN(d)?h-d:r.compare(c,u);if(_)return l.asc?_:-_}return 0}),e.replaceChildren(...i,...o),this._adopt_page!=null&&this._apply_adopt_pagination(),this._apply_zebra?.()}_adopt_page_info(){let e=[...this._adopt_table.tBodies[0].rows].filter(i=>i.dataset.hidden!=="true"),s=this.model.page_size||e.length;return{total_pages:Math.max(1,Math.ceil(e.length/s))}}_apply_adopt_pagination(){let s=[...this._adopt_table.tBodies[0].rows].filter(l=>l.dataset.hidden!=="true"),i=this.model.page_size||s.length,o=Math.max(1,Math.ceil(s.length/i));this._adopt_page=Math.max(1,Math.min(o,this._adopt_page||1)),s.forEach((l,c)=>{l.style.display=c>=(this._adopt_page-1)*i&&c<this._adopt_page*i?"":"none"});let r=this._wrap.querySelector(".dtbl-page-label");r&&(r.textContent=`Page ${this._adopt_page} / ${o}`);let a=this._wrap.querySelector(".dtbl-page-prev"),n=this._wrap.querySelector(".dtbl-page-next");a&&(a.disabled=this._adopt_page<=1),n&&(n.disabled=this._adopt_page>=o),this._apply_zebra?.()}}}function ft(p){return class extends p{to_csv(){if(this.mode==="adopt"){let l=[...this._adopt_table.tHead.querySelectorAll("tr:last-child th")].map(d=>d.textContent.trim()),u=[...this._adopt_table.tBodies[0].rows].filter(d=>d.dataset.hidden!=="true").map(d=>[...d.cells].map(_=>_.textContent.trim())),h=d=>(d=d==null?"":String(d),/[",\n]/.test(d)?`"${d.replace(/"/g,'""')}"`:d);return[l.map(h).join(","),...u.map(d=>d.map(h).join(","))].join(`
`)}let e=this.model.apply(),s=e.flat_columns(),{rows:i}=e.page_size?e.page_slice():{rows:e.view_rows.length?e.view_rows:e.rows},o=n=>(n=n==null?"":String(n),/[",\n]/.test(n)?`"${n.replace(/"/g,'""')}"`:n),r=s.map(n=>o(n.label)).join(","),a=i.map(n=>s.map(l=>o(e.formatters.get(l.id)?.(n[l.id],n)??n[l.id]??"")).join(",")).join(`
`);return`${r}
${a}`}to_json(){if(this.mode==="adopt"){let i=this._adopt_table.tBodies[0],o=[...this._adopt_table.tHead.querySelectorAll("tr:last-child th")].map((a,n)=>a.dataset.colId||a.textContent.trim()||`col${n+1}`),r=[...i.rows].filter(a=>a.dataset.hidden!=="true").map(a=>{let n={};return[...a.cells].forEach((l,c)=>n[o[c]]=l.textContent.trim()),n});return JSON.stringify(r,null,2)}let e=this.model.apply(),{rows:s}=e.page_size?e.page_slice():{rows:e.view_rows.length?e.view_rows:e.rows};return JSON.stringify(s,null,2)}static _download_blob(e,s,i){let o=new Blob([e],{type:i}),r=document.createElement("a");r.href=URL.createObjectURL(o),r.download=s,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),0)}}}var y=class{attach(t){return this.table=t,this}toolbar_html(){return""}footer_html(){return""}handle_input(t){}handle_click(t){}};var H=class extends y{constructor({placeholder:t="Search\u2026",debounce_ms:e=120}={}){super(),this.placeholder=t,this.debounce_ms=e}toolbar_html(){return`<input type="search" class="dtbl-search form-input" placeholder="${this.placeholder}">`}handle_input(t){t.target.matches(".dtbl-search")&&(clearTimeout(this._t),this._t=setTimeout(()=>{let e=t.target.value||"";this.table.mode==="virtual"?(this.table.model.set_query(e),this.table._render_virtual_body()):this.table._adopt_filter(e)},this.debounce_ms))}};var R=class extends y{constructor({multi:t=!0,require_modifier:e=!1,new_first:s=!0,alt_clears_all:i=!1}={}){super(),this.multi=t,this.require_modifier=e,this.new_first=s,this.alt_clears_all=i}handle_click(t){let e=t.target.closest("th[data-col-id]");if(!e||e.dataset.sort!=="true")return;let s=this.multi&&(!this.require_modifier||t.shiftKey||t.metaKey||t.ctrlKey),i=e.dataset.colId;if(this.table.mode==="virtual"){if(this.alt_clears_all&&t.altKey){this.table.model.set_sort([]),this.table._render_virtual_body(),this.table._update_sort_icons?.();return}let o=this._cycle_state(this.table.model.sort_state,i,s,this.new_first);this.table.model.set_sort(o),this.table._render_virtual_body(),this.table._update_sort_icons?.()}else this.table._adopt_sort(e,s,{new_first:this.new_first,tri_state:!0,alt_clears_all:this.alt_clears_all,alt:t.altKey}),this.table._update_sort_icons?.()}_cycle_state(t,e,s,i){let o=t.slice(),r=o.findIndex(a=>a.key===e);if(!s)return r<0?[{key:e,asc:!0}]:o[r].asc?(o[r]={key:e,asc:!1},o):(o.splice(r,1),o);if(r<0){let a={key:e,asc:!0};return i?o.unshift(a):o.push(a),o}if(o[r].asc?o[r]={key:e,asc:!1}:o.splice(r,1),i&&r<o.length&&r!==0){let[a]=o.splice(r,1);o.unshift(a)}return o}};var P=class extends y{constructor({page_size:t=10}={}){super(),this.page_size=t}attach(t){return super.attach(t),t.model.set_page_size(this.page_size),t.mode!=="virtual"&&(t._adopt_page=1,t._apply_adopt_pagination?.()),this}toolbar_html(){return""}footer_html(){if(this.table.mode==="virtual"){let{page:t,total_pages:e}=this.table.model.apply().page_slice();return this._pager_html(t,e)}else{let{total_pages:t}=this.table._adopt_page_info(),e=Math.max(1,Math.min(t,this.table._adopt_page||1));return this._pager_html(e,t)}}handle_click(t){let e=t.target.closest(".dtbl-page-prev, .dtbl-page-next");if(!e||e.disabled)return;let s=e.classList.contains("dtbl-page-prev")?-1:1;if(this.table.mode==="virtual"){let{total_pages:i}=this.table.model.apply().page_slice(),o=this.table.model.page||1,r=Math.max(1,Math.min(i,o+s));this.table.model.set_page(r),this.table._render_virtual_body()}else{let{total_pages:i}=this.table._adopt_page_info(),o=this.table._adopt_page||1;this.table._adopt_page=Math.max(1,Math.min(i,o+s)),this.table._apply_adopt_pagination()}}_pager_html(t,e){let s=t<=1?"disabled":"",i=t>=e?"disabled":"";return`
      <div class="dtbl-pager">
        <button class="dtbl-page-prev" ${s} aria-label="Previous page">\u25C0</button>
        <span class="dtbl-page-label">Page ${t} / ${e}</span>
        <button class="dtbl-page-next" ${i} aria-label="Next page">\u25B6</button>
      </div>`}};var D=class extends y{constructor({filename:t="data",default_scope:e="filtered",key_source:s="label",json_key_source:i=null,path_sep:o=" / "}={}){super(),this.filename=t,this.default_scope=e,this.key_source=s,this.json_key_source=i||s,this.path_sep=o}attach(t){this.table=t}toolbar_html(){return`
      <button class="dtbl-btn dtbl-btn-icon dtbl-download" title="Export">
        <span class="material-symbols-outlined">file_download</span>
      </button>`}handle_click(t){t.target.closest(".dtbl-download")&&this._open_popup()}_open_popup(){let t="dl_"+Math.random().toString(36).slice(2,8),e=this._gather_info(),s=`
      <h2 class="title">Download</h2>
      <div id="${t}" class="dtbl-dl">
        <div class="dtbl-dl__stats">
          <div><b>Columns:</b> ${e.cols}</div>
          <div><b>Rows (all):</b> ${e.rows_all}</div>
          <div><b>Rows (filtered):</b> ${e.rows_filtered}</div>
          <div><b>Rows (page):</b> ${e.rows_page}</div>
        </div>
        <div class="dtbl-dl__scope">
          <div class="dtbl-dl__legend">Scope</div>
          <label><input type="radio" name="dl-scope" value="all"      ${this.default_scope==="all"?"checked":""}> All rows</label>
          <label><input type="radio" name="dl-scope" value="filtered" ${this.default_scope==="filtered"?"checked":""}> Filtered rows</label>
          <label><input type="radio" name="dl-scope" value="page"     ${this.default_scope==="page"?"checked":""}> Current page</label>
        </div>
        <div class="dtbl-dl__actions">
          <button class="dtbl-dl__btn btn-csv"  data-act="csv"><span class="material-symbols-outlined">table_chart</span> CSV</button>
          <button class="dtbl-dl__btn btn-tsv"  data-act="tsv"><span class="material-symbols-outlined">grid_on</span> TSV</button>
          <button class="dtbl-dl__btn btn-json" data-act="json"><span class="material-symbols-outlined">data_object</span> JSON</button>
          <button class="dtbl-dl__btn btn-md"   data-act="md"><span class="material-symbols-outlined">text_snippet</span> Markdown</button>
          <button class="dtbl-dl__btn btn-cpy"  data-act="copy"><span class="material-symbols-outlined">content_copy</span> Copy</button>
        </div>
      </div>`;new PopUp({title:"Export data",content:s,actions:[{label:"Close",role:"close"}]}).open();let i=document.getElementById(t);i&&i.addEventListener("click",o=>{let r=o.target.closest(".dtbl-dl__btn");if(!r)return;let a=i.querySelector('input[name="dl-scope"]:checked')?.value||this.default_scope,n=r.dataset.act;n==="csv"?this._export_csv(a):n==="tsv"?this._export_tsv(a):n==="json"?this._export_json(a):n==="md"?this._export_md(a):n==="copy"&&this._copy_csv(a)})}_gather_info(){let e=this.table.model.get_flat_columns().length;if(this.table.mode==="virtual")return{cols:e,rows_all:this.table.model.get_rows("raw").length,rows_filtered:this.table.model.get_rows("view").length,rows_page:this.table.model.get_rows("page").length};let s=this.table._adopt_table.tBodies[0],i=s.rows.length,o=[...s.rows].filter(a=>a.dataset.hidden!=="true").length,r=[...s.rows].filter(a=>a.dataset.hidden!=="true"&&a.style.display!=="none").length;return{cols:e,rows_all:i,rows_filtered:o,rows_page:r}}_export_csv(t){let{headers:e,values:s}=this._collect_flat(t,!0),i=this._to_delim(e,s,",");this._download(`${this.filename}.csv`,i,"text/csv;charset=utf-8")}_export_tsv(t){let{headers:e,values:s}=this._collect_flat(t,!0),i=this._to_delim(e,s,"	");this._download(`${this.filename}.tsv`,i,"text/tab-separated-values;charset=utf-8")}_export_md(t){let{headers:e,values:s}=this._collect_flat(t,!0),i=l=>String(l).replace(/\|/g,"\\|"),o=`| ${e.map(i).join(" | ")} |`,r=`| ${e.map(()=>"---").join(" | ")} |`,a=s.map(l=>`| ${l.map(c=>i(c)).join(" | ")} |`).join(`
`),n=`${o}
${r}
${a}
`;this._download(`${this.filename}.md`,n,"text/markdown;charset=utf-8")}async _copy_csv(t){let{headers:e,values:s}=this._collect_flat(t,!0),i=this._to_delim(e,s,",");try{await navigator.clipboard.writeText(i)}catch{let o=document.createElement("textarea");o.value=i,document.body.appendChild(o),o.select();try{document.execCommand("copy")}finally{o.remove()}}}_export_json(t){let{paths:e,values:s}=this._collect_for_json(t),i=s.map(r=>this._nest_row(e,r)),o=JSON.stringify(i,null,2);this._download(`${this.filename}.json`,o,"application/json;charset=utf-8")}_collect_flat(t,e){let s=this.table.model.get_columns(),i=this.table.model.get_flat_columns(),r=this._leaf_paths(s,this.key_source).map(c=>c.join(this.path_sep));if(this.table.mode==="virtual"){let c=this.table.model;c.apply();let u;t==="all"?u=c.get_rows("raw"):t==="filtered"?u=c.get_rows("view"):u=c.get_rows("page");let h=c.formatters,d=u.map(_=>i.map(b=>{let m=_[b.id];if(!e)return m;let f=h.get(b.id);return f?f(m,_):m??""}));return{headers:r,values:d}}let a=this.table._adopt_table.tBodies[0],n;t==="all"?n=[...a.rows]:t==="filtered"?n=[...a.rows].filter(c=>c.dataset.hidden!=="true"):n=[...a.rows].filter(c=>c.dataset.hidden!=="true"&&c.style.display!=="none");let l=n.map(c=>{let u=[...c.cells];return i.map((h,d)=>u[d]?.textContent?.trim()??"")});return{headers:r,values:l}}_collect_for_json(t){let e=this.table.model.get_columns(),s=this.table.model.get_flat_columns(),i=this._leaf_paths(e,this.json_key_source);if(this.table.mode==="virtual"){let n=this.table.model;n.apply();let l;t==="all"?l=n.get_rows("raw"):t==="filtered"?l=n.get_rows("view"):l=n.get_rows("page");let c=l.map(u=>s.map(h=>u[h.id]));return{paths:i,values:c}}let o=this.table._adopt_table.tBodies[0],r;t==="all"?r=[...o.rows]:t==="filtered"?r=[...o.rows].filter(n=>n.dataset.hidden!=="true"):r=[...o.rows].filter(n=>n.dataset.hidden!=="true"&&n.style.display!=="none");let a=r.map(n=>{let l=[...n.cells];return s.map((c,u)=>l[u]?.textContent?.trim()??"")});return{paths:i,values:a}}_leaf_paths(t,e){let s=[],i=r=>e==="id"?r.id??r.label??"col":r.label??r.id??"col",o=(r,a=[])=>{for(let n of r||[])if(n.children&&n.children.length){let l=e==="id"?n.id??n.label??"":n.label??n.id??"";o(n.children,l?[...a,l]:[...a])}else s.push([...a,i(n)])};return o(t,[]),s}_nest_row(t,e){let s={};for(let i=0;i<t.length;i++){let o=t[i],r=s;for(let n=0;n<o.length-1;n++){let l=o[n]??"";(!(l in r)||typeof r[l]!="object"||r[l]===null)&&(r[l]={}),r=r[l]}let a=o[o.length-1]??"value";r[a]=e[i]}return s}_to_delim(t,e,s){let i=a=>(a=a==null?"":String(a),/[\"\n,]/.test(a)?`"${a.replace(/"/g,'""')}"`:a),o=t.map(i).join(s),r=e.map(a=>a.map(n=>i(n)).join(s)).join(`
`);return`${o}
${r}`}_download(t,e,s){if(typeof this.table.constructor._download_blob=="function"){this.table.constructor._download_blob(e,t,s);return}let o=new Blob([e],{type:s}),r=document.createElement("a");r.href=URL.createObjectURL(o),r.download=t,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),0)}};v(pt,"webtool__table_css");var G=class extends B{},Q=class extends ht(G){},Z=class extends _t(Q){},tt=class extends ut(Z){},et=class extends mt(tt){},st=class extends bt(et){},C=class extends ft(st){};C.register_plugin("search",H);C.register_plugin("sort",R);C.register_plugin("pagination",P);C.register_plugin("downloads",D);var ot={};E(ot,{LoadingScreen:()=>U});var gt=`
#loading-screen.active {
    display: flex; /* visible */
}

#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(25, 25, 25, 0.8);
    color: #f3f3f3;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    max-height: 100vh;
}

.spinner {
    border: 8px solid #333; /* Light gray */
    border-top: 8px solid #f3f3f3; /* White */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1.5s linear infinite;
    margin-bottom: 1.5rem;
}

#loading-steps {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.loading-step {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 15px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.loading-step-title {
    font-weight: 600;
    font-size: 1.1em;
    color: #eee;
}

.loading-step-progress {
    width: 100%;
    height: 14px;
    border-radius: 7px;
    overflow: hidden;
    -webkit-appearance: none;
    appearance: none;
}

.loading-step-progress::-webkit-progress-bar {
    background-color: #444;
    border-radius: 7px;
}

.loading-step-progress::-webkit-progress-value {
    background-color: #66bb6a; /* green */
    border-radius: 7px;
}

.loading-step-progress::-moz-progress-bar {
    background-color: #66bb6a;
    border-radius: 7px;
}

.loading-step-info {
    font-size: 0.9em;
    color: #ccc;
    min-height: 18px; /* reserve space */
    font-style: italic;
}

#loading-detail {
    margin-top: 20px;
    max-width: 400px;
    color: #ccc;
    font-size: 0.9em;
    font-family: monospace;
}

.loading-detail-item {
    margin-bottom: 4px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;var U=class{static ROOT_ID="loading-screen";static STEPS_ID="loading-steps";static DETAIL_ID="loading-detail";static#t;static#e;static#s;static#i(){if(this.#t&&document.body.contains(this.#t))return;let t=document.getElementById(this.ROOT_ID);if(!t){t=document.createElement("div"),t.id=this.ROOT_ID;let e=document.createElement("div");e.className="spinner",t.appendChild(e);let s=document.createElement("div");s.id=this.STEPS_ID,t.appendChild(s);let i=document.createElement("div");i.id=this.DETAIL_ID,t.appendChild(i),document.body?document.body.appendChild(t):window.addEventListener("DOMContentLoaded",()=>{document.body.appendChild(t)})}this.#t=t,this.#e=t.querySelector("#"+this.STEPS_ID),this.#s=t.querySelector("#"+this.DETAIL_ID)}static show(){this.#i(),this.#t.classList.add("active")}static hide(){this.#i(),this.#t.classList.remove("active")}static update(t={}){this.#i();let e=Array.isArray(t.main_steps)?t.main_steps:[],s=t.detail&&typeof t.detail=="object"?t.detail:{};this.#e&&this.#o(e),this.#s&&this.#r(s)}static#o(t){let e=this.#e,s=Array.from(e.querySelectorAll(".loading-step")),i=new Map(s.map(o=>[o.dataset.title||o.querySelector(".loading-step-title")?.textContent||"",o]));s.forEach(o=>{let r=o.dataset.title||o.querySelector(".loading-step-title")?.textContent||"";t.find(a=>a.title===r)||o.remove()}),t.forEach(o=>{let r=String(o.title??""),a=i.get(r);if(!a){a=document.createElement("div"),a.className="loading-step",a.dataset.title=r;let n=document.createElement("div");n.className="loading-step-title",a.appendChild(n);let l=document.createElement("progress");l.className="loading-step-progress",l.max=1,a.appendChild(l);let c=document.createElement("div");c.className="loading-step-info",a.appendChild(c),e.appendChild(a)}a.dataset.title=r,a.querySelector(".loading-step-title").textContent=r,a.querySelector(".loading-step-progress").value=Number(o.progress??0),a.querySelector(".loading-step-info").textContent=String(o.info??"")})}static#r(t){let e=this.#s;e.innerHTML="",Object.entries(t).forEach(([s,i])=>{let o=document.createElement("div");o.className="loading-detail-item",o.textContent=`${s}: ${i}`,e.appendChild(o)})}};v(gt,"webtool__loading_screen_css");var rt={};E(rt,{Toast:()=>W});var xt=`/* Container : stack bottom-right */
#toast-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  pointer-events: none;
}

/* Toast element */
.toast {
  pointer-events: auto;
  min-width: 200px;
  max-width: 400px;
  padding: 10px 14px;
  border-radius: 4px;
  border-left: 14px solid transparent; /* couleur dynamique */
  background: #f9fafb; /* fond neutre clair */
  color: #111827;      /* texte neutre fonc\xE9 */
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  opacity: 0;
  transform: translateX(22px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

/* Active = visible */
.toast.active {
  opacity: 1;
  transform: translateX(-12px);
}

/* Variants: border-left color only */
.toast.info {
  border-color: #1a9a9c; /* bleu */
  color: #1a9a9c;
}
.toast.success {
  border-color: #33982a; /* vert */
  color: #33982a;
}
.toast.warning {
  border-color: #b68c00; /* orange */
  color: #b68c00;
}
.toast.error {
  border-color: #cd0000; /* rouge */
  color: #cd0000;
}
`;var W=class{static type=Object.freeze({info:"info",success:"success",warning:"warning",error:"error"});static _ensure(){let t=document.getElementById("toast-container");return t||(t=document.createElement("div"),t.id="toast-container",document.body.appendChild(t)),t}static _make(t,e,s=3e3,i={}){let o=this._ensure(),r=document.createElement("div");r.className=`toast ${t}`,r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),i.html?r.innerHTML=e:r.textContent=e,o.appendChild(r),requestAnimationFrame(()=>r.classList.add("active"));let a=()=>{r.classList.remove("active"),r.addEventListener("transitionend",()=>r.remove(),{once:!0})},n=setTimeout(a,s);return i.pauseOnHover&&r.addEventListener("mouseenter",()=>clearTimeout(n),{once:!0}),{el:r,close:a}}static clear(){let t=document.getElementById("toast-container");t&&(t.innerHTML="")}static info(t,e,s){return this._make(this.type.info,t,e,s)}static success(t,e,s){return this._make(this.type.success,t,e,s)}static warning(t,e,s){return this._make(this.type.warning,t,e,s)}static error(t,e,s){return this._make(this.type.error,t,e,s)}};v(xt,"webtool__toast_css");var nt={};E(nt,{Slider:()=>F});var wt=`/* file slider.css */

/* layout */
.slider {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  user-select: none;
  -webkit-user-select: none;
  overflow: hidden;
}

.slider-viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.slider-track {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.slider-slide {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* arrows */
.slider .slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: rgba(0,0,0,0.35);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  cursor: pointer;
}
.slider .slider-arrow:disabled { opacity: 0.4; cursor: default; }

.slider .slider-prev { left: 8px; }
.slider .slider-next { right: 8px; }

/* dots */
.slider .slider-dots {
  position: absolute;
  left: 0; right: 0; bottom: 8px;
  display: flex;
  gap: 6px;
  justify-content: center;
}

.slider .slider-dot {
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  padding: 0;
}
.slider .slider-dot.active { background: rgba(255,255,255,0.95); }

/* sensible defaults for inside content */
.slider-slide img, .slider-slide video, .slider-slide canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
`;var F=class p{static _id=0;constructor({slides:t=[],start_index:e=0,loop:s=!0,arrows:i=!0,dots:o=!0,autoplay_ms:r=0,pause_on_hover:a=!0,keyboard:n=!0,swipe:l=!0,on_change:c=null,slides_per_view:u=1,gap_px:h=16}={}){this.id=`slider-${p._id++}`,this.on_change=c,this._slides_spec=t,this._index=Math.max(0,Math.min(e,Math.max(0,t.length-1))),this._loop=s,this._arrows_enabled=i,this._dots_enabled=o,this._autoplay_ms=r|0,this._pause_on_hover=a,this._keyboard_enabled=n,this._swipe_enabled=l,this._timer=null,this._is_pointer_down=!1,this._pointer_start_x=0,this._drag_dx=0,this._root=document.createElement("div"),this._root.className="slider",this._root.id=this.id,this._root.setAttribute("role","region"),this._root.setAttribute("aria-roledescription","carousel"),this._viewport=document.createElement("div"),this._viewport.className="slider-viewport",this._root.appendChild(this._viewport),this._track=document.createElement("div"),this._track.className="slider-track",this._viewport.appendChild(this._track),this._arrows_enabled&&(this._btn_prev=document.createElement("button"),this._btn_prev.className="slider-arrow slider-prev",this._btn_prev.setAttribute("aria-label","Previous slide"),this._btn_prev.innerHTML="\u2039",this._btn_prev.addEventListener("click",()=>this.prev()),this._root.appendChild(this._btn_prev),this._btn_next=document.createElement("button"),this._btn_next.className="slider-arrow slider-next",this._btn_next.setAttribute("aria-label","Next slide"),this._btn_next.innerHTML="\u203A",this._btn_next.addEventListener("click",()=>this.next()),this._root.appendChild(this._btn_next)),this._dots=document.createElement("div"),this._dots.className="slider-dots",this._dots_enabled&&this._root.appendChild(this._dots),this.replace_slides(this._slides_spec),this._keyboard_enabled&&(this._on_keydown=d=>{d.key==="ArrowLeft"?this.prev():d.key==="ArrowRight"&&this.next()},this._root.tabIndex=0,this._root.addEventListener("keydown",this._on_keydown,!0)),this._swipe_enabled&&(this._viewport.addEventListener("pointerdown",d=>this._on_pointer_down(d)),this._viewport.addEventListener("pointermove",d=>this._on_pointer_move(d)),this._viewport.addEventListener("pointerup",d=>this._on_pointer_up(d)),this._viewport.addEventListener("pointercancel",d=>this._on_pointer_up(d)),this._viewport.addEventListener("pointerleave",d=>this._on_pointer_up(d))),this._pause_on_hover&&this._autoplay_ms>0&&(this._root.addEventListener("mouseenter",()=>this.pause()),this._root.addEventListener("mouseleave",()=>this.play())),this._on_resize=()=>this._apply_transform(0),window.addEventListener("resize",this._on_resize,{passive:!0}),this._autoplay_ms>0&&this.play(),this._slides_per_view=Math.max(1,u|0),this._gap_px=Math.max(0,h|0)}get el(){return this._root}get length(){return this._track.children.length}get index(){return this._index}replace_slides(t=[]){this._track.replaceChildren(),this._dots.replaceChildren(),t.forEach((e,s)=>{let i=document.createElement("div");if(i.className="slider-slide",e instanceof Node?i.appendChild(e):i.innerHTML=e??"",i.setAttribute("role","group"),i.setAttribute("aria-roledescription","slide"),i.setAttribute("aria-label",`${s+1} / ${t.length}`),this._track.appendChild(i),this._dots_enabled){let o=document.createElement("button");o.className="slider-dot",o.setAttribute("aria-label",`Go to slide ${s+1}`),o.addEventListener("click",()=>this.go_to(s)),this._dots.appendChild(o)}}),this._index=Math.max(0,Math.min(this._index,Math.max(0,t.length-1))),this._update_ui(!0)}append_to(t){return t.appendChild(this._root),this}go_to(t){if(this.length===0)return this;let e=Math.min(this._slides_per_view,Math.max(1,this.length)),s=Math.max(0,this.length-e),i=t;return this._loop?i=(t%this.length+this.length)%this.length:i=Math.max(0,Math.min(t,s)),i===this._index?this:(this._index=i,this._update_ui(!1),this.on_change&&this.on_change(this._index,this),this)}next(){return this.go_to(this._index+1)}prev(){return this.go_to(this._index-1)}play(){return this._autoplay_ms<=0?this:(this.pause(),this._timer=setInterval(()=>this.next(),this._autoplay_ms),this)}pause(){return this._timer&&(clearInterval(this._timer),this._timer=null),this}destroy(){this.pause(),window.removeEventListener("resize",this._on_resize),this._keyboard_enabled&&this._root.removeEventListener("keydown",this._on_keydown,!0),this._root.remove()}_update_ui(t){if(this._apply_transform(t?0:300),this._dots_enabled&&this._dots.querySelectorAll(".slider-dot").forEach((s,i)=>s.classList.toggle("active",i===this._index)),!this._loop&&this._arrows_enabled){let e=this._index===0,s=this._index===this.length-1;this._btn_prev.disabled=e,this._btn_next.disabled=s}}_apply_transform(t){let e=this._viewport.clientWidth,s=Math.min(this._slides_per_view,Math.max(1,this.length)),i=this._gap_px,o=(e-i*(s-1))/s,r=o+i;this._track.style.transition=t?`transform ${t}ms ease`:"none",this._track.style.transform=`translateX(${-(this._index*r)+this._drag_dx}px)`,this._track.style.display="flex",this._track.style.gap=`${i}px`,this._track.style.width=`${this.length*r}px`,Array.from(this._track.children).forEach(a=>{a.style.flex=`0 0 ${o}px`,a.style.width=`${o}px`})}_on_pointer_down(t){this._is_pointer_down=!0,this._drag_dx=0,this._pointer_start_x=t.clientX,this._track.style.transition="none",this._viewport.setPointerCapture(t.pointerId)}_on_pointer_move(t){if(!this._is_pointer_down)return;let e=t.clientX-this._pointer_start_x;this._drag_dx=e,this._apply_transform(0)}_on_pointer_up(t){if(!this._is_pointer_down)return;this._is_pointer_down=!1,this._viewport.releasePointerCapture(t.pointerId);let s=this._viewport.clientWidth*.15,i=this._drag_dx;this._drag_dx=0,i>s?this.prev():i<-s?this.next():this._update_ui(!1)}};v(wt,"webtool__slider_css");return St(Tt);})();
//# sourceMappingURL=toolbox.bundle.js.map
