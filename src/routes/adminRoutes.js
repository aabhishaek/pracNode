const express = require('express');
const debug = require('debug')('app:adminRoutes');
const chalk = require('chalk');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'LibraryAPP';

const books = [];

function router() {
  adminRouter.route('/').get((req, res) => {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(URL);
        debug(`${chalk.green('Connected to the server successfully')}`);

        const db = client.db(DB_NAME);

        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (err) {
        debug(`${chalk.red(err.stack)}`);
      }

      client.close();
    }());
  });
  return adminRouter;
}

module.exports = router;
