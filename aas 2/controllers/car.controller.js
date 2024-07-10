const {
  addCar,
  getOneCar,
  updatCar,
  deleteCar,
  getAllCars,
} = require("../services/car.service");

const router = require("express").Router();

router.route("/").post(addCar).get(getAllCars);

router.route("/:id").get(getOneCar).put(updatCar).delete(deleteCar);

module.exports = {
  carController: router,
};
