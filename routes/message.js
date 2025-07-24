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

router.get('/:roomId', getMessages);
router.post('/', upload.array('tapTin', 5), createMessageHandler); 
router.post('/call', createCallMessage);
router.put('/:id', updateMessageHandler);
router.delete('/:id', deleteMessageHandler);
router.put('/:id/recall', recallMessage);
router.put('/:id/read', markMessageAsRead);
router.get('/:roomId/search', searchMessages);
router.put('/:roomId/pin/:messageId', pinMessage);
router.put('/:roomId/unpin/:messageId', unpinMessage);

module.exports = router;