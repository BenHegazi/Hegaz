const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");

async function signin(req, res) {
  const { email, password } = req.body;
  const findUser = await UserModel.findOne({ email });
  if (!findUser) return res.status(404).json({ msg: "user not found" });

  const isUser = await bcrypt.compare(password, findUser.password);

  if (!isUser)
    return res.status(401).json({ msg: "check your email or password" });

  const token = jwt.sign(
    {
      sub: findUser._id,
    },
    "pass",
    { expiresIn: "1d" }
  );
  return res.json({ token });
}

async function signup(req, res) {
  const { name, email, phone, password } = req.body;

  // Ensure all required fields are present
  if (!name || !email || !phone || !password) {
    return res.status(400).send("All fields are required");
  }

  await UserModel.create({
    name,
    email,
    phone,
    password,
  });
  return res.json({ msg: "user created" });
}

module.exports = {
  signin,
  signup,
};
