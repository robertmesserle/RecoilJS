var Parser;

Parser = (function() {
  function Parser($dom, scope, parent, root, extras) {
    var _this = this;

    this.scope = scope != null ? scope : {};
    this.parent = parent != null ? parent : {};
    this.root = root != null ? root : {};
    this.extras = extras != null ? extras : {};
    $dom.each(function(index, element) {
      var $element;

      $element = $(element);
      return _this.parseNode($element);
    });
  }

  Parser.prototype.parseNode = function($element) {
    var parseChildren,
      _this = this;

    parseChildren = true;
    this.attachEvents($element);
    this.parseAttributes($element);
    if ($element.get(0).nodeType === 3) {
      new TextNode($element, this.scope, this.parent, this.root, this.extras);
      return;
    }
    if ($element.data('css')) {
      new CSSBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('visible') != null) {
      new VisibleBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('if') != null) {
      parseChildren = false;
      new IfBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('compose')) {
      parseChildren = false;
      new ComposeBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('for')) {
      parseChildren = false;
      new ForBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('text')) {
      parseChildren = false;
      new TextBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('html')) {
      new HTMLBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('value')) {
      parseChildren = false;
      new ValueBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if ($element.data('update')) {
      new UpdateBinding($element, this.scope, this.parent, this.root, this.extras);
    }
    if (!parseChildren) {
      return;
    }
    return $element.contents().each(function(index, element) {
      $element = $(element);
      return _this.parseNode($element);
    });
  };

  Parser.prototype.parseAttributes = function($element) {
    var attribute, str, _i, _j, _len, _len1, _ref, _ref1, _results;

    _ref = Recoil.attributes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attribute = _ref[_i];
      str = $element.data(attribute);
      if (!str) {
        continue;
      }
      new AttributeBinding(attribute, $element, this.scope, this.parent, this.root, this.extras);
    }
    _ref1 = $element.get(0).attributes || [];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      attribute = _ref1[_j];
      _results.push(new AttributeText(attribute, $element, this.scope, this.parent, this.root, this.extras));
    }
    return _results;
  };

  Parser.prototype.attachEvents = function($element) {
    var event, str, _i, _len, _ref, _results;

    _ref = Recoil.events;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      str = $element.data(event);
      if (!str) {
        continue;
      }
      _results.push(new EventBinding(event, $element, this.scope, this.parent, this.root, this.extras));
    }
    return _results;
  };

  Parser.prototype.parseString = function(str) {
    var part, parts, scope, value, _i, _len;

    parts = str.split('.');
    switch (parts[0]) {
      case '$root':
        scope = this.root;
        parts.shift();
        break;
      case '$parent':
        scope = this.parent;
        parts.shift();
        break;
      case '$data':
        scope = this.scope;
        parts.shift();
        break;
      default:
        scope = this.scope;
    }
    value = scope;
    for (_i = 0, _len = parts.length; _i < _len; _i++) {
      part = parts[_i];
      value = value[part];
    }
    return value;
  };

  return Parser;

})();
