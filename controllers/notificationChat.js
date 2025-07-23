// controllers/notificationController.js
const ThongBao = require('../models/ThongBao');
const PhongChat = require('../models/PhongChat');
const TinNhan = require('../models/TinNhan');

// Kiểm tra quyền truy cập phòng chat
const checkRoomAccess = async (roomId, userId) => {
  const room = await PhongChat.findById(roomId);
  if (!room) {
    throw new Error('Không tìm thấy phòng chat');
  }
  const member = room.thanhVien.find(m => m.nguoiDung.toString() === userId.toString());
  if (!member || member.trangThai !== 'active') {
    throw new Error('Người dùng không thuộc phòng chat');
  }
  return member;
};

// Lấy danh sách thông báo của người dùng
const getNotifications = async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 20, type } = req.query;

  try {
    const query = { nguoiNhan: userId };
    if (type) {
      query.loai = type; // Lọc theo loại thông báo (new_message, room_update, call)
    }

    const notifications = await ThongBao.find(query)
      .populate('nguoiNhan', 'hoTen avatar')
      .populate('roomId', 'tenPhong loaiPhong')
      .populate('tinNhanId', 'noiDung loaiTinNhan nguoiGuiId')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await ThongBao.countDocuments(query);

    res.status(200).json({
      notifications,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách thông báo', error: error.message });
  }
};

// Lấy thông báo chưa đọc
const getUnreadNotifications = async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 20 } = req.query;

  try {
    const notifications = await ThongBao.find({ nguoiNhan: userId, daDoc: false })
      .populate('nguoiNhan', 'hoTen avatar')
      .populate('roomId', 'tenPhong loaiPhong')
      .populate('tinNhanId', 'noiDung loaiTinNhan nguoiGuiId')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await ThongBao.countDocuments({ nguoiNhan: userId, daDoc: false });

    res.status(200).json({
      notifications,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách thông báo chưa đọc', error: error.message });
  }
};

// Đánh dấu thông báo đã đọc
const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const notification = await ThongBao.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }

    if (notification.nguoiNhan.toString() !== userId) {
      return res.status(403).json({ message: 'Không có quyền đánh dấu thông báo này' });
    }

    notification.daDoc = true;
    await notification.save();

    const updatedNotification = await ThongBao.findById(id)
      .populate('nguoiNhan', 'hoTen avatar')
      .populate('roomId', 'tenPhong loaiPhong')
      .populate('tinNhanId', 'noiDung loaiTinNhan nguoiGuiId');

    res.status(200).json(updatedNotification);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID thông báo không hợp lệ' });
    }
    res.status(500).json({ message: 'Lỗi đánh dấu thông báo đã đọc', error: error.message });
  }
};

// Đánh dấu tất cả thông báo đã đọc
const markAllNotificationsAsRead = async (req, res) => {
  const userId = req.user.id;

  try {
    await ThongBao.updateMany(
      { nguoiNhan: userId, daDoc: false },
      { daDoc: true }
    );

    res.status(200).json({ message: 'Đã đánh dấu tất cả thông báo là đã đọc' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi đánh dấu tất cả thông báo', error: error.message });
  }
};

// Xóa thông báo
const deleteNotification = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const notification = await ThongBao.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }

    if (notification.nguoiNhan.toString() !== userId) {
      return res.status(403).json({ message: 'Không có quyền xóa thông báo này' });
    }

    await ThongBao.findByIdAndDelete(id);

    res.status(200).json({ message: 'Xóa thông báo thành công' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID thông báo không hợp lệ' });
    }
    res.status(500).json({ message: 'Lỗi xóa thông báo', error: error.message });
  }
};

// Xóa tất cả thông báo của người dùng
const deleteAllNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    await ThongBao.deleteMany({ nguoiNhan: userId });

    res.status(200).json({ message: 'Xóa tất cả thông báo thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa tất cả thông báo', error: error.message });
  }
};

// Helper function: Tạo thông báo (dùng trong các controller khác)
const createNotification = async ({ nguoiNhan, loai, noiDung, roomId, tinNhanId }, io) => {
  const notification = await ThongBao.create({
    nguoiNhan,
    loai,
    noiDung,
    roomId,
    tinNhanId,
    daDoc: false,
  });

  const populatedNotification = await ThongBao.findById(notification._id)
    .populate('nguoiNhan', 'hoTen avatar')
    .populate('roomId', 'tenPhong loaiPhong')
    .populate('tinNhanId', 'noiDung loaiTinNhan nguoiGuiId');

  // Gửi thông báo real-time
  io.to(nguoiNhan.toString()).emit('newNotification', populatedNotification);

  return populatedNotification;
};

// Helper function: Tích hợp Socket.IO
const setupNotificationSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinUserRoom', ({ userId }) => {
      socket.join(userId); // Tham gia room cá nhân của user để nhận thông báo
      socket.emit('message', { message: `Joined user room ${userId}` });
    });

    socket.on('markNotificationAsRead', async ({ id, userId }) => {
      try {
        const notification = await ThongBao.findById(id);
        if (!notification) throw new Error('Không tìm thấy thông báo');
        if (notification.nguoiNhan.toString() !== userId) throw new Error('Không có quyền');

        notification.daDoc = true;
        await notification.save();

        const updatedNotification = await ThongBao.findById(id)
          .populate('nguoiNhan', 'hoTen avatar')
          .populate('roomId', 'tenPhong loaiPhong')
          .populate('tinNhanId', 'noiDung loaiTinNhan nguoiGuiId');

        io.to(userId).emit('notificationRead', updatedNotification);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
  });
};

module.exports = {
  getNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
  createNotification,
  setupNotificationSocket,
};