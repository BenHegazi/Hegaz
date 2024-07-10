const mongoose = require("mongoose");
const RentalSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    carId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "car",
    },
  },
  { timestamps: true }
);

const RentalModel = mongoose.model("rental", RentalSchema);

module.exports = {
  RentalModel,
};
