const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const chalk = require('chalk');
const passport = require('passport');

const authRouter = express.Router();

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'LibraryAPP';

function router(nav) {
  authRouter.route('/signup').post((req, res) => {
    const { username, password } = req.body;
    (async function createUser() {
      let client;
      try {
        client = await MongoClient.connect(URL);
        debug(`${chalk.green('Connected to the server successfully')}`);

        const db = client.db(DB_NAME);

        const col = await db.collection('users');
        const user = { username, password };
        const results = await col.insertOne(user);
        debug(req.body);
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(`${chalk.red(err.stack)}`);
      }
      client.close();
    }());
  });

  authRouter
    .route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In',
      });
    })
    .post(
      passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
      })
    );

    authRouter.route('/signout').get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  authRouter
    .route('/profile')
    .all((req, res, next) => {
      debug(`${chalk.redBright(req)}`);
      if (req.user) {
        next();
      } else {
        debug(`${chalk.red(req.user)}`);
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
