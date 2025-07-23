const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const propertyRouter = require("./property");
const reviewRouter = require("./review");
const userRouter = require("./user");
const viewingsRouter = require("./viewings");
const favoriteRouter = require("./favorite");
const employeeRouter = require("./employee");
const ownerRouter = require("./owner");
const roleRouter = require("./role");
const customerRouter = require("./customer");
const messageRouter = require("./message");
const roomRouter = require("./room");
const notificationRouter = require("./notificationChat");
router.use("/owner",ownerRouter)
router.use("/favorite", favoriteRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/property", propertyRouter);
router.use("/review", reviewRouter);
router.use("/viewing", viewingsRouter);
router.use("/employee", employeeRouter);
router.use("/role", roleRouter);
router.use("/customer", customerRouter);
router.use("/message", messageRouter);
router.use("/notification", notificationRouter);
router.use("/room", roomRouter);





module.exports = router;
