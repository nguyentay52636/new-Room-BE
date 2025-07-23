const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, userData) => {
        if (error) {
          return res.status(403).json("Token không hợp lệ");
        }
        req.user = userData;
        next();
      });
    } else {
      res.status(401).json("Bạn chưa đăng nhập");
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.vaiTro === "admin" || req.user.id === req.params.id) {
        next();
      } else {
        res.status(403).json("You are not allowed to delete other!");
      }
    });
  },
};
module.exports = middlewareController;
