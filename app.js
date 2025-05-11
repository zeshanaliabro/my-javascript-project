document.getElementById("feedBack").addEventListener("submit", function (e) {
  e.preventDefault();

  let input = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  const todo = {
    title: input,
    description: description,
    date: new Date().toISOString()
  };

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodo(todo);
  document.getElementById("feedBack").reset();
});

function renderTodo(todo) {
  const result = document.getElementById("result");
  result.style.display = "flex";
  // result.style.overflow = "hidden"

  const todoBox = document.createElement("div");
  todoBox.className = "todo-box";
  todoBox.style.margin = "10px";

  const titleElem = document.createElement("h4");
  titleElem.textContent = todo.title;

  const descElem = document.createElement("p");
  descElem.textContent = todo.description;
  descElem.style.maxHeight = "50px";
  descElem.style.overflow = "hidden";

  const dateN = document.createElement("small");
  const now = new Date(todo.date);
  dateN.innerHTML = `Created ${now.toLocaleDateString()} <br/> ${now.toLocaleTimeString()}`;
  dateN.style.display = "block";
  dateN.style.marginTop = "8px";
  dateN.style.color = "#ccc";

  // ❌ DELETE BUTTON
  const deleteBtn = document.createElement("button") ;
  deleteBtn.textContent = "❌";

  deleteBtn.style.minWidth =  "50px";
  deleteBtn.style.marginRight = "10px";
  deleteBtn.style.cursor = "pointer";
  
  deleteBtn.addEventListener("click", function () {
    todoBox.remove();

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(t => !(t.title === todo.title && t.description === todo.description && t.date === todo.date));
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  // ✏️ EDIT BUTTON
  const editBtn = document.createElement("button");
  // editBtn.style.display = "flex"
  editBtn.textContent = "✏️";
  editBtn.style.cursor = "pointer";
  editBtn.addEventListener("click", function () {
    const newTitle = prompt("Edit Title:", todo.title);
    const newDesc = prompt("Edit Description:", todo.description);

    if (newTitle && newDesc) {
      // Update UI
      titleElem.textContent = newTitle;
      descElem.textContent = newDesc;

      // Update localStorage
      let todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos = todos.map(t => {
        if (t.title === todo.title && t.description === todo.description && t.date === todo.date) {
          return {
            ...t,
            title: newTitle,
            description: newDesc
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  // 👁️ TOGGLE BUTTON
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "See More..";
  toggleBtn.className = "toggle-btn";

  if (todo.description.length <= 100) {
    toggleBtn.style.display = "none";
  }

  toggleBtn.addEventListener("click", function () {
    const expanded = todoBox.classList.toggle("expanded");
    if (expanded) {
      descElem.style.maxHeight = "1000px";
      toggleBtn.textContent = "See Less..";
    } else {
      descElem.style.maxHeight = "50px";
      toggleBtn.textContent = "See More..";
    }
  });

  // 📦 Add all elements
  todoBox.appendChild(deleteBtn);
  todoBox.appendChild(editBtn);
  todoBox.appendChild(titleElem);
  todoBox.appendChild(descElem);
  todoBox.appendChild(dateN);
  todoBox.appendChild(toggleBtn);
  result.appendChild(todoBox);
}

// 🌀 Load on refresh
window.addEventListener("load", function () {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  storedTodos.forEach(todo => renderTodo(todo));
});
