DataType = require( './data-type.coffee' )

class Collection extends DataType

  constructor: ->
    super
    @value = []
    @savedValue = []
    @addArrayMethods()

  addArrayMethods: ->
    for method in 'push pop unshift shift indexOf slice splice'.split /\s/
      do ( method ) =>
        @[ method ] = =>
          @value[ method ] arguments...

  save: ->
    return unless @validate()
    @savedValue.splice( 0, @savedValue.length, @value... )

  revert: ->
    @value.splice( 0, @value.length, @savedValue.slice()... )

  find: ( criteria ) ->
    # Search for a direct match first, even if the criteria is a function
    index = @value.indexOf criteria
    return @value[ index ] unless index < 0
    # If no direct matches were found, check if criteria is a function
    return unless typeof criteria is 'function'
    # if criteria is a function, try using it to parse each value for matches
    for item in @value when criteria( item )
      return item

module.exports = Collection
