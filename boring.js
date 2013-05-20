(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.libGlobalName = factory();
    }
}(this, function () {
var requirejs,require,define;(function(e){function t(e,t){return E.call(e,t)}function n(e,t){var n,r,i,o,s,a,l,u,c,p,f=t&&t.split("/"),h=d.map,m=h&&h["*"]||{};if(e&&"."===e.charAt(0))if(t){for(f=f.slice(0,f.length-1),e=f.concat(e.split("/")),u=0;e.length>u;u+=1)if(p=e[u],"."===p)e.splice(u,1),u-=1;else if(".."===p){if(1===u&&(".."===e[2]||".."===e[0]))break;u>0&&(e.splice(u-1,2),u-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((f||m)&&h){for(n=e.split("/"),u=n.length;u>0;u-=1){if(r=n.slice(0,u).join("/"),f)for(c=f.length;c>0;c-=1)if(i=h[f.slice(0,c).join("/")],i&&(i=i[r])){o=i,s=u;break}if(o)break;!a&&m&&m[r]&&(a=m[r],l=u)}!o&&a&&(o=a,s=l),o&&(n.splice(0,s,o),e=n.join("/"))}return e}function r(t,n){return function(){return c.apply(e,L.call(arguments,0).concat([t,n]))}}function i(e){return function(t){return n(t,e)}}function o(e){return function(t){h[e]=t}}function s(n){if(t(m,n)){var r=m[n];delete m[n],g[n]=!0,u.apply(e,r)}if(!t(h,n)&&!t(g,n))throw Error("No "+n);return h[n]}function a(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function l(e){return function(){return d&&d.config&&d.config[e]||{}}}var u,c,p,f,h={},m={},d={},g={},E=Object.prototype.hasOwnProperty,L=[].slice;p=function(e,t){var r,o=a(e),l=o[0];return e=o[1],l&&(l=n(l,t),r=s(l)),l?e=r&&r.normalize?r.normalize(e,i(t)):n(e,t):(e=n(e,t),o=a(e),l=o[0],e=o[1],l&&(r=s(l))),{f:l?l+"!"+e:e,n:e,pr:l,p:r}},f={require:function(e){return r(e)},exports:function(e){var t=h[e];return t!==void 0?t:h[e]={}},module:function(e){return{id:e,uri:"",exports:h[e],config:l(e)}}},u=function(n,i,a,l){var u,c,d,E,L,T,M=[];if(l=l||n,"function"==typeof a){for(i=!i.length&&a.length?["require","exports","module"]:i,L=0;i.length>L;L+=1)if(E=p(i[L],l),c=E.f,"require"===c)M[L]=f.require(n);else if("exports"===c)M[L]=f.exports(n),T=!0;else if("module"===c)u=M[L]=f.module(n);else if(t(h,c)||t(m,c)||t(g,c))M[L]=s(c);else{if(!E.p)throw Error(n+" missing "+c);E.p.load(E.n,r(l,!0),o(c),{}),M[L]=h[c]}d=a.apply(h[n],M),n&&(u&&u.exports!==e&&u.exports!==h[n]?h[n]=u.exports:d===e&&T||(h[n]=d))}else n&&(h[n]=a)},requirejs=require=c=function(t,n,r,i,o){return"string"==typeof t?f[t]?f[t](n):s(p(t,n).f):(t.splice||(d=t,n.splice?(t=n,n=r,r=null):t=e),n=n||function(){},"function"==typeof r&&(r=i,i=o),i?u(e,t,n,r):setTimeout(function(){u(e,t,n,r)},4),c)},c.config=function(e){return d=e,d.deps&&c(d.deps,d.callback),c},define=function(e,n,r){n.splice||(r=n,n=[]),t(h,e)||t(m,e)||(m[e]=[e,n,r])},define.amd={jQuery:!0}})();
define("lib/almond", function(){});

(function(){define('boringjs/globals',[],function(){return{app:null,bindings:[],views:{},transitions:{intro:{},outro:{}},events:"blur focus focusin focusout load resize scroll unload click\ndblclick mousedown mouseup mousemove mouseover mouseout mouseenter\nmouseleave change select submit keydown keypress keyup error".split(/\s+/g),attributes:"class id src href style".split(/\s+/g)}})}).call(this);
(function(){define('boringjs/overrides',['require','./globals'],function(require){var e,n;return n=require("./globals"),e="undefined"!=typeof InstallTrigger?[HTMLAnchorElement,HTMLAppletElement,HTMLAreaElement,HTMLAudioElement,HTMLBaseElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDataListElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLLabelElement,HTMLLegendElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMediaElement,HTMLMenuElement,HTMLMetaElement,HTMLMeterElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLProgressElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTitleElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement]:[Element],function(){var t,r,l,a;for(l=0,a=e.length;a>l;l++){if(r=e[l],r.prototype.addEventListener){if(t=r.prototype.addEventListener,!t)return;r.prototype.addEventListener=function(e,r){var l;return l=Array.apply(null,arguments),l[1]=function(){var e;return r.apply(null,arguments),null!=(e=n.app)?e.checkForChanges():void 0},t.apply(this,l)}}if(r.prototype.attachEvent){if(t=r.prototype.attachEvent,!t)return;r.prototype.attachEvent=function(e,r){var l;return l=Array.apply(null,arguments),l[1]=function(){var e;return r.apply(null,arguments),null!=(e=n.app)?e.checkForChanges():void 0},t.apply(this,l)}}}}(),$(function(){return $(document).ajaxComplete(function(){var e;return null!=(e=n.app)?e.checkForChanges():void 0})})})}).call(this);
(function(){define('boringjs/bindings/base',['require','../globals'],function(require){var Base,globals;return globals=require("../globals"),Base=function(){function Base(t){this.$element=t,this.logic=this.$element.data("logic"),this.logic&&(this.insertPlaceholder(),this.unwrap()),this.update&&this.pushBinding()}return Base.prototype.pushBinding=function(){return globals.bindings.push(this)},Base.prototype.parseBinding=function(t){var e,n;return null==(n=this.cachedBindings)&&(this.cachedBindings={}),(e=this.cachedBindings[t])?e.call(this):(this.cachedBindings[t]=this.generateFunction(t),this.cachedBindings[t].call(this))},Base.prototype.parseString=function(t){var e,n;return null==(n=this.cachedStrings)&&(this.cachedStrings={}),(e=this.cachedStrings[t])?e.call(this):(t=t.replace(/\"/g,'\\"'),t='"'+t+'"',this.cachedStrings[t]=this.generateFunction(t),this.cachedStrings[t].call(this))},Base.prototype.generateFunction=function(str){var args,js,key,scopeArgs;js=CoffeeScript.compile("do -> "+str,{bare:!0}),args=[],scopeArgs=[];for(key in this.scope)isNaN(key)&&(args.push(key),scopeArgs.push("this.scope."+key));return args.push("$element, $root, $parent, $data, window, document, $"),scopeArgs.push("this.$element, this.root, this.parent, this.scope"),eval("( function () {\n  return ( function ( "+args.join(",")+" ) {\n    return "+js+"\n  } ).call( {}, "+scopeArgs.join(", ")+" )\n} )")},Base.prototype.updateBinding=function(t,e){var n,i,r;return null==e&&(e=this.binding),i=e.split("."),n=i.pop(),r=this.parseBinding(i.join("."))||this.scope,("function"==typeof r[n]?r[n](t):void 0)||(r[n]=t)},Base.prototype.insertPlaceholder=function(){var t,e;return e=function(){var e,n,i,r;for(i=this.$element.get(0).attributes,r=[],e=0,n=i.length;n>e;e++)t=i[e],r.push(""+t.nodeName+"='"+t.value+"'");return r}.call(this).join(" "),this.$placeholder=$("<!-- Start BoringJS Block: "+e+" -->").insertBefore(this.$element),$("<!-- End BoringJS Block: "+e+" -->").insertAfter(this.$element)},Base.prototype.wrap=function(){return this.unwrapped?(this.unwrapped=!1,this.$contents.eq(0).before(this.$element),this.$element.append(this.$contents)):void 0},Base.prototype.unwrap=function(){return this.unwrapped||(this.unwrapped=!0),this.$contents=this.$element.contents().insertAfter(this.$element),this.$element.detach()},Base}()})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/text-node',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i){this.$element=t,this.scope=e,this.parent=n,this.root=i,this.template=this.$element.text(),this.template.indexOf("{")+1&&(this.element=this.$element.get(0),this.updateValue(),this.pushBinding())}return e(n,t),n.prototype.updateValue=function(){var t;return t=this.parseString(this.template),this.value!==t?this.element.nodeValue=this.value=t:void 0},n.prototype.update=function(){return this.updateValue()},n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/text',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i){this.$element=t,this.scope=e,this.parent=n,this.root=i,this.binding=this.$element.data("text"),this.setValue(),this.pushBinding()}return e(n,t),n.prototype.setValue=function(){var t;return t=this.parseBinding(this.binding),this.value!==t?(this.value=t,this.$element.text(this.value)):void 0},n.prototype.update=function(){return this.setValue()},n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var i in n)t.call(n,i)&&(e[i]=n[i]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e};define('boringjs/bindings/attribute',['require','./base'],function(require){var t,n;return n=require("./base"),t=function(t){function n(t,e,n,r,i){this.attribute=t,this.$element=e,this.scope=n,this.parent=r,this.root=i,this.binding=this.$element.data(this.attribute),this.setValue(),this.pushBinding()}return e(n,t),n.prototype.setValue=function(){var t;return t=this.parseBinding(this.binding),this.value!==t?(this.value=t,this.$element.attr(this.attribute,this.value)):void 0},n.prototype.update=function(){return this.setValue()},n}(n)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/for',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,i,r,o){this.$element=t,this.scope=e,this.parent=i,this.root=r,this.childParser=o,this.binding=this.$element.data("for"),this.parts=this.binding.split("in"),this.itemName=$.trim(this.parts[0]),this.collectionName=$.trim(this.parts[1]),this.getTemplate(),this.parseItems(),n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.getTemplate=function(){return this.$template=this.$element.contents().remove()},n.prototype.getCollection=function(){var t;return t=this.parseBinding(this.collectionName),(("function"==typeof t?t():void 0)||t).slice(0)},n.prototype.parseItems=function(t){var e,n,i,r,o,s,a,u;for(this.collection=null!=t?t:this.getCollection(t),a=this.collection,u=[],n=o=0,s=a.length;s>o;n=++o)i=a[n],e=this.$template.clone().appendTo(this.$element),r=$.extend({},this.scope),"object"==typeof i?(r[this.itemName]=$.extend({},i),r[this.itemName].$index=n,r[this.itemName].$total=this.collection.length):r[this.itemName]=i,u.push(this.childParser(e,r,this.parent,this.root));return u},n.prototype.updateItems=function(){var t;return t=this.getCollection(),this.collection!==t&&JSON.stringify(this.collection)!==JSON.stringify(t)?(this.logic&&this.wrap(),this.$element.empty(),this.parseItems(t),this.logic?this.unwrap():void 0):void 0},n.prototype.update=function(){return this.updateItems()},n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/each',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,i,r,s){this.$element=t,this.scope=e,this.parent=i,this.root=r,this.childParser=s,this.binding=this.$element.data("each"),this.getTemplate(),this.parseItems(),n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.getTemplate=function(){return this.$template=this.$element.contents().remove()},n.prototype.getItems=function(){var t;return t=this.parseBinding(this.binding),(("function"==typeof t?t():void 0)||t).slice(0)},n.prototype.parseItems=function(t){var e,n,i,r,s,o,a,u;for(this.items=null!=t?t:this.getItems(),a=this.items,u=[],n=s=0,o=a.length;o>s;n=++s)i=a[n],e=this.$template.clone().appendTo(this.$element),r=$.extend({},this.scope),r.$index=n,r.$total=this.items.length,u.push(this.childParser(e,i,this.scope,this.root));return u},n.prototype.updateItems=function(){var t;return t=this.getItems(),this.items!==t&&JSON.stringify(this.items)!==JSON.stringify(t)?(this.logic&&this.wrap(),this.$element.empty(),this.parseItems(t),this.logic?this.unwrap():void 0):void 0},n.prototype.update=function(){return this.updateItems()},n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/update',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i){var r,s;this.$element=t,this.scope=e,this.parent=n,this.root=i,r=this.$element.data("update"),s="-> "+r,this.func=this.parseBinding(s),this.func(),this.pushBinding()}return e(n,t),n.prototype.update=function(){return this.func()},n}(t)})}).call(this);
(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define('boringjs/bindings/compose',['require','../globals','./base'],function(require){var e,i,r;return r=require("../globals"),e=require("./base"),i=function(e){function i(e,n,i,r,o){var s;this.$element=e,this.scope=n,this.parent=i,this.root=null!=r?r:this.scope,this.childParser=o,this.renderView=t(this.renderView,this),this.binding=this.$element.data("compose"),this.controller=this.parseBinding(this.binding),this.view=null!=(s=this.controller)?s.view:void 0,this.loadView(),this.pushBinding()}return n(i,e),i.prototype.loadView=function(){var t,e=this;return t="/views/"+this.view+".html",r.views[t]?this.renderView(r.views[t]):$.ajax({url:t,success:function(n){return n=r.views[t]=n.replace(/<\$/g,'<div data-logic="true"').replace(/<\/\$>/g,"</div>"),e.renderView(n)}})},i.prototype.renderView=function(t){var e,n,i;return null==t&&(t=this.html),this.html=t,this.$element.html(this.html),this.childParser(this.$element.children(),this.controller,this.scope,this.root),"function"==typeof(n=this.controller).afterRender&&n.afterRender({$dom:this.$element,scope:this.scope,parent:this.parent,root:this.root}),e=r.transitions.intro[this.view]||(null!=(i=this.controller)?i.intro:void 0)||null,"function"==typeof e?e(this.$element):void 0},i.prototype.update=function(){var t,e,n,i,o=this;return e=this.parseBinding(this.binding),this.controller!==e?(t=function(){return o.controller=e,o.view=o.controller.view,o.loadView()},n=r.transitions.outro[this.view]||(null!=(i=this.controller)?i.outro:void 0)||null,("function"==typeof n?n(this.$element,t):void 0)||t()):void 0},i}(e)})}).call(this);
(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define('boringjs/bindings/value',['require','./base'],function(require){var e,i;return e=require("./base"),i=function(e){function i(e,n,i,r){this.$element=e,this.scope=n,this.parent=i,this.root=r,this.updateHandler=t(this.updateHandler,this),this.binding=this.$element.data("value"),this.setValue(),this.bindEvents(),this.pushBinding(),this.$element.is("select")&&this.$element.trigger(this.getDefaultEvents())}return n(i,e),i.prototype.getValue=function(){var t;if("radio"!==this.$element.attr("type")||this.$element.is(":checked"))return t=this.parseBinding(this.binding),t=("function"==typeof t?t():void 0)||t},i.prototype.setValue=function(){var t;return t=this.getValue(),this.value===t||(this.value=t,this.$element.is("input:radio"))?void 0:this.$element.val(this.value)},i.prototype.getDefaultEvents=function(){switch(this.$element.get(0).nodeName.toLowerCase()){case"input":switch(this.$element.attr("type")){case"checkbox":case"radio":return"change";default:return"keydown"}break;case"select":return"change";default:return"blur"}},i.prototype.bindEvents=function(){var t;return t=this.$element.data("update-on")||this.getDefaultEvents(),this.$element.on(t,this.updateHandler)},i.prototype.updateHandler=function(){var t=this;return setTimeout(function(){var e;if(!t.$element.is(":radio")||t.$element.is(":checked"))return e=function(){switch(this.$element.attr("type")){case"checkbox":return this.$element.prop("checked");default:return this.$element.val()}}.call(t),t.updateBinding(e)})},i.prototype.update=function(){return this.$element.is(":focus")?void 0:this.setValue()},i}(e)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/if',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i,r){this.$element=t,this.scope=e,this.parent=n,this.root=i,this.callback=r,this.binding=this.$element.data("if"),this.insertPlaceholder(),this.setValue(),this.pushBinding()}return e(n,t),n.prototype.setValue=function(){var t;return t=this.parseBinding(this.binding),this.value!==t?(this.value=t,this.value?(this.$element.insertAfter(this.$placeholder),this.unwrap()):(this.wrap(),this.$element.detach())):void 0},n.prototype.update=function(){return this.setValue()},n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/unless',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i,r){this.$element=t,this.scope=e,this.parent=n,this.root=i,this.callback=r,this.binding=this.$element.data("if"),this.insertPlaceholder(),this.setValue(),this.pushBinding()}return e(n,t),n.prototype.setValue=function(){var t;return t=!this.parseBinding(this.binding),this.value!==t?(this.value=t,this.value?(this.$element.insertAfter(this.$placeholder),this.unwrap()):(this.wrap(),this.$element.detach())):void 0},n.prototype.update=function(){return this.setValue()},n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/event',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i,r){var o,s,a,u;this.$element=e,this.scope=n,this.parent=i,this.root=r,u=e.data(t),o="-> "+u,a=this.parseBinding(o),s=""+t+".boringjs",e.off(s).on(s,function(){return a()})}return e(n,t),n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/css',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i){this.$element=t,this.scope=e,this.parent=n,this.root=i,this.binding=this.$element.data("css"),this.css=this.parseBinding(this.binding),this.$element.css(this.css)}return e(n,t),n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define('boringjs/bindings/html',['require','./base'],function(require){var t,n;return t=require("./base"),n=function(t){function n(t,e,n,i){this.$element=t,this.scope=e,this.parent=n,this.root=i,this.binding=this.$element.data("html"),this.setValue(),this.pushBinding()}return e(n,t),n.prototype.setValue=function(){var t;return t=this.parseBinding(this.binding),this.value!==t?(this.value=t,this.$element.html(this.value)):void 0},n.prototype.update=function(){return this.setValue()},n}(t)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var i in n)t.call(n,i)&&(e[i]=n[i]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e};define('boringjs/bindings/attribute-text',['require','./base'],function(require){var t,n;return n=require("./base"),t=function(t){function n(t,e,n,r,i){this.attribute=t,this.$element=e,this.scope=n,this.parent=r,this.root=i,this.template=this.attribute.nodeValue,this.attribute.nodeName.match(/^data/)||this.template.match("{")&&(this.updateValue(),this.pushBinding())}return e(n,t),n.prototype.updateValue=function(){var t;return t=this.parseString(this.template),this.value!==t?(this.value=t,this.attribute.nodeValue=t):void 0},n.prototype.update=function(){return this.updateValue()},n}(n)})}).call(this);
(function(){define('boringjs/parser',['require','./globals','./bindings/text-node','./bindings/text','./bindings/attribute','./bindings/for','./bindings/each','./bindings/update','./bindings/compose','./bindings/value','./bindings/if','./bindings/unless','./bindings/event','./bindings/css','./bindings/html','./bindings/attribute-text'],function(require){var t,e,n,r,i,o,a,s,l,p,u,c,h,m,d,f;return f=require("./globals"),c=require("./bindings/text-node"),u=require("./bindings/text"),t=require("./bindings/attribute"),a=require("./bindings/for"),i=require("./bindings/each"),m=require("./bindings/update"),r=require("./bindings/compose"),d=require("./bindings/value"),l=require("./bindings/if"),h=require("./bindings/unless"),o=require("./bindings/event"),n=require("./bindings/css"),s=require("./bindings/html"),e=require("./bindings/attribute-text"),p=function(){function p(t,e,n,r){var i=this;this.scope=e,this.parent=n,this.root=r,t.each(function(t,e){var n;return n=$(e),i.parseNode(n)})}return p.prototype.parseNode=function(t){var e,o=this;return e=!0,this.attachEvents(t),this.parseAttributes(t),3===t.get(0).nodeType?(new c(t,this.scope,this.parent,this.root),void 0):(t.data("css")&&new n(t,this.scope,this.parent,this.root),null!=t.data("if")&&(e=!1,new l(t,this.scope,this.parent,this.root,function(t){return new p(t,o.scope,o.parent,o.root)})),null!=t.data("unless")&&(e=!1,new h(t,this.scope,this.parent,this.root,function(t){return new p(t,o.scope,o.parent,o.root)})),t.data("compose")&&(e=!1,new r(t,this.scope,this.parent,this.root,function(t,e,n,r){return new p(t,e,n,r)})),t.data("for")&&(e=!1,new a(t,this.scope,this.parent,this.root,function(t,e,n,r){return new p(t,e,n,r)})),t.data("each")&&(e=!1,new i(t,this.scope,this.parent,this.root,function(t,e,n,r){return new p(t,e,n,r)})),t.data("text")&&(e=!1,new u(t,this.scope,this.parent,this.root)),t.data("html")&&new s(t,this.scope,this.parent,this.root),t.data("value")&&(e=!1,new d(t,this.scope,this.parent,this.root)),t.data("update")&&new m(t,this.scope,this.parent,this.root),e?t.contents().each(function(e,n){return t=$(n),o.parseNode(t)}):void 0)},p.prototype.parseAttributes=function(n){var r,i,o,a,s,l,p,u,c;for(p=f.attributes,o=0,s=p.length;s>o;o++)r=p[o],i=n.data(r),i&&new t(r,n,this.scope,this.parent,this.root);for(u=n.get(0).attributes||[],c=[],a=0,l=u.length;l>a;a++)r=u[a],c.push(new e(r,n,this.scope,this.parent,this.root));return c},p.prototype.attachEvents=function(t){var e,n,r,i,a,s;for(a=f.events,s=[],r=0,i=a.length;i>r;r++)e=a[r],n=t.data(e),n&&s.push(new o(e,t,this.scope,this.parent,this.root));return s},p.prototype.parseString=function(t){var e,n,r,i,o,a;switch(n=t.split("."),n[0]){case"$root":r=this.root,n.shift();break;case"$parent":r=this.parent,n.shift();break;case"$data":r=this.scope,n.shift();break;default:r=this.scope}for(i=r,o=0,a=n.length;a>o;o++)e=n[o],i=i[e];return i},p}()})}).call(this);
(function(){define('boringjs/change-parser',['require','./globals','./parser'],function(require){var t,r,n;return n=require("./globals"),r=require("./parser"),t=function(){function t(t,r,n,i){var e=this;this.scope=r,this.parent=n,this.root=i,t.each(function(t,r){var n;return n=$(r),e.parseNode(n)})}return t.prototype.parseNode=function(t){var r;return r=!0,this.checkAttributes(t)},t}()})}).call(this);
(function(){var n=function(n,t){return function(){return n.apply(t,arguments)}};define('boringjs/core',['require','./overrides','./globals','./parser','./change-parser','./bindings/compose'],function(require){var t,e,r,i,o;return require("./overrides"),o=require("./globals"),i=require("./parser"),t=require("./change-parser"),e=require("./bindings/compose"),r=function(){function t(t,e){this.$element=t,this.controller=e,this.afterRender=n(this.afterRender,this),this.$element.data("compose","controller"),this.afterRender()}return t.prototype.afterRender=function(){return new i(this.$element,this,!1,this.controller)},t.prototype.checkForChanges=function(){var n=this;return setTimeout(function(){var t,e,r,i;for(i=o.bindings,e=0,r=i.length;r>e;e++)t=i[e],t.update();return n.cleanBindings()})},t.prototype.cleanBindings=function(){var n,t,e,r,i,s,c;for(t=o.bindings.length,c=[],r=i=s=t-1;0>=s?0>=i:i>=0;r=0>=s?++i:--i)n=o.bindings[r],e=n.element||n.$element.get(0),$.contains(document.body,e)?c.push(void 0):c.push(o.bindings.splice(r,1));return c},t}()})}).call(this);
(function(){define('boringjs/main',['require','./core','./globals'],function(require){var n,t,e;return t=require("./core"),e=require("./globals"),n=jQuery,n.fn.makeBoring=function(r){var i;if(e.app)throw"You may only have one app running at a time.";return i=n(this),e.app=new t(i,r)},n.makeBoring=function(t,r){if(e.app)throw"You may only have one app running at a time.";return n(function(){return n("[data-app='"+t+"']:first").makeBoring(r)})}})}).call(this);
(function(){requirejs(["boringjs/main"])}).call(this);
define("main", function(){});

require(["main"]);
    return require('main');
}));