//?Selectors
const todoInput = document.querySelector(".todo-input"),
  todoButton = document.querySelector(".todo-button"),
  todoList = document.querySelector(".todo-list"),
  filterOption = document.querySelector(".filter-todo");

//?Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//?Functions
function addTodo(e) {
  e.preventDefault();
  if (todoInput.value != "") {
    //?Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //?Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add todo to Local Storage
    saveLocalTodos(todoInput.value);
    //!Clear TODO value
    todoInput.value = "";

    //?Checked button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add("checked-btn");
    todoDiv.appendChild(checkedButton);

    //?Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //?Append to our to todo list
    todoList.appendChild(todoDiv);
  }
}

function deleteCheck(e) {
  const item = e.target;

  //? Delete Todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //?Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", (e) => {
      //! Delete item after animation
      todo.remove();
    });
  }

  //?Check mark--
  if (item.classList[0] === "checked-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  //?Filter
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //?Check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //?
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //?Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //?Checked button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add("checked-btn");
    todoDiv.appendChild(checkedButton);

    //?Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //?Append to our to todo list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
