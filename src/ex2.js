// Rota de usuários
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