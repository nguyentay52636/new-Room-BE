// models/ThongBao.js
const mongoose = require('mongoose');

const ThongBaoSchema = new mongoose.Schema({
  nguoiNhan: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung', required: true },
  loai: { type: String, enum: ['new_message', 'room_update', 'call'], required: true },
  noiDung: { type: String, required: true },
  daDoc: { type: Boolean, default: false },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'PhongChat' },
  tinNhanId: { type: mongoose.Schema.Types.ObjectId, ref: 'TinNhan' },
}, {
  timestamps: true,
  versionKey: false,
});

ThongBaoSchema.index({ nguoiNhan: 1, createdAt: -1 });

module.exports = mongoose.model('ThongBaoChat', ThongBaoSchema);