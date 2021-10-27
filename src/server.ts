import express from 'express';

const app = express();
const port = 3000;

app.use((request, _response, next) => {
  console.log('Request received', request.url);
  next();
});

app.use(express.json());

let users = [
  {
    name: 'Manuel',
    username: 'manuel123',
    password: '123abc',
  },
  {
    name: 'Leon',
    username: 'lmachens',
    password: 'asdc',
  },
  {
    name: 'Anke',
    username: 'anke9000',
    password: 'ab',
  },
  {
    name: 'Philipp',
    username: 'phgrtz',
    password: 'pw123!',
  },
];

app.get('/api/users/', (_request, response) => {
  response.send(users);
});

app.post('/api/users', (request, response) => {
  const newUser = request.body;

  if (users.some((user) => user.username === newUser.username)) {
    response.status(409).send('User already exists');
  } else users.push(newUser);
  response.send(`${newUser.name} added`);
});

app.delete('/api/users/:username', (request, response) => {
  const user = users.some((user) => user.username === request.params.username);
  if (user) {
    const newUsers = users.filter(
      (user) => user.username !== request.params.username
    );
    users = newUsers;
    response.send(users);
  } else {
    response.send('User is not found');
  }
});

// app.get('/api/users/:name', (request, response) => {
//   const isNameKnown = users.includes(request.params.name);

//   if (isNameKnown) {
//     response.send(request.params.name);
//   } else {
//     response.status(404).send('Name is Unknown');
//   }
// });

app.get('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    response.send(user);
  } else {
    response.status(404).send('This page is not here. Check another Castle 🏰');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/api/login', (request, response) => {
  const userLogin = request.body;
  if (
    users.find(
      (user) =>
        user.username === userLogin.username &&
        user.password === userLogin.password
    )
  ) {
    response.send('Welcome!');
  } else {
    response
      .status(401)
      .send('Login failed. Check if username and password is correct');
  }
});
