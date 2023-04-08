//get all users

async function getUsers() {
    const response = await fetch('/api/users', {
        method: "GET",
        headers: {"Accept": "application/json"}
    });

    if(response.ok === true){
        const users = await response.json();
        let rows = document.querySelector('tbody');
        //drawing table with users
        users.forEach(user => {
            rows.append(row(user));
        });
    }
}

async function getUser(id) {
    const response = await fetch("/api/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        const form = document.forms["userForm"];
        form.elements["id"].value = user._id;
        form.elements["name"].value = user.name;
        form.elements["age"].value = user.age;
    }
}

async function createUser(userName, userAge) {
    const response = await fetch('/api/users', {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({name: userName, age: parseInt(userAge)})
    });
    if(response.ok === true){
        const user = await response.json();
        reset();
        document.querySelector('tbody').append(row(user));
    }
}

async function editUser(userId, userName, userAge) {
    const response = await fetch("api/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: userId,
            name: userName,
            age: parseInt(userAge, 10)
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        reset();
        document.querySelector(`tr[data-rowid='${user._id}']`).replaceWith(row(user));
    }
}

async function deleteUser(id) {
    const response = await fetch("/api/users/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector(`tr[data-rowid='${user._id}']`).remove();
    }
}


function row(user){

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user._id);

    const idTd = document.createElement("td");
    idTd.append(user._id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);

    const linksTd = document.createElement('td');

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user._id);
    editLink.append("Change");
    editLink.addEventListener("click", e => {
        console.log('btn: change clicked');
        e.preventDefault();
        getUser(user._id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user._id);
    removeLink.append("Delete");
    removeLink.addEventListener("click", e => {
        console.log('btn: delete clicked');
        e.preventDefault();
        deleteUser(user._id);
    });
    linksTd.append(removeLink);

    tr.appendChild(linksTd);
  
    return tr;
}

function reset() {
    const form = document.forms["userForm"];
    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = "";
    });
}

document.getElementById("reset").addEventListener( 'click', e => {
  
    e.preventDefault();
    reset();
});

document.forms["userForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    if (id == 0)
        createUser(name, age);
    else
        editUser(id, name, age);
});

getUsers();



