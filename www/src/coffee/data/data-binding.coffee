define ( require ) -> [
  {
    title: 'String Interpolation'
    syntax: '#{ :string }'
    args: [
      name: ':string'
      html: 'An expression that will be evaluted and inserted as text.'
    ]
  }
  {
    title: 'Compose Binding'
    syntax: 'data-compose=":scope" data-view=":view"'
    args: [
      { name: ':scope', html: 'An object that will act as the default scope for all contained elements.' }
      { name: ':view',  html: 'A string containing a valid view name or HTML filename.' }
    ]
  }
  {
    title: 'CSS Binding'
    syntax: 'data-css=":css"'
    args: [
      name: ':css', html: 'An object that will be passed into <a href="http://api.jquery.com/css/">jQuery.fn.css()</a>.'
    ]
  }
  {
    title: 'Event Binding'
    syntax: 'data-[:eventType]=":expression"'
    args: [
      { name: ':eventType', html: 'A string representing a valid JavaScript event type (ie. click).' }
      { name: ':expression', html: 'An expression that will be evaluated when the defined event occurs.' }
    ]
  }
  {
    title: 'Iteration'
    syntax: 'data-for=":identifier in :set when :condition"'
    args: [
      { name: ':identifier', html: 'An identifier that will be used to reference the current item.' }
      { name: ':set', html: 'An array of items that will be iterated over.' }
      { name: ':condition', html: 'An expression that will be run against each item, determining whether or not the item should be included.' }
    ]
  }
  {
    title: 'HTML Binding'
    syntax: 'data-html=":html"'
    args: [
      { name: ':html', html: 'A string of HTML that will be inserted into the element.' }
    ]
  }
  {
    title: 'If Binding'
    syntax: 'data-if=":condition"'
    args: [
      { name: ':condition', 'An expression that will be run to determine whether or not to render the element.' }
    ]
  }
  {
    title: 'Static Binding'
    syntax: 'data-static'
  }
  {
    title: 'Update Binding'
    syntax: 'data-update=":updateExpression"'
    args: [
      { name: ':updateExpression', html: 'An expression that will run each time the element is updated.'}
    ]
  }
  {
    title: 'Value Binding'
    syntax: 'data-value=":value"'
    args: [
      { name: ':value', html: 'A variable or function that will be bound to the element through two-way data-binding.' }
    ]
  }
  {
    title: 'Visible Binding'
    syntax: 'data-visible=":condition"'
    args: [
      { name: ':condition', html: 'An expression that will be evaluated to determine whether or not the element will be visible.' }
    ]
  }
]