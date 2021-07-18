const express = require('express'); // For handling request/ response
const bookController = require('../controllers/bookController');
const bookServices = require('../services/bookServices');

// To maintain a set of routes
const bookRouter = express.Router();

const router = (nav) => {
  const { getIndex, getById, middleware } = bookController(bookServices, nav);
  bookRouter.use(middleware);
  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getById);

  return bookRouter;
};

module.exports = router;
