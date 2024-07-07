const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  numInStock: { type: Number, required: true, default: 0 },
});

// Virtual for instrument's URL
InstrumentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/instrument/${this._id}`;
});

// Export model
module.exports = mongoose.model("Instrument", InstrumentSchema);
