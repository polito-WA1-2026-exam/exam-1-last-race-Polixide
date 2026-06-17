
import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserDao from '../dao/dao_users.js';

const userDao = new UserDao();


passport.use(new LocalStrategy(async function verify(username, password, callback) {
  try {
    const user = await userDao.getUserByCredentials(username, password);
    if (!user)
      return callback(null, false, 'Incorrect username or password');
    return callback(null, user); // id + username go into the session
  } catch (err) {
    return callback(err);
  }
}));

// Serialize the whole user object into the session (id + username).
passport.serializeUser(function (user, callback) {
  callback(null, user);
});

// Rebuild the current user from the session, double-checking it still exists in the DB 
passport.deserializeUser(function (user, callback) {
  userDao.getUserById(user.id)
    .then((u) => {
      if (u.error) return callback(null, false);
      return callback(null, u); // available as req.user
    })
    .catch((err) => callback(err));
});

export default passport;