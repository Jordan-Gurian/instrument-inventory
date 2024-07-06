const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstrumentInstanceSchema = new Schema({
  instrument: { type: Schema.Types.ObjectId, ref: "Instrument", required: true }, // reference to the associated instrument
  price: { type: String, required: true },
  condition: {
    type: String,
    required: true,
    enum: ["New", "Used - Good", "Used - Fair"],
    default: "New",
  },
});

// Virtual for bookinstance's URL
InstrumentInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/instrumentinstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("InstrumentInstance", InstrumentInstanceSchema);
