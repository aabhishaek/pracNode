const express = require('express'); // For handling request/ response
const chalk = require('chalk'); // For colorising the logging messages
const debug = require('debug')('app'); // For debugging logs
const morgan = require('morgan'); // For logging request details
const passport = require('passport');

/*
    For getting fully qualified path name.
    Each platform has a different path separator, using path instead
    of manually appending path separator , allows applications to
    get proper path names in any platform
*/
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nav = [
  { link: '/books', title: 'Booksesh' },
  { link: '/auth/signout', title: 'logout' },
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')(nav);

const app = express();

// morgan('combined') logs detailed information about each request
// morgan('tiny') logs a concise version of the request
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'killbill' }));

require('./src/config/passport.js')(app);

// express.static sets up the static directory and
// looks up the directory or filename specified in the
// path to load the static content. The static content folder structure
// can be viewed by the public
app.use(express.static(path.join(__dirname, 'public')));

/*
    If the static files are not available in the above mentioned
    public directory, The below lines look for static files in the
    directory specified in secondary param and place it in the
    directory specified in the first param. The directory mentioned
    in the first param can be viewed by the public.
*/
app.use(
  '/styles',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
  )
);
app.use(
  '/scripts',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')
  )
);
app.use(
  '/scripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

// All the files to be displayed will be looked into this folder
app.set('views', path.join(__dirname, 'src', 'views'));

// View engine sets the template engine that is being used, So that express can identify
// files belonging to template in views folder.
app.set('view engine', 'ejs');

// app.get for GET calls, sends html back
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Test Express with ejs',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
