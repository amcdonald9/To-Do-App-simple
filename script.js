const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Load stored todos
todos.forEach(todo => addTodo(todo));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (task !== "") {
    addTodo({ text: task, done: false });
    input.value = "";
  }
});

function addTodo(todo) {
  const li = document.createElement("li");
  li.textContent = todo.text;
  if (todo.done) li.classList.add("done");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTodos();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
  saveTodos();
}

function saveTodos() {
  const newTodos = [];
  list.querySelectorAll("li").forEach(li => {
    newTodos.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

clearBtn.addEventListener("click", () => {
  list.innerHTML = "";
  localStorage.removeItem("todos");
});
