const {
  createRental,
  getAllRentals,
  getOneRental,
  updatRental,
  deleteRental,
} = require("../services/rental.service");

const router = require("express").Router();

router.route("/").post(createRental).get(getAllRentals);
router.route("/:id").get(getOneRental).put(updatRental).delete(deleteRental);

module.exports = {
  RentalController: router,
};
