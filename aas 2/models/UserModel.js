const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
  next();
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
