
// Lets the request through only if the user is authenticated, otherwise 401.
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
};

export { isLoggedIn };