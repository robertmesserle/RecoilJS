
function Todo () {
  this.title = 'Todo App'

  this.handler = function () {
    console.log( 'click', event )
  };
}

$.makeBoring( 'todo', new Todo )