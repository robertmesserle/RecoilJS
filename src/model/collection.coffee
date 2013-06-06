
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
    console.log 'saving'
    return unless @validate()
    console.log 'validated'
    console.log @savedValue, @value
    @savedValue.splice( 0, @savedValue.length, @value... )
    console.log @savedValue

  revert: ->
    @value.splice( 0, @value.length, @savedValue.slice()... )