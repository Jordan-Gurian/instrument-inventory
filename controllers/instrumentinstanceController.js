const InstrumentInstance = require("../models/instrumentinstance");
const asyncHandler = require("express-async-handler");

// Display list of all InstrumentInstances.
exports.instrumentinstance_list = asyncHandler(async (req, res, next) => {
  const allInstrumentInstances = await InstrumentInstance.find().populate("instrument").exec();

  res.render("instrumentinstance_list", {
    title: "Instrument Inventory List",
    instrumentinstance_list: allInstrumentInstances,
  });
});

// Display detail page for a specific InstrumentInstance.
exports.instrumentinstance_detail = asyncHandler(async (req, res, next) => {
  const instrumentInstance = await InstrumentInstance.findById(req.params.id)
    .populate("instrument")
    .exec();

  if (instrumentInstance === null) {
    // No results.
    const err = new Error("Instrument id not found");
    err.status = 404;
    return next(err);
  }

  res.render("instrumentinstance_detail", {
    title: "Instrument:",
    instrumentinstance: instrumentInstance,
  });
});

// Display InstrumentInstance create form on GET.
exports.instrumentinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: InstrumentInstance create GET");
});

// Handle InstrumentInstance create on POST.
exports.instrumentinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: InstrumentInstance create POST");
});

// Display InstrumentInstance delete form on GET.
exports.instrumentinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: InstrumentInstance delete GET");
});

// Handle InstrumentInstance delete on POST.
exports.instrumentinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: InstrumentInstance delete POST");
});

// Display InstrumentInstance update form on GET.
exports.instrumentinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: InstrumentInstance update GET");
});

// Handle instrumentinstance update on POST.
exports.instrumentinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: InstrumentInstance update POST");
});
