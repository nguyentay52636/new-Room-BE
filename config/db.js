const mongoose = require('mongoose');
require('dotenv').config(); // nếu dùng biến môi trường ở đây

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Đã kết nối MongoDB');
  } catch (err) {
    console.error('Kết nối MongoDB thất bại:', err.message);
    process.exit(1); // Dừng server nếu lỗi DB
  }
};

module.exports = connectDB;
