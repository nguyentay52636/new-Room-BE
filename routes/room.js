// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomChatController');

// Search rooms - không cần auth
router.get('/search', roomController.searchRooms);

// Get rooms of user - không cần auth
router.get('/user/:userId', roomController.getRoomsOfUser);

// Get room by ID - không cần auth
router.get('/:roomId', roomController.getRoomById);

// Create new room - không cần auth
router.post('/', roomController.createRoom);

// Find or create private room between 2 users - không cần auth
router.post('/find-or-create-private', roomController.findOrCreatePrivateRoom);

// Add message to room - không cần auth
router.post('/:roomId/message', roomController.addMessageToRoom);

// Remove message from room - không cần auth
router.delete('/:roomId/message/:messageId', roomController.removeMessageFromRoom);

// Update room - không cần auth
router.put('/:roomId', roomController.updateRoom);

// Delete room - không cần auth
router.delete('/:roomId', roomController.deleteRoom);

// Add member to group room - không cần auth
router.post('/:roomId/add-member', roomController.addMemberToRoom);

// Remove member from group room (leave room) - không cần auth
router.post('/:roomId/leave', roomController.leaveRoom);

// Transfer admin role - không cần auth
router.put('/:roomId/transfer-admin', roomController.transferAdmin);

// Get all rooms - không cần auth
router.get('/', roomController.getAllRom);

module.exports = router;