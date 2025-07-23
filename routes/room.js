// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomChatController');
const middlewareController = require('../controllers/middlewareController');

// Search rooms - cần auth
router.get('/search', middlewareController.verifyToken, roomController.searchRooms);

// Get rooms of user - không cần auth theo swagger
router.get('/user/:userId', roomController.getRoomsOfUser);

// Get room by ID - cần auth
router.get('/:roomId', middlewareController.verifyToken, roomController.getRoomById);

// Create new room - không có security trong swagger nhưng thực tế nên có
router.post('/', roomController.createRoom);

// Find or create private room between 2 users - không có security trong swagger
router.post('/find-or-create-private', roomController.findOrCreatePrivateRoom);

// Add message to room - cần auth
router.post('/:roomId/message', middlewareController.verifyToken, roomController.addMessageToRoom);

// Remove message from room - cần auth
router.delete('/:roomId/message/:messageId', middlewareController.verifyToken, roomController.removeMessageFromRoom);

// Update room - cần auth
router.put('/:roomId', middlewareController.verifyToken, roomController.updateRoom);

// Delete room - cần auth
router.delete('/:roomId', middlewareController.verifyToken, roomController.deleteRoom);

// Add member to group room - cần auth
router.post('/:roomId/add-member', middlewareController.verifyToken, roomController.addMemberToRoom);

// Remove member from group room (leave room) - cần auth
router.post('/:roomId/leave', middlewareController.verifyToken, roomController.leaveRoom);

// Transfer admin role - cần auth
router.put('/:roomId/transfer-admin', middlewareController.verifyToken, roomController.transferAdmin);

// Get all rooms (this might not need auth depending on use case)
router.get('/', roomController.getAllRom);

module.exports = router;