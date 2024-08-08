export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  console.log("Generated Token:", token);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure:true,
    sameSite:"None",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

export default sendToken;
