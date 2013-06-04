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
            opacity: 0,
            left: -20,
            position: 'relative'
          }).transit({
            opacity: 1,
            left: 0,
            delay: index * 75,
            duration: 450
          });
        });
      };

      SectionController.prototype.outro = function($dom, callback) {
        return $dom.children().transit({
          opacity: 0,
          duration: 250,
          complete: function() {
            return callback();
          }
        });
      };

      return SectionController;

    })();
  });

}).call(this);
