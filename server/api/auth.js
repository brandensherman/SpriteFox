const router = require('express').Router();
const { User } = require('../db');
const sendToken = require('../middleware/sendToken');
const protect = require('../middleware/protect');

router.get('/me', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/logout', protect, async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
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

    // Create token
    const token = user.getSignedToken();

    sendToken(user, 200, res);
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

    // Create token
    const token = user.getSignedToken();

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
