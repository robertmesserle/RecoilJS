define ->

  class SectionController

    intro: ( $dom ) ->
      $articles = $dom.find( 'article' )
      return unless $articles.length
      $articles.each ( index, element ) ->
        $( element )
          .css( opacity: 0, left: -20, position: 'relative' )
          .transit( opacity: 1, left: 0, delay: index * 75, duration: 450 )

    outro: ( $dom, callback ) ->
      $dom.children().transit opacity: 0, duration: 250, complete: ->
        callback()