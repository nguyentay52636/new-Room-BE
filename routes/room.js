// // routes/roomRoutes.js
// const express = require('express');
// const router = express.Router();
// const roomController = require('../controllers/roomController');
// const verifyToken = require('../middleware/verifyToken'); // Giả định middleware xác thực

// // Get rooms of user
// router.get('/user/:userId', verifyToken, roomController.getRoomsOfUser);

// // Get room by ID
// router.get('/:roomId', verifyToken, roomController.getRoomById);

// // Create new room
// router.post('/', verifyToken, roomController.createRoom);

// // Find or create private room between 2 users
// router.post('/find-or-create-private', verifyToken, roomController.findOrCreatePrivateRoom);

// // Add message to room
// router.post('/:roomId/message', verifyToken, roomController.addMessageToRoom);

// // Remove message from room
// router.delete('/:roomId/message/:messageId', verifyToken, roomController.removeMessageFromRoom);

// // Update room
// router.put('/:roomId', verifyToken, roomController.updateRoom);

// // Delete room
// router.delete('/:roomId', verifyToken, roomController.deleteRoom);

// // Add member to group room
// router.post('/:roomId/add-member', verifyToken, roomController.addMemberToRoom);

// // Remove member from group room (leave room)
// router.post('/:roomId/leave', verifyToken, roomController.leaveRoom);

// // Transfer admin role
// router.put('/:roomId/transfer-admin', verifyToken, roomController.transferAdmin);

// module.exports = router;
// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomChatController');

// Get rooms of user
router.get('/user/:userId', roomController.getRoomsOfUser);

// Get room by ID
router.get('/:roomId', roomController.getRoomById);

// Create new room
router.post('/', roomController.createRoom);

// Find or create private room between 2 users
router.post('/find-or-create-private', roomController.findOrCreatePrivateRoom);

// Add message to room
router.post('/:roomId/message', roomController.addMessageToRoom);

// Remove message from room
router.delete('/:roomId/message/:messageId', roomController.removeMessageFromRoom);

// Update room
router.put('/:roomId', roomController.updateRoom);

// Delete room
router.delete('/:roomId', roomController.deleteRoom);

// Add member to group room
router.post('/:roomId/add-member', roomController.addMemberToRoom);

// Remove member from group room (leave room)
router.post('/:roomId/leave', roomController.leaveRoom);

// Transfer admin role
router.put('/:roomId/transfer-admin', roomController.transferAdmin);

module.exports = router;