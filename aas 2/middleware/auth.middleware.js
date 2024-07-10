const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

module.exports = {
  IsAuth: async (req, res, next) => {
    let token;
    let authorization = req.headers.authorization;
    if (authorization && authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "pass");
        const user = await UserModel.findById(decoded.sub).select("-password");
        console.log(user);
        if (user) {
          req.user = user;
          next();
        } else return res.status(401).json({ msg: "unauthorization" });
      } catch (error) {
        console.log({ error: error.message });
      }
    }

    if (!token) {
      return res.status(401).json({ msg: "unauthorization" });
    }
  },
};
