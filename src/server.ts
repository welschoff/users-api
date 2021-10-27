import express from 'express';

const app = express();
const port = 3000;

app.use((request, _response, next) => {
  console.log('Request received', request.url);
  next();
});

app.use(express.json());

const users = ['Marko', 'Manuel', 'Hendrik'];

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  if (users.includes(newUser.name)) {
    response.status(409).send('User already exists');
  } else users.push(newUser.name);
  response.send(`${newUser.name} added`);
});

app.delete('/api/users/:name', (request, response) => {
  const index = users.indexOf(request.params.name);
  if (index > -1) {
    users.splice(index, 1);
    response.send(users);
  } else {
    response.send('User is not found');
  }
});

app.get('/api/users/:name', (request, response) => {
  const isNameKnown = users.includes(request.params.name);

  if (isNameKnown) {
    response.send(request.params.name);
  } else {
    response.status(404).send('Name is Unknown');
  }
});

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
