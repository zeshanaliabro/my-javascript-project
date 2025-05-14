let current = JSON.parse(localStorage.getItem("currentuser"));

document.getElementById("feedBack").addEventListener("submit", function (e) {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    const todo = {
        title: title,
        description: description,
        date: new Date().toISOString(),
        email: current.email ?? ""
    }

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    // console.log(todos);

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));

    document.getElementById("feedBack").reset();
    resulttodo(todo);
});



function resulttodo(todo) {
    console.log("todo", todo)
    const result = document.getElementById("result");
    result.style.display = "flex"
    result.style.overflow = "heddin"
    // console.log(result);


    const box = document.createElement("div")
    // box.textContent = todo.Title;
    box.className = "todo-box ";
    box.style.display = "flex";
    box.style.margin = "10px";
    // console.log(box);


    box.innerHTML = `<h3>${todo.title}</ h3> <p> ${todo.description}</p> <small>${new Date(todo.date).toLocaleDateString()} </ small> `

    result.appendChild(box);
}


window.addEventListener("load", function () {
    const storage = JSON.parse(localStorage.getItem("todos")) || [];
    const filter = storage.filter((todo) => todo.email === current.email);

    filter.forEach(todo => resulttodo(todo));

})




