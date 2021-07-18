const debug = require('debug')('app:bookController');
const chalk = require('chalk');
const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'LibraryAPP';

function bookController(bookServices, nav) {
  function getIndex(req, res) {
    (async function read() {
      let client;
      try {
        client = await MongoClient.connect(URL);
        debug(`${chalk.green('Connected to the server successfully')}`);

        const db = client.db(DB_NAME);

        const col = await db.collection('books');
        const books = await col.find().toArray();

        res.render('bookListView', {
          nav,
          title: 'Just Books',
          books,
        });
      } catch (err) {
        debug(`${chalk.red(err.stack)}`);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    (async function read() {
      let client;
      try {
        client = await MongoClient.connect(URL);
        debug(`${chalk.green('Connected to the server successfully')}`);
        const db = client.db(DB_NAME);
        const col = await db.collection('books');
        const book = await col.findOne({ id });
        if (book) {
          book.details = await bookServices.getBookById(id);
        }
        res.render('bookView', {
          nav: [{ link: '/books', title: 'Back' }],
          title: 'Just a book',
          book,
        });
      } catch (err) {
        debug(`${chalk.red(err.stack)}`);
      }
      client.close();
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleware,
  };
}

module.exports = bookController;
