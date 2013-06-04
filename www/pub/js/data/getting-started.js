(function() {
  define(function() {
    return [
      {
        title: 'Dependencies',
        content: [
          "There is only one hard dependency for Recoil:", {
            type: 'definitions',
            items: [
              {
                term: 'jQuery',
                definition: "<a href=\"http://code.jquery.com/jquery-1.9.1.min.js\">http://code.jquery.com/jquery-1.9.1.min.js</a>"
              }
            ]
          }, "If you happen to be using CoffeeScript in your project, and would like to use CoffeeScript in your bindings as well, you can include the following file:", {
            type: 'definitions',
            items: [
              {
                term: 'CoffeeScript',
                definition: "<a href=\"https://github.com/jashkenas/coffee-script/blob/master/extras/coffee-script.js\">https://github.com/jashkenas/coffee-script/blob/master/extras/coffee-script.js</a>"
              }
            ]
          }
        ]
      }, {
        title: 'Including Recoil',
        content: [
          "First, you're going to want to download a copy of Recoil from the Download page.  You can include it in your page one of two ways:", {
            type: 'numbered-list',
            items: [
              [
                "Include the file with the standard script tag:", {
                  type: 'code',
                  lang: 'html',
                  code: "<script src=\"recoil.js\"></script>"
                }
              ], [
                "Include it via AMD with RequireJS:", {
                  type: 'code',
                  lang: 'javascript',
                  code: "require( [ \"recoil\" ], function () { ... } )"
                }
              ]
            ]
          }, "In order to keep things simple, I'm going to assume the first method."
        ]
      }, {
        title: 'HTML Setup',
        content: [
          "Technically, there isn't anything required in the HTML other than including Recoil; however, you can optionally set the DOM element where your application starts using the <code>data-app</code> attribute.", {
            type: 'code',
            code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <title>RecoilJS Sample</title>\n  <script src=\"jquery.js\"><script>\n  <script src=\"coffee-script.js\"><script> <!-- optional -->\n  <script src=\"recoil.js\"><script>\n  <script src=\"app.js\"><script> <!-- your application -->\n</head>\n<body>\n  <div data-app>\n    ...\n  </div>\n</body>\n</html>"
          }, "In this example, the <code>div</code> tag represents the scope of your application, and all parsing will start here.  This tag can contain HTML, or it can be empty and have the content loaded through an external view."
        ]
      }, {
        title: 'Adding a Controller',
        content: [
          "The next thing your app is going to need is a controller.  This can be any JavaScript object.  The following code demonstrates how to bind a controller.", {
            type: 'code',
            code: "var controller = {\n  title: \"Hello, World!\"\n};\nRecoil.init( controller );"
          }, "As you can see, our controller can be incredibly simple - in this case, consisting of only one <code>title</code> property.  Let's add some HTML!", {
            type: 'code',
            code: "<div data-app>\n  #\\{ title }\n</div>"
          }, "The title has now been rendered into the HTML through the use of String Interpolation."
        ]
      }, {
        title: "That's it!",
        content: [
          "Now that you're up and running with a basic Hello World application, why not try something more advanced?", {
            type: 'definitions',
            title: 'Other Tutorials',
            items: [
              {
                term: 'Todo App',
                definition: '<a href="#tutorials/todo-app">#tutorials/todo-app</a>'
              }, {
                term: 'Phonebook',
                definition: '<a href="#tutorials/phonebook">#tutorials/phonebook</a>'
              }
            ]
          }
        ]
      }
    ];
  });

}).call(this);
