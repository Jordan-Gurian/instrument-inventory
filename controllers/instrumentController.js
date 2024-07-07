const Instrument = require("../models/instrument");
const Category = require("../models/category");
const InstrumentInstance = require("../models/instrumentinstance");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of instruments, instrument instances, and category counts (in parallel)
  const [
    numInstruments,
    numInstrumentInstances,
    numCategories,
  ] = await Promise.all([
    Instrument.countDocuments({}).exec(),
    InstrumentInstance.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Instrument Inventory Home",
    instrument_count: numInstruments,
    instrument_instance_count: numInstrumentInstances,
    category_count: numCategories,
  });
});

// Display list of all instruments.
exports.instrument_list = asyncHandler(async (req, res, next) => {
  const allInstruments = await Instrument.find({}, "name category")
    .sort({ name: 1 })
    .populate("category")
    .exec();

  res.render("instrument_list", { title: "Instrument List", instrument_list: allInstruments });
});

// Display detail page for a specific instrument.
exports.instrument_detail = asyncHandler(async (req, res, next) => {
  const [instrument, instrumentInstances] = await Promise.all([
    Instrument.findById(req.params.id).populate("category").exec(),
    InstrumentInstance.find({ instrument: req.params.id }).exec(),
  ])

  if (instrument === null) {
    //No results
    const err = new Error("Instrument not found");
    err.status = 404;
    return next(err);
  }

  res.render("instrument_detail", {
    name: instrument.name,
    instrument: instrument,
    instrument_instances: instrumentInstances,
  })
});

// Display instrument create form on GET.
exports.instrument_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument create GET");
});

// Handle instrument create on POST.
exports.instrument_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument create POST");
});

// Display instrument delete form on GET.
exports.instrument_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument delete GET");
});

// Handle instrument delete on POST.
exports.instrument_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument delete POST");
});

// Display instrument update form on GET.
exports.instrument_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument update GET");
});

// Handle instrument update on POST.
exports.instrument_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument update POST");
});
