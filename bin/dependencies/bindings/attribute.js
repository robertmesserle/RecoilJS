(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define(function(require){var t,n;return n=require("./base"),t=function(t){function n(t,e,n,i,r){this.attribute=t,this.$element=e,this.scope=n,this.parent=i,this.root=r,this.binding=this.$element.data(this.attribute),this.setValue(),this.pushBinding()}return e(n,t),n.prototype.setValue=function(){var t;return t=this.parseBinding(this.binding),this.value!==t?(this.value=t,this.$element.attr(this.attribute,this.value)):void 0},n.prototype.update=function(){return this.setValue()},n}(n)})}).call(this);