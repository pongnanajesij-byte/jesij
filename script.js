const apiUrl = "http://localhost:8080/api/todos";

function loadTodos() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("todoList");
            list.innerHTML = "";
            data.forEach(todo => {
                list.innerHTML += `
                  <li>
                    ${todo.title}
                    <button onclick="deleteTodo(${todo.id})">X</button>
                  </li>`;
            });
        });
}

function addTodo() {
    const title = document.getElementById("todoInput").value;

    fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, completed:false})
    }).then(() => {
        document.getElementById("todoInput").value = "";
        loadTodos();
    });
}

function deleteTodo(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(loadTodos);
}

loadTodos();
