const router = require('express').Router();
const { User } = require('../db');

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.user) {
      const error = new Error('Not found');
      error.status = 404;
      next(error);
    } else {
      const user = await User.findById(req.session.user);
      if (user) {
        res.json(user);
      } else {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/logout', async (req, res, next) => {
  try {
    req.session.destroy();

    console.log('reqsession -----', req.session);
    req.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    req.session.user = user.id;
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      next(error);
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      next(error);
    }

    req.session.user = user.id;
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
