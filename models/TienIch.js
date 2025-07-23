const mongoose = require("mongoose");

const TienIchSchema = new mongoose.Schema(
  {
    ten: { type: String, required: true, unique: true },
    moTa: { type: String, maxlength: 300 },
    icon: { type: String }, // Icon cho tiện ích
    trangThai: {
      type: String,
      enum: ["hoat_dong", "khoa"],
      default: "hoat_dong",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("TienIch", TienIchSchema);
