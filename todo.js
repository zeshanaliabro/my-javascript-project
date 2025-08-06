let current = JSON.parse(localStorage.getItem("currentuser"));

document.getElementById("feedBack").addEventListener("submit", function (e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  const todo = {
    title: title,
    description: description,
    date: new Date().toISOString(),
    email: current.email ?? "",
  };

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  // console.log(todos);

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  document.getElementById("feedBack").reset();
  resulttodo(todo);
});
function resulttodo(todo) {
  console.log("todo", todo);
  const result = document.getElementById("result");
  result.style.display = "flex";
  result.style.overflow = "hidden";

  const box = document.createElement("div");

  // box.className = "todo-box "
  box.style.position = "relative";
  box.style.padding = "25px";
  box.style.margin = "10px";
  box.style.borderRadius = "8px";
  box.style.backgroundColor = "#f9f9f9";
  box.style.margin = "10px";

  // console.log(box);
  box.innerHTML = `<h3>${todo.title}</ h3> <p> ${
    todo.description
  }</p> <small>${new Date(todo.date).toLocaleDateString()} </ small> `;

  const button = document.createElement("buttons");
  button.textContent = "❌";
  button.style.position = "absolute";
  button.style.top = "5px";
  button.style.right = "5px";
  button.style.cursor = "pointer";
  button.style.fontSize = "16px";
  // button.style.margin = "10px"

  console.log(button);
  button.addEventListener("click", function () {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter((item) => {
      return !(
        item.title === todo.title &&
        item.description === todo.description &&
        item.date === todo.date &&
        item.email === todo.email
      );
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    button.remove();
    box.remove();
  });

  const editBtn = document.createElement("buttons");
  // editBtn.style.display = "flex"
  editBtn.textContent = "➕";
  editBtn.style.cursor = "pointer";
  editBtn.style.position = "absolute";
  editBtn.style.top = "5px";
  editBtn.style.right = "35px";
  console.log(editBtn);

  editBtn.addEventListener("click", function () {
    const newTitle = prompt("Edit title", todo.title);
    const newDesc = prompt("Edit description", todo.description);
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (newTitle && newDesc) {
      // Find and update the todo in the array
      const index = todos.findIndex(
        (item) =>
          item.title === todo.title &&
          item.description === todo.description &&
          item.date === todo.date &&
          item.email === todo.email
      );
      if (index !== -1) {
        todos[index].title = newTitle;
        todos[index].description = newDesc;
        // Update the UI
        box.innerHTML = `<h3>${newTitle}</h3> <p>${newDesc}</p> <small>${new Date(todo.date).toLocaleDateString()} </small> `;
        box.appendChild(button);
        box.appendChild(editBtn);
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  box.appendChild(button);
  box.appendChild(editBtn);
  result.appendChild(box);
}
window.addEventListener("load", function () {
  const storage = JSON.parse(localStorage.getItem("todos")) || [];
  const filter = storage.filter((todo) => todo.email === current.email);

  filter.forEach((todo) => resulttodo(todo));
});
