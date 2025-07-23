// // routes/messageRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   getMessages,
//   createMessageHandler,
//   createCallMessage,
//   updateMessageHandler,
//   deleteMessageHandler,
//   recallMessage,
//   markMessageAsRead,
//   searchMessages,
//   pinMessage,
//   unpinMessage,
// } = require('../controllers/messageController');
// const upload = require('../middleware/upload');
// const verifyToken = require('../controllers/middlewareController'); 

// router.get('/:roomId', verifyToken, getMessages);
// router.post('/', verifyToken, upload.array('tapTin', 5), createMessageHandler); // Giới hạn 5 tệp
// router.post('/call', verifyToken, createCallMessage);
// router.put('/:id', verifyToken, updateMessageHandler);
// router.delete('/:id', verifyToken, deleteMessageHandler);
// router.put('/:id/recall', verifyToken, recallMessage);
// router.put('/:id/read', verifyToken, markMessageAsRead);
// router.get('/:roomId/search', verifyToken, searchMessages);
// router.put('/:roomId/pin/:messageId', verifyToken, pinMessage);
// router.put('/:roomId/unpin/:messageId', verifyToken, unpinMessage);

// module.exports = router;

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
// const verifyToken = require('../controllers/middlewareController'); 

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