// Get token from model, create cookie and send response
const sendToken = (user, statusCode, res) => {
  // Create Token - method is called on the selected user
  const token = user.getSignedToken();

  const options = {
    expires: new Date(
      // 30 days from now
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // Access only through client-side
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  const { name, email, _id } = user;

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    name,
    email,
    _id,
    token,
  });
};

module.exports = sendToken;
