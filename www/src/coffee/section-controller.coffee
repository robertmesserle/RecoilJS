define ->

  class SectionController

    intro: ( $dom ) ->
      $articles = $dom.find( 'article' )
      return unless $articles.length
      $articles.each ( index, element ) ->
        $( element )
          .css( opacity: 0 )
          .transit( opacity: 1, delay: index * 50, duration: 350 )

    outro: ( $dom, callback ) ->
      $dom.children().transit opacity: 0, duration: 350, complete: ->
        callback()