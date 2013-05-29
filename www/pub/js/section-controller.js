(function() {
  define(function() {
    var SectionController;

    return SectionController = (function() {
      function SectionController() {}

      SectionController.prototype.intro = function($dom) {
        var $articles;

        $articles = $dom.find('article');
        if (!$articles.length) {
          return;
        }
        return $articles.each(function(index, element) {
          return $(element).css({
            opacity: 0
          }).transit({
            opacity: 1,
            delay: index * 50,
            duration: 350
          });
        });
      };

      SectionController.prototype.outro = function($dom, callback) {
        return $dom.children().transit({
          opacity: 0,
          duration: 350,
          complete: function() {
            return callback();
          }
        });
      };

      return SectionController;

    })();
  });

}).call(this);
