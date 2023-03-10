const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-cfgfrf9gp3jjsecugei0-a.frankfurt-postgres.render.com',
    user: 'smart_brain_db_b2us_user',
    database: 'smart_brain_db_b2us',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true,
  },
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('It is working!');
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
