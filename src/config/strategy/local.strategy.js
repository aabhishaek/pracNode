const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');
const chalk = require('chalk');

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'LibraryAPP';

const localStrategy = () => {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      (async function authUser() {
        let client;
        try {
          client = await MongoClient.connect(URL);
          debug(`${chalk.green('Connected to the server successfully')}`);

          const db = client.db(DB_NAME);
          const col = await db.collection('users');

          const user = await col.findOne({ username });
          if (user && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(`${chalk.red(err.stack)}`);
        }
        client.close();
      }());
    }
  ));
};

module.exports = localStrategy;
