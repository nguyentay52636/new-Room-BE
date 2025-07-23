/**
 * @swagger
 * /socket.io:
 *   description: WebSocket events for real-time messaging
 *   events:
 *     - name: joinRoom
 *       description: Tham gia phòng chat
 *       parameters:
 *         - name: roomId
 *           type: string
 *           description: ID của phòng chat
 *           example: "507f1f77bcf86cd799439011"
 *     - name: message:create
 *       description: Tạo tin nhắn mới
 *       parameters:
 *         - name: data
 *           schema:
 *             $ref: '#/components/schemas/MessageCreate'
 *     - name: message:read
 *       description: Đánh dấu tin nhắn đã đọc
 *       parameters:
 *         - name: id
 *           type: string
 *           description: ID của tin nhắn
 *           example: "507f1f77bcf86cd799439014"
 *         - name: roomId
 *           type: string
 *           description: ID của phòng chat
 *           example: "507f1f77bcf86cd799439011"
 */