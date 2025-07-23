// models/ThongBao.js (suy ra từ notificationController.js)
const mongoose = require('mongoose');

const ThongBaoSchema = new mongoose.Schema({
  nguoiNhan: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung', required: true },
  loai: { type: String, enum: ['room_update', 'new_message', 'call'], required: true },
  noiDung: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'PhongChat' },
  tinNhanId: { type: mongoose.Schema.Types.ObjectId, ref: 'TinNhan' },
  daDoc: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false,
});

ThongBaoSchema.index({ nguoiNhan: 1, createdAt: -1 });

module.exports = mongoose.model('ThongBao', ThongBaoSchema);