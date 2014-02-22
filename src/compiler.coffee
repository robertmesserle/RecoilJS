class Compiler

  @compile: ( str ) ->
    if CoffeeScript?.compile then CoffeeScript.compile "do -> #{ str }", bare: true
    else
      exp = /.#\{([^\}]*[^\\])\}/g
      str = str.replace /\n/g, '\\n'
      str = str.replace exp, ( match, expression ) ->
        firstChar = match.charAt 0
        if firstChar is '\\' then match
        else "#{ firstChar }\" + ( #{ expression } ) + \""
      "( function () { return #{ str }; } )()"

module.exports = Compiler
