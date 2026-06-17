/* Users APIs */
import express from 'express';
import passport from '../auth/passport_handler.js';

const router = express.Router();

// POST /api/sessions  -- login
router.post('/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // wrong login message
      return res.status(401).json({ error: info });
    }
    // success: establish a login session
    req.login(user, (err) => {
      if (err)
        return next(err);
      // req.user comes from getUserByCredentials() via the strategy verify
      return res.json(req.user);
    });
  })(req, res, next);
});

// GET /api/sessions/current  -- is the user logged in?
router.get('/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// DELETE /api/sessions/current  -- logout
router.delete('/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

export default router;