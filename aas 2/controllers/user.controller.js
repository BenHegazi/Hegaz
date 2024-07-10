const {
  getAllUsers,
  getOneUser,
  updatUser,
  deleteUser,
} = require("../services/user.service");

const router = require("express").Router();

router.get("/", getAllUsers);

router.route("/:id").get(getOneUser).put(updatUser).delete(deleteUser);
module.exports = {
  userController: router,
};
