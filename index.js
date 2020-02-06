let todoList = {
  todos: [],
  displayTodos: function () {
    if (this.todos.length === 0) {
      console.log('Your todo list is empty!')
    } else {
      console.log('My Todos:');
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === true) {
          console.log('(x)', this.todos[i].todoText);
        } else {
          console.log('()', this.todos[i].todoText);
        }
      }
    }
  },
  addTodos: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodos: function (position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function (position) {
    let todo = this.todos[position]; //to grab a specific todo
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function () {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    // Get number of completed todos
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    //If everything is true, make everything false
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    //Otherwise, make everything true
    } else {
      for(let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
    this.displayTodos();
  }
}


//getting access to display todos and toggling full todo list
let handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
  },
  addTodos: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  changeTodo: function() {
    let changeToDoPositionInput = document.getElementById('changeToDoPositionInput');
    let changeToDoTextInput = document.getElementById('changeToDoTextInput');
    todoList.changeTodo(changeToDoPosition.valueAsNumber, changeToDoText.value);
    changeToDoPositionInput.valueAsNumber = '';
    changeToDoTextInput.value = '';
  },
  deleteTodos: function() {
    let deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodos(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.valueAsNumber = '';
  }
}