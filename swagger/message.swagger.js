/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: API quản lý tin nhắn chat
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của người dùng
 *           example: "507f1f77bcf86cd799439012"
 *         hoTen:
 *           type: string
 *           description: Họ tên người dùng
 *           example: "Nguyễn Văn A"
 *         anhDaiDien:
 *           type: string
 *           description: URL ảnh đại diện
 *           example: "https://example.com/avatar.jpg"
 *     RoomInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của phòng chat
 *           example: "507f1f77bcf86cd799439011"
 *         tenPhong:
 *           type: string
 *           description: Tên phòng chat
 *           example: "Nhóm chat ABC"
 *         loaiPhong:
 *           type: string
 *           enum: [private, group]
 *           description: Loại phòng chat
 *           example: "group"
 *         thanhVien:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nguoiDung:
 *                 $ref: '#/components/schemas/UserInfo'
 *               vaiTro:
 *                 type: string
 *                 enum: [admin, member]
 *                 description: Vai trò trong phòng
 *                 example: "member"
 *               trangThai:
 *                 type: string
 *                 enum: [active, left]
 *                 description: Trạng thái thành viên
 *                 example: "active"
 *           description: Danh sách thành viên
 *         nguoiTao:
 *           $ref: '#/components/schemas/UserInfo'
 *           description: Thông tin người tạo phòng
 *         anhDaiDien:
 *           type: string
 *           description: URL ảnh đại diện phòng
 *           example: "https://example.com/room-avatar.jpg"
 *     File:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: URL của tệp
 *           example: "https://example.com/file.jpg"
 *         loai:
 *           type: string
 *           description: Loại tệp (image, video, pdf, etc.)
 *           example: "image/jpeg"
 *         ten:
 *           type: string
 *           description: Tên tệp
 *           example: "image.jpg"
 *     CallInfo:
 *       type: object
 *       properties:
 *         trangThai:
 *           type: string
 *           enum: [missed, ended, declined, ongoing]
 *           description: Trạng thái cuộc gọi
 *           example: "ended"
 *         thoiLuong:
 *           type: number
 *           description: Thời lượng cuộc gọi (giây)
 *           example: 120
 *         loai:
 *           type: string
 *           enum: [audio, video]
 *           description: Loại cuộc gọi
 *           example: "video"
 *         thanhVien:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID người tham gia cuộc gọi
 *           example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *     Message:
 *       type: object
 *       required:
 *         - roomId
 *         - nguoiGuiId
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của tin nhắn
 *           example: "507f1f77bcf86cd799439014"
 *         roomId:
 *           $ref: '#/components/schemas/RoomInfo'
 *           description: Thông tin phòng chat
 *         nguoiGuiId:
 *           $ref: '#/components/schemas/UserInfo'
 *           description: Thông tin người gửi
 *         noiDung:
 *           type: string
 *           description: Nội dung tin nhắn
 *           example: "Xin chào mọi người!"
 *         tapTin:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/File'
 *           description: Danh sách tệp đính kèm
 *         phanHoiTinNhan:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: ID của tin nhắn được trả lời
 *               example: "507f1f77bcf86cd799439015"
 *             noiDung:
 *               type: string
 *               description: Nội dung tin nhắn được trả lời
 *               example: "Tin nhắn gốc"
 *             nguoiGuiId:
 *               $ref: '#/components/schemas/UserInfo'
 *           description: Thông tin tin nhắn được trả lời
 *         daDoc:
 *           type: boolean
 *           default: false
 *           description: Trạng thái đọc của tin nhắn
 *           example: false
 *         trangThai:
 *           type: string
 *           enum: [sent, edited, deleted]
 *           default: sent
 *           description: Trạng thái tin nhắn
 *           example: "sent"
 *         loaiTinNhan:
 *           type: string
 *           enum: [text, image, cuoc_goi, system]
 *           default: text
 *           description: Loại tin nhắn
 *           example: "text"
 *         cuocGoi:
 *           $ref: '#/components/schemas/CallInfo'
 *           description: Thông tin cuộc gọi (nếu là tin nhắn loại cuoc_goi)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo tin nhắn
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật tin nhắn
 *     MessageCreate:
 *       type: object
 *       required:
 *         - roomId
 *         - nguoiGuiId
 *       properties:
 *         roomId:
 *           type: string
 *           description: ID phòng chat
 *           example: "507f1f77bcf86cd799439011"
 *         nguoiGuiId:
 *           type: string
 *           description: ID người gửi tin nhắn
 *           example: "507f1f77bcf86cd799439012"
 *         noiDung:
 *           type: string
 *           description: Nội dung tin nhắn
 *           example: "Xin chào mọi người!"
 *         tapTin:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/File'
 *           description: Danh sách tệp đính kèm
 *         phanHoiTinNhan:
 *           type: string
 *           description: ID của tin nhắn được trả lời
 *           example: "507f1f77bcf86cd799439015"
 *         loaiTinNhan:
 *           type: string
 *           enum: [text, image, cuoc_goi, system]
 *           default: text
 *           description: Loại tin nhắn
 *           example: "text"
 *     MessageUpdate:
 *       type: object
 *       properties:
 *         noiDungMoi:
 *           type: string
 *           description: Nội dung tin nhắn mới
 *           example: "Nội dung đã chỉnh sửa"
 *         tapTin:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/File'
 *           description: Danh sách tệp đính kèm mới
 *     CallCreate:
 *       type: object
 *       required:
 *         - roomId
 *         - nguoiGuiId
 *         - loai
 *       properties:
 *         roomId:
 *           type: string
 *           description: ID của phòng chat
 *           example: "507f1f77bcf86cd799439011"
 *         nguoiGuiId:
 *           type: string
 *           description: ID của người gửi
 *           example: "507f1f77bcf86cd799439012"
 *         loai:
 *           type: string
 *           enum: [audio, video]
 *           description: Loại cuộc gọi
 *           example: "video"
 *         trangThai:
 *           type: string
 *           enum: [missed, ended, declined, ongoing]
 *           description: Trạng thái cuộc gọi
 *           example: "ended"
 *         thoiLuong:
 *           type: number
 *           description: Thời lượng cuộc gọi (giây)
 *           example: 120
 *         thanhVien:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID người tham gia
 *           example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 */

/**
 * @swagger
 * /api/message/room/{roomId}:
 *   get:
 *     summary: Lấy danh sách tin nhắn trong phòng chat
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phòng chat
 *         example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Số tin nhắn mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách tin nhắn trong phòng chat (sắp xếp theo thời gian tạo tăng dần)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *                 totalMessages:
 *                   type: integer
 *                   description: Tổng số tin nhắn
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   description: Trang hiện tại
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: Tổng số trang
 *                   example: 5
 *       400:
 *         description: ID phòng chat không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID phòng chat không hợp lệ"
 *       403:
 *         description: Người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Người dùng không thuộc phòng chat"
 *       404:
 *         description: Không tìm thấy phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy phòng chat"
 *       500:
 *         description: Lỗi lấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi lấy tin nhắn"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message:
 *   get:
 *     summary: Lấy tất cả tin nhắn (dành cho quản trị viên)
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách tất cả tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lấy tất cả tin nhắn thành công"
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       403:
 *         description: Chỉ quản trị viên mới có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chỉ quản trị viên mới có quyền truy cập"
 *       500:
 *         description: Lỗi lấy tất cả tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi lấy tất cả tin nhắn"
 *                 error:
 *                   type: string
 *   post:
 *     summary: Tạo tin nhắn mới
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageCreate'
 *           examples:
 *             text_message:
 *               summary: Tạo tin nhắn văn bản
 *               value:
 *                 roomId: "507f1f77bcf86cd799439011"
 *                 nguoiGuiId: "507f1f77bcf86cd799439012"
 *                 noiDung: "Xin chào mọi người!"
 *                 phanHoiTinNhan: "507f1f77bcf86cd799439015"
 *                 loaiTinNhan: "text"
 *             image_message:
 *               summary: Tạo tin nhắn hình ảnh
 *               value:
 *                 roomId: "507f1f77bcf86cd799439011"
 *                 nguoiGuiId: "507f1f77bcf86cd799439012"
 *                 tapTin:
 *                   - url: "https://example.com/image.jpg"
 *                     loai: "image/jpeg"
 *                     ten: "image.jpg"
 *                 loaiTinNhan: "image"
 *     responses:
 *       201:
 *         description: Tin nhắn được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               missing_data:
 *                 summary: Thiếu thông tin bắt buộc
 *                 value:
 *                   message: "Thiếu thông tin bắt buộc (roomId, nguoiGuiId, noiDung hoặc tapTin)"
 *               invalid_id:
 *                 summary: ID không hợp lệ
 *                 value:
 *                   message: "ID phòng chat hoặc người gửi không hợp lệ"
 *               invalid_reply:
 *                 summary: Tin nhắn trả lời không hợp lệ
 *                 value:
 *                   message: "ID tin nhắn trả lời không hợp lệ"
 *       403:
 *         description: Người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Người dùng không thuộc phòng chat"
 *       404:
 *         description: Không tìm thấy phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy phòng chat"
 *       500:
 *         description: Lỗi tạo tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi tạo tin nhắn"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/{id}:
 *   put:
 *     summary: Cập nhật tin nhắn
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần cập nhật
 *         example: "507f1f77bcf86cd799439014"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageUpdate'
 *           example:
 *             noiDungMoi: "Nội dung đã chỉnh sửa"
 *             tapTin:
 *               - url: "https://example.com/new-image.jpg"
 *                 loai: "image/jpeg"
 *                 ten: "new-image.jpg"
 *     responses:
 *       200:
 *         description: Tin nhắn được cập nhật thành công (trạng thái tự động chuyển thành 'edited')
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               missing_data:
 *                 summary: Thiếu nội dung hoặc tệp
 *                 value:
 *                   message: "Thiếu nội dung hoặc tệp tin nhắn mới"
 *               invalid_id:
 *                 summary: ID không hợp lệ
 *                 value:
 *                   message: "ID tin nhắn không hợp lệ"
 *       403:
 *         description: Không có quyền chỉnh sửa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không có quyền chỉnh sửa tin nhắn"
 *       404:
 *         description: Không tìm thấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy tin nhắn"
 *       500:
 *         description: Lỗi cập nhật tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi cập nhật tin nhắn"
 *                 error:
 *                   type: string
 *   delete:
 *     summary: Xóa tin nhắn (soft delete)
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần xóa
 *         example: "507f1f77bcf86cd799439014"
 *     responses:
 *       200:
 *         description: Tin nhắn được xóa thành công (soft delete, trạng thái chuyển thành 'deleted')
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *       403:
 *         description: Không có quyền xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không có quyền xóa tin nhắn"
 *       404:
 *         description: Không tìm thấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy tin nhắn"
 *       500:
 *         description: Lỗi xóa tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi xóa tin nhắn"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/{id}/read:
 *   patch:
 *     summary: Đánh dấu tin nhắn đã đọc
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần đánh dấu đã đọc
 *         example: "507f1f77bcf86cd799439014"
 *     responses:
 *       200:
 *         description: Tin nhắn được đánh dấu đã đọc thành công (daDoc = true)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *       403:
 *         description: Người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Người dùng không thuộc phòng chat"
 *       404:
 *         description: Không tìm thấy tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy tin nhắn"
 *       500:
 *         description: Lỗi đánh dấu tin nhắn đã đọc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi đánh dấu tin nhắn đã đọc"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/room/{roomId}/calls:
 *   get:
 *     summary: Lấy lịch sử cuộc gọi trong phòng chat
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phòng chat
 *         example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Số cuộc gọi mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách tin nhắn cuộc gọi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID phòng chat không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID phòng chat không hợp lệ"
 *       403:
 *         description: Người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Người dùng không thuộc phòng chat"
 *       404:
 *         description: Không tìm thấy phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy phòng chat"
 *       500:
 *         description: Lỗi lấy lịch sử cuộc gọi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi lấy lịch sử cuộc gọi"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/call:
 *   post:
 *     summary: Tạo tin nhắn cuộc gọi
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CallCreate'
 *           example:
 *             roomId: "507f1f77bcf86cd799439011"
 *             nguoiGuiId: "507f1f77bcf86cd799439012"
 *             loai: "video"
 *             trangThai: "ended"
 *             thoiLuong: 120
 *             thanhVien: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *     responses:
 *       201:
 *         description: Tin nhắn cuộc gọi được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thiếu thông tin cuộc gọi"
 *       403:
 *         description: Người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Người dùng không thuộc phòng chat"
 *       404:
 *         description: Không tìm thấy phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy phòng chat"
 *       500:
 *         description: Lỗi tạo tin nhắn cuộc gọi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi tạo tin nhắn cuộc gọi"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */