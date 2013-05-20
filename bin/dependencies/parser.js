(function(){define(function(require){var t,e,n,r,i,o,s,a,l,u,p,c,h,m,d,f;return f=require("./globals"),c=require("./bindings/text-node"),p=require("./bindings/text"),t=require("./bindings/attribute"),s=require("./bindings/for"),i=require("./bindings/each"),m=require("./bindings/update"),r=require("./bindings/compose"),d=require("./bindings/value"),l=require("./bindings/if"),h=require("./bindings/unless"),o=require("./bindings/event"),n=require("./bindings/css"),a=require("./bindings/html"),e=require("./bindings/attribute-text"),u=function(){function u(t,e,n,r){var i=this;this.scope=e,this.parent=n,this.root=r,t.each(function(t,e){var n;return n=$(e),i.parseNode(n)})}return u.prototype.parseNode=function(t){var e,o=this;return e=!0,this.attachEvents(t),this.parseAttributes(t),3===t.get(0).nodeType?(new c(t,this.scope,this.parent,this.root),void 0):(t.data("css")&&new n(t,this.scope,this.parent,this.root),null!=t.data("if")&&(e=!1,new l(t,this.scope,this.parent,this.root,function(t){return new u(t,o.scope,o.parent,o.root)})),null!=t.data("unless")&&(e=!1,new h(t,this.scope,this.parent,this.root,function(t){return new u(t,o.scope,o.parent,o.root)})),t.data("compose")&&(e=!1,new r(t,this.scope,this.parent,this.root,function(t,e,n,r){return new u(t,e,n,r)})),t.data("for")&&(e=!1,new s(t,this.scope,this.parent,this.root,function(t,e,n,r){return new u(t,e,n,r)})),t.data("each")&&(e=!1,new i(t,this.scope,this.parent,this.root,function(t,e,n,r){return new u(t,e,n,r)})),t.data("text")&&(e=!1,new p(t,this.scope,this.parent,this.root)),t.data("html")&&new a(t,this.scope,this.parent,this.root),t.data("value")&&(e=!1,new d(t,this.scope,this.parent,this.root)),t.data("update")&&new m(t,this.scope,this.parent,this.root),e?t.contents().each(function(e,n){return t=$(n),o.parseNode(t)}):void 0)},u.prototype.parseAttributes=function(n){var r,i,o,s,a,l,u,p,c;for(u=f.attributes,o=0,a=u.length;a>o;o++)r=u[o],i=n.data(r),i&&new t(r,n,this.scope,this.parent,this.root);for(p=n.get(0).attributes||[],c=[],s=0,l=p.length;l>s;s++)r=p[s],c.push(new e(r,n,this.scope,this.parent,this.root));return c},u.prototype.attachEvents=function(t){var e,n,r,i,s,a;for(s=f.events,a=[],r=0,i=s.length;i>r;r++)e=s[r],n=t.data(e),n&&a.push(new o(e,t,this.scope,this.parent,this.root));return a},u.prototype.parseString=function(t){var e,n,r,i,o,s;switch(n=t.split("."),n[0]){case"$root":r=this.root,n.shift();break;case"$parent":r=this.parent,n.shift();break;case"$data":r=this.scope,n.shift();break;default:r=this.scope}for(i=r,o=0,s=n.length;s>o;o++)e=n[o],i=i[e];return i},u}()})}).call(this);