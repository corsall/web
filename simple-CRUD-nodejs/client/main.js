//get all users

async function getUsers() {
    const response = await fetch('/api/users', {
        method: "GET",
        headers: {"Accept": "application/json"}
    });

    if(response.ok === true){
        const users = await response.json();
        let rows = document.querySelector('tbody');
        rows.innerHTML = '';
        //drawing table with users
        users.forEach(user => {
            rows.innerHTML += row(user);
        });
    }
}

function row(user){
    const linksTd = document.createElement('td');

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user.id);
    editLink.append("Change");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        GetUser(user.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user.id);
    removeLink.append("Delete");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        DeleteUser(user.id);
    });
    linksTd.append(removeLink);

    const rowHtmlElement = `<tr data-rowid="${user.id}"><td>${user.id}</td><td>${user.name}</td><td>${user.age}</td><td>${linksTd.innerHTML}</td></tr>`// ${linksTd}
    return rowHtmlElement;
}

getUsers();



