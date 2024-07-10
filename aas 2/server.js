const express = require("express");
const mongoose = require("mongoose");
const { IsAuth } = require("./middleware/auth.middleware");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(require("./controllers/auth.controller").authController);
app.use(
  "/users",
  IsAuth,
  require("./controllers/user.controller").userController
);

app.use("/cars", IsAuth, require("./controllers/car.controller").carController);
app.use(
  "/rentals",
  IsAuth,
  require("./controllers/rental.controller").RentalController
);

mongoose
  .connect("mongodb://127.0.0.1:27017/car_rental_sys")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("app start on http://localhost:3000"));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
