const { Router } = require("express");
const usersRoutes = Router();

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);

const UsersController = require("../Controller/UserController");
const usersController = new UsersController();

const UserAvatarController = require("../Controller/UserAvatarController");
const userAvatarController = new UserAvatarController();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
