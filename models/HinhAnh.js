const mongoose = require('mongoose');

const HinhAnhSchema = new mongoose.Schema({
  batDongSanId: { type: mongoose.Schema.Types.ObjectId, ref: 'BatDongSan' },
  duongDan: { type: String, required: true },
  laAnhChinh: { type: Boolean, default: false }
});

module.exports = mongoose.model('HinhAnh', HinhAnhSchema);
