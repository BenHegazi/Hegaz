const mongoose = require("mongoose");

const CarSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    model: {
      required: true,
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CarModel = mongoose.model("car", CarSchema);

module.exports = {
  CarModel,
};
