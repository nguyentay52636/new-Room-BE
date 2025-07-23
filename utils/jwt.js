const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, vaiTro: user.vaiTro },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "15m" }
  );
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, vaiTro: user.vaiTro },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "365d" }
  );
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
