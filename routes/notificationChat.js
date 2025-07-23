
// const express = require('express');
// const router = express.Router();
// const {
//   getNotifications,
//   getUnreadNotifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
//   deleteNotification,
//   deleteAllNotifications,
// } = require('../controllers/notificationController');
// const verifyToken = require('../controllers/middlewareController'); 

// router.get('/', verifyToken, getNotifications);
// router.get('/unread', verifyToken, getUnreadNotifications);
// router.put('/:id/read', verifyToken, markNotificationAsRead);
// router.put('/read-all', verifyToken, markAllNotificationsAsRead);
// router.delete('/:id', verifyToken, deleteNotification);
// router.delete('/', verifyToken, deleteAllNotifications);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
} = require('../controllers/notificationChatController');

router.get('/', getNotifications);
router.get('/unread', getUnreadNotifications);
router.put('/:id/read', markNotificationAsRead);
router.put('/read-all', markAllNotificationsAsRead);
router.delete('/:id', deleteNotification);
router.delete('/', deleteAllNotifications);

module.exports = router;