const { isValidObjectId } = require("mongoose");
const { UserModel } = require("../models/UserModel");

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await UserModel.find();
    return res.json({ users });
  },
  getOneUser: async (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      const user = await UserModel.findOne({ _id: id }).select("-password");
      return res.json(user);
    } else return res.status(403).json({ msg: "not valid id" });
  },
  updatUser: async (req, res) => {
    if (req.user._id.toString() === req.params.id) {
      await UserModel.updateOne(
        { _id: req.user._id },
        {
          email: req.body.email,
        }
      );
      return res.json({ msg: "update success" });
    } else return res.status(401).json({ msg: "unauthorization" });
  },
  deleteUser: async (req, res) => {
    if (req.user._id.toString() === req.params.id) {
      await UserModel.deleteOne({ _id: req.user._id });
      return res.json({ msg: "delete success" });
    } else return res.status(401).json({ msg: "unauthorization" });
  },
};
