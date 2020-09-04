const config = require('config');
const router = require('express').Router();
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const {Pool} = require('pg');

/*
 * Constants definition
 */

const options = {
  discordLoginUrl: config.get('discord.loginUrl')
}

/*
 * Postgres pool definition
 */

const pool = new Pool(config.get('database.auth'));

pool.on('error', (err, client) => {
  console.error('Error on idle client', err);
  client.release();
});

/*
 * Routes definition
 */

router.get('/', (req, res, next) => {
  res.render('auth', options);
});

router.post('/discord', (req, res, next) => {
  let data = {
    client_id: config.get('discord.clientID'),
    client_secret: config.get('discord.clientSecret'),
    grant_type: 'authorization_code',
    redirect_uri: `${config.get('server.host')}:${config.get('server.port')}/` + config.get('discord.callbackURL'),
    code: req.query.code,
    scope: config.get('discord.scopes'),
  };

  fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    }
  }).then(result => result.json())
    .then(info => fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${info.token_type} ${info.access_token}`,
      },
    })
      .then(result => result.json()))
    .then(json => {
      if(json.id) {
        pool
          .connect()
          .then(client => {
            const selectQuery = `SELECT * FROM Users WHERE discord_id=${json.id};`;

            // Get User

            client
              .query(selectQuery)
              .then(result => {

                // Adding new user

                if (!result.rowCount) {

                  // Create Discord user

                  const insertDiscordUserQuery = `INSERT INTO 
                  DiscordUsers 
                  VALUES(
                    ${json.id},
                    \'${json.username}\',
                    \'${json.avatar}\',
                    ${json.discriminator}
                    );`;

                  client
                    .query(insertDiscordUserQuery)
                    .then(result => {

                    })
                    .catch(next);

                  // Create Quasar user

                  const insertQuasarUserQuery = `INSERT INTO 
                  Users (
                    name,
                    avatar,
                    user_group,
                    locale,
                    discord_id
                    ) 
                  VALUES(
                    '${json.username}',
                    '${json.avatar}',
                    'user',
                    'en',
                    ${json.id});`;

                  client
                    .query(insertQuasarUserQuery)
                    .then(result => {

                      // Redirect new user
                      let user = {
                        name: json.username,
                        avatar: json.avatar,
                        user_group: 'user',
                        locale: 'en'
                      }
                      let token = jwt.sign(user, config.get('token.secret'));
                      let data = {
                        token: token,
                        user: user
                      }
                      res.send(data);
                    })
                    .catch(next);
                  return client;
                }
                else{

                  // Redirect authorizated user
                  let record = result.rows[0];
                  let user = {
                    name: record.name,
                    avatar: record.avatar,
                    user_group: record.user_group,
                    locale: record.locale
                  }

                  let token = jwt.sign(user, config.get('token.secret'));
                  let data = {
                    token: token,
                    user: user
                  }
                  res.send(data);
                }
              });
            client.release();
          })
      }
    });
});

module.exports = router;