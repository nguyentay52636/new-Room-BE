const mongoose = require("mongoose");

const BDSchema = new mongoose.Schema(
  {
    tieuDe: { type: String, required: true }, // Tiêu đề
    moTa: { type: String, required: true }, // Mô tả chi tiết
    loaiBds: {
      type: String,
      enum: ["can_ho", "nha_nguyen_can", "studio", "penthouse"],
      required: true,
    },
    gia: { type: Number, required: true }, // Giá
    dienTich: { type: Number, required: true }, // Diện tích (m2)
    diaChi: { type: String, required: true }, // Địa chỉ cụ thể
    tinhThanh: { type: String, required: true }, // Tỉnh/Thành phố
    quanHuyen: { type: String, required: true }, // Quận/Huyện

    anhDaiDien: { type: String, required: true }, // Ảnh đại diện (thumbnail)
    gallery: [String], // Mảng link ảnh gallery

    phongNgu: { type: Number, required: true }, // Số phòng ngủ
    phongTam: { type: Number, required: true }, // Số phòng tắm
    choDauXe: { type: Number, required: true }, // Số chỗ đậu xe

    trangThai: {
      type: String,
      enum: ["dang_hoat_dong", "da_cho_thue"],
      default: "dang_hoat_dong",
    },

    nguoiDungId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: true,
    },

    badge: String, // Nhãn nổi bật
    subtitle: String, // Phụ đề

    features: [
      {
        icon: String,
        text: String,
        color: String,
      },
    ], // Các điểm nổi bật

    overlay: {
      category: String,
      location: String,
      priceDisplay: String,
      rating: Number, // Điểm đánh giá trung bình (nếu tính toán động thì không cần lưu ở đây)
      reviews: Number, // Số lượng đánh giá (nếu tính toán động thì không cần lưu ở đây)
      amenities: [String], // Các tiện ích
    },

    colorGradient: String, // Gradient màu cho card (nếu cần)

    // Thông tin bổ sung cho tab "Thông tin chi tiết"
    thongTinChiTiet: {
      tang: String,
      huong: String,
      banCong: String,
      noiThat: String,
      // ...bổ sung thêm nếu UI có
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BatDongSan", BDSchema);
