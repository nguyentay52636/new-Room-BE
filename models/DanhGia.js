const mongoose = require('mongoose');

const DanhGiaSchema = new mongoose.Schema({
  nguoiDungId: { type: mongoose.Schema.Types.ObjectId, ref: 'nguoiDung' },
  batDongSanId: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' },
  soSao: { type: Number, min: 1, max: 5 , required: true },
  binhLuan: String
}, { timestamps: true });

module.exports = mongoose.model('DanhGia', DanhGiaSchema);
