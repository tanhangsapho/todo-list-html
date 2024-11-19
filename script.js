let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    input.value = "";
  }
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function filterTodos(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase() === filter) {
      btn.classList.add("active");
    }
  });
  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  let filteredTodos = todos;
  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<div class="empty-state">No tasks to show</div>';
    return;
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.innerHTML = `
                    <div class="checkbox-wrapper">
                        <input type="checkbox" class="todo-checkbox" 
                            ${todo.completed ? "checked" : ""}>
                        <span class="todo-text">${todo.text}</span>
                    </div>
                    <button class="delete-btn">Delete</button>
                `;

    // Add event listeners
    const checkbox = li.querySelector(".todo-checkbox");
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    todoList.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.getElementById("todoInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

renderTodos();
