const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");

const app = express();

const jsonParser = express.json();


app.use(express.static(__dirname + '/public'));

const filepath = 'users.json';
app.get('/api/users', function(req, res){
    const content = fs.readFileSync(filepath, 'utf8');
    const users = JSON.parse(content);
    res.send(users);
});

app.get('/api/users/:id', function(req, res){
    console.log('test');
    const id = req.params.id;

    const content = fs.readFileSync(filepath, 'utf8');
    const users = JSON.parse(content);
    const user = users.find(user => user.id == id);

    if(user) res.send(user);
    else res.status(404).send();
});

app.post('/api/users', jsonParser, function(req, res){
    console.log('test');
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;

    const content = fs.readFileSync(filepath, 'utf8');
    const users = JSON.parse(content);

    const userId = users.reduce((maxIdUser, user) => (user.id > maxIdUser.id) ? user : maxIdUser).id + 1;

    let user = {id: userId, name: userName, age: userAge};

    users.push(user);

    data = JSON.stringify(users);

    fs.writeFileSync("users.json", data);
    res.send(user);
});

app.delete('/api/users/:id', function(req, res){

    const id = req.params.id;


    let data = fs.readFileSync(filepath, 'utf8');
    let users = JSON.parse(data);

    const user = users.find(user => user.id == id);
    if(user === undefined) return res.sendStatus(404);

    users = users.filter(user => user.id != id);

    data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);

    res.send(user);
})

app.put("/api/users", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);


    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    let data = fs.readFileSync(filepath, 'utf8');
    let users = JSON.parse(data);
    

    let replaceObj = users.findIndex(user => user.id == userId);

    if(replaceObj === undefined) return res.sendStatus(404);

    users[replaceObj] = {id: userId, name: userName, age: userAge};

    data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(users[replaceObj]);
});


app.listen(3000, function(){
    console.log("Server is listening...");
});