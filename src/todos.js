const { parseISO, compareAsc } = require("date-fns");

export class todoItems {
  constructor(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
  markAsComplete() {
    this.completed = true;
  }
  markAsIncomplete() {
    this.completed = false;
  }
}

let todosArray = [];
function createTodos() {
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {
    let descriptionId = document.getElementById("description");
    let dueDateId = document.getElementById("dueDate");
    let priorityId = document.getElementById("priority");

    let newTodo = new todoItems(
      descriptionId.value,
      dueDateId.value,
      priorityId.value
    );

    let todoItemsContainer = document.getElementById("todoItemsContainer");

    let div = document.createElement("div");

    div.className = "todoItem";
    div.innerHTML = `<p><strong>Description:</strong> ${newTodo.description}</p>
    <p><strong>Due Date:</strong> ${newTodo.dueDate}</p>
    <p><strong>Priority:</strong> ${newTodo.priority}</p>
    
    
  `;

    todoItemsContainer.appendChild(div);
    todosArray.push(newTodo);
    sortTodos();
    sortedDisplay();
    descriptionId.value = "";
    dueDateId.value = "";
    priorityId.value = "";

    saveTodos();
  });

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todosArray));
  };
  

  document.addEventListener("DOMContentLoaded", print());

   function print() {
    let storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      storedTodos.forEach((todo) => {
        let deleteButton = document.createElement("button");
      deleteButton.className='deleteButton';

      deleteButton.innerText = "DELETE";
        let todoItemsContainer = document.getElementById("todoItemsContainer");
        let div = document.createElement("div");

        div.className = "todoItem";
        div.innerHTML = `<p><strong>Description:</strong> ${todo.description}</p>
              <p><strong>Due Date:</strong> ${todo.dueDate}</p>
              <p><strong>Priority:</strong> ${todo.priority}</p>
            `;
        todosArray.push(todo);
        todoItemsContainer.appendChild(div);
        div.appendChild(deleteButton)
      });
    }
  }
  function sortTodos() {
    todosArray.sort((a, b) => {
      const dateA = parseISO(a.dueDate);
      const dateB = parseISO(b.dueDate);
      return compareAsc(dateA, dateB);
    });
  }
  function sortedDisplay() {
    const todoItemsContainer = document.getElementById("todoItemsContainer");
    while (todoItemsContainer.firstChild) {
      todoItemsContainer.removeChild(todoItemsContainer.firstChild);
    }

    todosArray.forEach((todo) => {
      let deleteButton = document.createElement("button");
      deleteButton.className='deleteButton';

      deleteButton.innerText = "DELETE";
      let div = document.createElement("div");
      div.className = "todoItem";
      div.innerHTML = `<p><strong>Description:</strong> ${todo.description}</p>
            <p><strong>Due Date:</strong> ${todo.dueDate}</p>
            <p><strong>Priority:</strong> ${todo.priority}</p>
          `;
      todoItemsContainer.appendChild(div);
      div.appendChild(deleteButton);
    });
  }
}

createTodos();
