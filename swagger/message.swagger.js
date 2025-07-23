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
 *         avatar:
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
 *             type: string
 *           description: Danh sách URL tệp đính kèm
 *           example: ["https://example.com/file1.jpg", "https://example.com/file2.pdf"]
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
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID người dùng đã đọc tin nhắn
 *           example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *         trangThai:
 *           type: string
 *           enum: [sent, edited, deleted, recalled]
 *           description: Trạng thái tin nhắn
 *           example: "sent"
 *         loaiTinNhan:
 *           type: string
 *           enum: [text, image, cuoc_goi, system]
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
 *             type: string
 *           description: Danh sách URL tệp đính kèm
 *           example: ["https://example.com/file1.jpg"]
 *         phanHoiTinNhan:
 *           type: string
 *           description: ID của tin nhắn được trả lời
 *           example: "507f1f77bcf86cd799439015"
 *         loaiTinNhan:
 *           type: string
 *           enum: [text, image, cuoc_goi, system]
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
 *             type: string
 *           description: Danh sách URL tệp đính kèm mới
 *           example: ["https://example.com/new-image.jpg"]
 *     CallCreate:
 *       type: object
 *       required:
 *         - roomId
 *         - loai
 *       properties:
 *         roomId:
 *           type: string
 *           description: ID của phòng chat
 *           example: "507f1f77bcf86cd799439011"
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
 *     MessageListResponse:
 *       type: object
 *       properties:
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *         total:
 *           type: integer
 *           description: Tổng số tin nhắn
 *           example: 100
 *         page:
 *           type: integer
 *           description: Trang hiện tại
 *           example: 1
 *         totalPages:
 *           type: integer
 *           description: Tổng số trang
 *           example: 5
 */

/**
 * @swagger
 * /api/message/{roomId}:
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
 *               $ref: '#/components/schemas/MessageListResponse'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Token không hợp lệ hoặc người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               invalid_token:
 *                 summary: Token không hợp lệ
 *                 value:
 *                   message: "Token không hợp lệ"
 *               not_member:
 *                 summary: Không thuộc phòng chat
 *                 value:
 *                   message: "Người dùng không thuộc phòng chat"
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
 *   post:
 *     summary: Tạo tin nhắn mới
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - nguoiGuiId
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: ID phòng chat
 *                 example: "507f1f77bcf86cd799439011"
 *               nguoiGuiId:
 *                 type: string
 *                 description: ID người gửi tin nhắn
 *                 example: "507f1f77bcf86cd799439012"
 *               noiDung:
 *                 type: string
 *                 description: Nội dung tin nhắn
 *                 example: "Xin chào mọi người!"
 *               tapTin:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Tệp đính kèm (tối đa 5 tệp)
 *               phanHoiTinNhan:
 *                 type: string
 *                 description: ID của tin nhắn được trả lời
 *                 example: "507f1f77bcf86cd799439015"
 *               loaiTinNhan:
 *                 type: string
 *                 enum: [text, image, cuoc_goi, system]
 *                 description: Loại tin nhắn
 *                 example: "text"
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
 *                 tapTin: ["https://example.com/image.jpg"]
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
 *                   message: "Thiếu thông tin bắt buộc"
 *               invalid_type:
 *                 summary: Loại tin nhắn không hợp lệ
 *                 value:
 *                   message: "Loại tin nhắn không hợp lệ: text, image, cuoc_goi, system"
 *               invalid_reply:
 *                 summary: Tin nhắn trả lời không hợp lệ
 *                 value:
 *                   message: "Tin nhắn trả lời không hợp lệ"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Token không hợp lệ hoặc người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               invalid_token:
 *                 summary: Token không hợp lệ
 *                 value:
 *                   message: "Token không hợp lệ"
 *               not_member:
 *                 summary: Không thuộc phòng chat
 *                 value:
 *                   message: "Người dùng không thuộc phòng chat"
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
 *             examples:
 *               missing_data:
 *                 summary: Thiếu thông tin bắt buộc
 *                 value:
 *                   message: "Thiếu thông tin bắt buộc (roomId, loai)"
 *               invalid_type:
 *                 summary: Loại cuộc gọi không hợp lệ
 *                 value:
 *                   message: "Loại cuộc gọi không hợp lệ: audio, video"
 *               invalid_status:
 *                 summary: Trạng thái cuộc gọi không hợp lệ
 *                 value:
 *                   message: "Trạng thái cuộc gọi không hợp lệ: missed, ended, declined, ongoing"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Token không hợp lệ hoặc người dùng không thuộc phòng chat
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
 *             tapTin: ["https://example.com/new-image.jpg"]
 *     responses:
 *       200:
 *         description: Tin nhắn được cập nhật thành công (trạng thái tự động chuyển thành 'edited')
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID tin nhắn không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Không có quyền chỉnh sửa tin nhắn
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
 *         description: ID tin nhắn không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Không có quyền xóa tin nhắn
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
 * /api/message/{id}/recall:
 *   put:
 *     summary: Thu hồi tin nhắn
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần thu hồi
 *         example: "507f1f77bcf86cd799439014"
 *     responses:
 *       200:
 *         description: Tin nhắn được thu hồi thành công (trạng thái chuyển thành 'recalled')
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID tin nhắn không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Không có quyền thu hồi tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không có quyền thu hồi tin nhắn"
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
 *         description: Lỗi thu hồi tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi thu hồi tin nhắn"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/{id}/read:
 *   put:
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
 *         description: Tin nhắn được đánh dấu đã đọc thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID tin nhắn không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID tin nhắn không hợp lệ"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
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
 * /api/message/{roomId}/search:
 *   get:
 *     summary: Tìm kiếm tin nhắn trong phòng chat
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
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm trong nội dung tin nhắn
 *         example: "xin chào"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Ngày bắt đầu tìm kiếm
 *         example: "2024-01-01T00:00:00.000Z"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Ngày kết thúc tìm kiếm
 *         example: "2024-12-31T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: Danh sách tin nhắn tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Token không hợp lệ hoặc người dùng không thuộc phòng chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               invalid_token:
 *                 summary: Token không hợp lệ
 *                 value:
 *                   message: "Token không hợp lệ"
 *               not_member:
 *                 summary: Không thuộc phòng chat
 *                 value:
 *                   message: "Người dùng không thuộc phòng chat"
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
 *         description: Lỗi tìm kiếm tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi tìm kiếm tin nhắn"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/{roomId}/pin/{messageId}:
 *   put:
 *     summary: Ghim tin nhắn trong phòng chat
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
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần ghim
 *         example: "507f1f77bcf86cd799439014"
 *     responses:
 *       200:
 *         description: Ghim tin nhắn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ghim tin nhắn thành công"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Chỉ admin mới có thể ghim tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chỉ admin mới có thể ghim tin nhắn"
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
 *         description: Lỗi ghim tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi ghim tin nhắn"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/{roomId}/unpin/{messageId}:
 *   put:
 *     summary: Gỡ ghim tin nhắn trong phòng chat
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
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tin nhắn cần gỡ ghim
 *         example: "507f1f77bcf86cd799439014"
 *     responses:
 *       200:
 *         description: Gỡ ghim tin nhắn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gỡ ghim tin nhắn thành công"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
 *       403:
 *         description: Chỉ admin mới có thể gỡ ghim tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chỉ admin mới có thể gỡ ghim tin nhắn"
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
 *         description: Lỗi gỡ ghim tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi gỡ ghim tin nhắn"
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
 *       description: JWT token từ header 'token' với format 'Bearer <token>'
 */