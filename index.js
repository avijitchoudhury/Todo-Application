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
    for(let i = 0; i < todoList.todos.length; i++) {
      let todosLi = document.createElement('li');
      let todo = todoList.todos[i];
      let todoTextWithCompletion = '';
      if(todo.completed === true) {
        todoTextWithCompletion = '(x)' + todo.todoText;
      } else {
        todoTextWithCompletion = '( )' + todo.todoText;
      }

      todosLi.id = i;
      todosLi.textContent = todoList.todos[i].todoText
      todosLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todosLi);
    }
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


