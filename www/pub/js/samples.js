(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Recoil, SampleController, SectionController;

    SectionController = require('./section');
    Recoil = require('./recoil');
    return SampleController = (function(_super) {
      __extends(SampleController, _super);

      SampleController.prototype.view = 'samples';

      SampleController.prototype.category = 'About';

      SampleController.prototype.title = 'Samples';

      function SampleController() {
        this.getHighlightedTerm = __bind(this.getHighlightedTerm, this);
        var _this = this;

        this.phoneNumber = '1231231231';
        this.formattedPhoneNumber = function() {
          var areaCode, introBlock, lastBlock, strippedPhoneNumber;

          strippedPhoneNumber = _this.phoneNumber.replace(/[^\d]/g, '').substring(0, 10);
          strippedPhoneNumber += Array(11 - strippedPhoneNumber.length).join('_');
          areaCode = strippedPhoneNumber.substring(0, 3);
          introBlock = strippedPhoneNumber.substring(3, 6);
          lastBlock = strippedPhoneNumber.substring(6, 10);
          return "(" + areaCode + ") " + introBlock + "-" + lastBlock;
        };
        this.searchTerm = '';
        this.selectValue = '';
        this.selectOptions = Recoil.events;
        this.checkboxValue = '';
        this.radioOption = '';
      }

      SampleController.prototype.getHighlightedTerm = function(text) {
        if (!this.searchTerm) {
          return text;
        }
        return text.split(this.searchTerm).join("<span class='highlight'>" + this.searchTerm + "</span>");
      };

      return SampleController;

    })(SectionController);
  });

}).call(this);
