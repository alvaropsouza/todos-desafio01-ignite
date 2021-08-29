const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// Middleware
function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(400).json({ error: "Cannot find user!" });
  }

  request.user = user;

  return next();
}

// Criar usuário
app.post("/users", (request, response) => {
  const { username, name } = request.body;
 
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    return response.status(400).json({ error: "User already exists!" });
  }

  users.push({
    username,
    name,
    id: uuidv4(),
    todos: [],
  });

  return response.status(201).send();
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request; 

  return response.json(user.todos)
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline,
    created_at: new Date()
  };

  user.todos.push(newTodo);

  return response.status(201).send();
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
