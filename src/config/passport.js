const passport = require('passport');
require('./strategy/local.strategy')();

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = passportConfig;
