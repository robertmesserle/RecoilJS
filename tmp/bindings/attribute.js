var AttributeBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AttributeBinding = (function(_super) {
  __extends(AttributeBinding, _super);

  function AttributeBinding(attribute, $element, scope, parent, root, extras) {
    this.attribute = attribute;
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.extras = extras;
    this.binding = this.$element.data(this.attribute);
    this.setValue();
    this.pushBinding();
  }

  AttributeBinding.prototype.setValue = function() {
    var value;

    value = this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      return this.$element.attr(this.attribute, this.value);
    }
  };

  AttributeBinding.prototype.update = function() {
    return this.setValue();
  };

  return AttributeBinding;

})(Base);
