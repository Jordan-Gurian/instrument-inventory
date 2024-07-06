const InstrumentInstance = require("../models/instrumentinstance");
const asyncHandler = require("express-async-handler");

// Display list of all InstrumentInstances.
exports.instrumentinstance_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: InstrumentInstance list");
});

// Display detail page for a specific InstrumentInstance.
exports.instrumentinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: InstrumentInstance detail: ${req.params.id}`);
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
