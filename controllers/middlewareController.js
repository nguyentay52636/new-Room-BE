const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    // Hỗ trợ cả header 'token' và 'authorization'
    let token = req.headers.token || req.headers.authorization;
    
    if (token) {
      // Nếu token có prefix "Bearer ", bỏ prefix đi
      if (token.startsWith('Bearer ')) {
        token = token.slice(7);
      } else if (token.includes(' ')) {
        // Nếu token có format "Bearer <token>" từ header 'token'
        token = token.split(" ")[1];
      }
      
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, userData) => {
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
