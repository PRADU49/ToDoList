const taskInput = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todo-list");
const rset = document.getElementById("rset");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos
function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <label style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </label>
            <button>Delete</button>
        `;

        // Toggle completed
        li.querySelector("input").addEventListener("change", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        // Delete todo
        li.querySelector("button").addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        list.appendChild(li);
    });
}

// Add todo
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    todos.push({
        text: taskText,
        completed: false
    });

    saveTodos();
    renderTodos();
    taskInput.value = "";
});

rset.addEventListener("click", () => {
    todos.length = 0;

    saveTodos();
    renderTodos();
    taskInput.value = "";
});

// Initial render on page load
renderTodos(); 