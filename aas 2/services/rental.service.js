const { isValidObjectId } = require("mongoose");
const { RentalModel } = require("../models/RentalModel");

module.exports = {
  createRental: async (req, res) => {
    const { userId, carId } = req.body;

    if (!isValidObjectId(userId) || !isValidObjectId(carId)) {
      return res.json({ msg: "not valid data" });
    }

    await RentalModel.create({
      userId,
      carId,
    });
    return res.json({ msg: "rental has created" });
  },
  getAllRentals: async (req, res) => {
    const rentals = await RentalModel.find();
    return res.json({ rentals });
  },
  getOneRental: async (req, res) => {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      const rental = await RentalModel.findOne({ _id: id });
      return res.json({ msg: rental });
    } else return res.json({ msg: "not valid id" });
  },
  updatRental: async (req, res) => {
    const id = req.params.id;
    const { userId, carId } = req.body;
    if (isValidObjectId(id)) {
      await RentalModel.updateOne(
        { _id: id },
        {
          userId,
          carId,
        }
      );
      return res.json({ msg: "rental update success" });
    } else return res.status(401).json({ msg: "unauthorization" });
  },
  deleteRental: async (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      await RentalModel.deleteOne({ _id: id });
      return res.json({ msg: "delete success" });
    } else return res.json({ msg: "not valid id" });
  },
};
