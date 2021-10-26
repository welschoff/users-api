import express from 'express';

const app = express();
const port = 3000;

const users = ['Marko', 'Manuel', 'Hendrik'];

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
