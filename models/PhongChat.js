// models/PhongChat.js
const mongoose = require('mongoose');

const PhongChatSchema = new mongoose.Schema({
  tenPhong: { type: String, required: function () { return this.loaiPhong === 'group'; } },
  loaiPhong: { type: String, enum: ['private', 'group'], required: true },
  thanhVien: [{
    nguoiDung: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung', required: true },
    vaiTro: { type: String, enum: ['admin', 'member'], default: 'member' },
    trangThai: { type: String, enum: ['active', 'left'], default: 'active' },
    thoiGianThamGia: { type: Date, default: Date.now },
    bietDanh: { type: String },
  }],
  nguoiTao: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung', required: true },
  anhDaiDien: { type: String },
  tinNhan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TinNhan' }],
  tinNhanCuoi: { type: mongoose.Schema.Types.ObjectId, ref: 'TinNhan', default: null },
  tinNhanGhim: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TinNhan' }],
}, {
  timestamps: true,
  versionKey: false,
});

PhongChatSchema.index({ thanhVien: 1 });
PhongChatSchema.index({ createdAt: -1 });

PhongChatSchema.pre('validate', function (next) {
  if (this.loaiPhong === 'private' && this.thanhVien.length !== 2) {
    return next(new Error('Phòng chat riêng phải có đúng 2 thành viên'));
  }
  if (this.nguoiTao && !this.thanhVien.some(m => m.nguoiDung.toString() === this.nguoiTao.toString())) {
    return next(new Error('Người tạo phải là một thành viên của phòng chat'));
  }
  next();
});

module.exports = mongoose.model('PhongChat', PhongChatSchema);