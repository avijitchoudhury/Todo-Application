let todoList = {
  todos: [],
  addTodos: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodos: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    let todo = this.todos[position]; //to grab a specific todo
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    // Get number of completed todos
    this.todos.forEach(function(todo) {
      if(todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      //If everything's true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
      // if everything is false, make everything true
        todo.completed = true;
      }
    })
  }
}



let handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    views.displayTodos();
  },
  addTodos: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = '';
    views.displayTodos();
  },
  changeTodo: function() {
    let changeToDoPositionInput = document.getElementById('changeToDoPositionInput');
    let changeToDoTextInput = document.getElementById('changeToDoTextInput');
    todoList.changeTodo(changeToDoPosition.valueAsNumber, changeToDoText.value);
    changeToDoPositionInput.valueAsNumber = '';
    changeToDoTextInput.value = '';
    views.displayTodos();
  },
  deleteTodos: function(position) {
    todoList.deleteTodos(position);
    views.displayTodos();
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.valueAsNumber = '';
    views.displayTodos();
  }
}

//Appending the todolist in the DOM
let views = {
  displayTodos: function () {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position) {
      let todosLi = document.createElement('li');
      let todoTextWithCompletion = '';

      if(todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todosLi.id = position;
      todosLi.textContent = todoTextWithCompletion;
      todosLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todosLi);
    }, this) //adding 'this' will allow access to this.createDeleteButton 
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton
  },
  setUpEventsListeners: function() {
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function (events) {
      let elementClicked = events.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};


