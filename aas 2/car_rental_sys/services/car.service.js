const { isValidObjectId } = require("mongoose");
const { CarModel } = require("../models/CarModel");

module.exports = {
  addCar: async (req, res) => {
    const { name, model, status } = req.body;
    await CarModel.create({ name, model, status });
    return res.json({ msg: "car added success" });
  },
  getAllCars: async (req, res) => {
    if (req.query.model) {
      if (req.query.status) {
        const cars = await CarModel.find({
          model: { $in: req.query.model },
          status: req.query.status,
        });
        return res.json(cars);
      } else {
        console.log(req.query);
        const cars = await CarModel.find({ model: { $in: req.query.model } });
        return res.json(cars);
      }
    } else {
      const cars = await CarModel.find();
      return res.json({ cars });
    }
  },
  getOneCar: async (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      const car = await CarModel.findOne({ _id: id });
      return res.json(car);
    } else return res.status(403).json({ msg: "not valid id" });
  },
  updatCar: async (req, res) => {
    const id = req.params.id;
    const { name, model, status } = req.body;
    if (isValidObjectId(id)) {
      await CarModel.updateOne(
        { _id: id },
        {
          name,
          model,
          status,
        }
      );
      return res.json({ msg: "car update success" });
    } else return res.status(401).json({ msg: "unauthorization" });
  },
  deleteCar: async (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      await CarModel.deleteOne({ _id: id });
      return res.json({ msg: "delete success" });
    } else return res.status(401).json({ msg: "unauthorization" });
  },
};
