const express = require('express');
const config = require('config');
const helmet = require('helmet');
const Pool = require('pg').Pool;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
let proxy = require('express-http-proxy');

const authRoute = require('./routes/auth');

const app = express();

const PORT = config.get('server.port') || 3001;
const HOST = config.get('server.host') || 'localhost'

const pool = new Pool(config.get('database.auth'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());

app.use('/auth', authRoute);

app.get('/logout', (req, res) => {

});

app.get('/login/discord', (req, res, next) => {
  res.status(200).send(config.get('discord.loginUrl'));
});

app.get('/users/@get', (req, res) => {
  const token = JSON.parse(req.headers.authorization);

  if (token.token_type === 'Bearer') {
    jwt.verify(token.access_token,
      config.get('token.secret'),
      (err, user) => {
        if (err)
          res.send(401);
        else
          res.send(user);
      });
  } else {
    res.send(403);
  }
});

app.listen(PORT, () => {
  console.log(`Server start on ${HOST}:${PORT}`);
});