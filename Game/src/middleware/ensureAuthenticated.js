module.exports = function ensureAuthenticated(req, res, next) {
    if (req.session.uid) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
  