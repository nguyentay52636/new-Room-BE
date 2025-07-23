const User = require("../models/nguoidung");
const bcrypt = require("bcrypt");
const { registerValidation } = require("../middleware/authValidation");
const Customer = require("../models/KhachHang");
const VaiTro = require("../models/vaiTro");
const ChuTNha = require("../models/chuNha");
const NhanVien = require("../models/NhanVien");
const userController = {
  getAllUser: async (req, res) => {
    try {
      const usersList = await User.find().populate('vaiTro');
      return res
        .status(200)
        .json({ message: "get all users success", users: usersList });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUserData = await User.findByIdAndDelete(id);
      if (!deletedUserData)
        return res.status(404).json({ message: "User not found" });
      return res
        .status(200)
        .json({
          message: "Delete user successfully",
          deletedUser: deletedUserData,
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('vaiTro');
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);  
    } catch (error) { 
      return res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { ten, email, tenDangNhap ,matKhau, soDienThoai, vaiTro, anhDaiDien,trangThai } = req.body;
      
      const userUpdate = { 
        ten,
        email,
        tenDangNhap,
        matKhau,
        soDienThoai,
        vaiTro,
        anhDaiDien,
        trangThai,
      };
      if (matKhau) {
        const hashedPassword = await bcrypt.hash(matKhau, 10);
        userUpdate.matKhau = hashedPassword;
      }


      if (vaiTro) {
        let vaiTroDoc = await VaiTro.findOne({ ten: vaiTro });
        if (!vaiTroDoc) {
          vaiTroDoc = await VaiTro.create({ 
            ten: vaiTro,
            moTa: `Vai trò ${vaiTro}`
          });
        }
        userUpdate.vaiTro = vaiTroDoc._id;
      }

      const updatedUserData = await User.findByIdAndUpdate(id, userUpdate, {
        new: true,
      });   
      if (!updatedUserData)
        return res.status(404).json({ message: "User not found" });
      return res
        .status(200)
        .json({ message: "Update user successfully", updatedUser: updatedUserData });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  createUser: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (req.body.matKhau !== req.body.xacNhanMatKhau)
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });

    try {
      const [emailExists, usernameExists] = await Promise.all([
        User.findOne({ email: req.body.email }),
        User.findOne({ tenDangNhap: req.body.tenDangNhap }),
      ]);
      if (emailExists)
        return res.status(400).json({ message: "Email already exists" });
      if (usernameExists)
        return res.status(400).json({ message: "Username already exists" });

      const hashedPassword = await bcrypt.hash(req.body.matKhau, 10);

      let vaiTro = await VaiTro.findOne({ ten: req.body.vaiTro });
      if (!vaiTro) {
        vaiTro = await VaiTro.create({ 
          ten: req.body.vaiTro,
          moTa: `Vai trò ${req.body.vaiTro}`
        });
      }
      
      const newUser = await User.create({
        ten: req.body.ten,
        email: req.body.email,
        tenDangNhap: req.body.tenDangNhap,
        matKhau: hashedPassword,
        soDienThoai: req.body.soDienThoai,
        vaiTro: vaiTro._id,
        anhDaiDien: req.body.anhDaiDien,
        trangThai: req.body.trangThai || "hoat_dong",
      });
      var khachHang = null;
      var chuTro = null;
      var nhanVien = null;
      var phanLoai = null ; 
      if(req.body.vaiTro === "admin"){
        phanLoai = "admin" ; 
        vaiTro = "admin" ; 
      }else if(req.body.vaiTro === "nhan_vien"){
        phanLoai = "nhan_vien" ; 
        vaiTro = "nhan_vien" ; 
        nhanVien = await NhanVien.create({
          nguoiDungId: newUser._id,
        });
      }else if(req.body.vaiTro === "nguoi_thue"){
        phanLoai = "nguoi_thue" ; 
        vaiTro = "nguoi_thue" ; 
        khachHang = await Customer.create({
          nguoiDungId: newUser._id,
        });
      }else if(req.body.vaiTro === "chu_tro"){
        phanLoai = "chu_tro" ; 
        vaiTro = "chu_tro" ; 
        chuTro = await ChuTNha.create({
          nguoiDungId: newUser._id,
        });
      }

      return res.status(201).json({
        message: "Register successfully",
        user: newUser,
        customer: khachHang,
        chuTro: chuTro,
        nhanVien: nhanVien,
      });
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err });
    }
  },
};

module.exports = userController;
