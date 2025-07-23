// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMessages,
  createMessageHandler,
  createCallMessage,
  updateMessageHandler,
  deleteMessageHandler,
  recallMessage,
  markMessageAsRead,
  searchMessages,
  pinMessage,
  unpinMessage,
} = require('../controllers/messageController');
const upload = require('../middleware/upload');
const middlewareController = require('../controllers/middlewareController');

router.get('/:roomId', middlewareController.verifyToken, getMessages);
router.post('/', middlewareController.verifyToken, upload.array('tapTin', 5), createMessageHandler); 
router.post('/call', middlewareController.verifyToken, createCallMessage);
router.put('/:id', middlewareController.verifyToken, updateMessageHandler);
router.delete('/:id', middlewareController.verifyToken, deleteMessageHandler);
router.put('/:id/recall', middlewareController.verifyToken, recallMessage);
router.put('/:id/read', middlewareController.verifyToken, markMessageAsRead);
router.get('/:roomId/search', middlewareController.verifyToken, searchMessages);
router.put('/:roomId/pin/:messageId', middlewareController.verifyToken, pinMessage);
router.put('/:roomId/unpin/:messageId', middlewareController.verifyToken, unpinMessage);

module.exports = router;