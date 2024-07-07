const InstrumentInstance = require("../models/instrumentinstance");
const Instrument = require("../models/instrument");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  const allInstruments = await Instrument.find({}, "name").sort({ name: 1 }).exec();

  res.render("instrumentinstance_form", {
    title: "Create Instrument Instance",
    instrument_list: allInstruments,
  });
});

// Handle InstrumentInstance create on POST.
exports.instrumentinstance_create_post = [
  // Validate and sanitize fields.
  body("instrument", "Instrument must be specified").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must be specified")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("condition").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const instrumentInstance = new InstrumentInstance({
      instrument: req.body.instrument,
      price: req.body.price,
      condition: req.body.condition,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allInstruments = await Instrument.find({}, "name").sort({ name: 1 }).exec();

      res.render("instrumentinstance_form", {
        title: "Create Instrument Instance",
        instrument_list: allInstruments,
        selected_instrument: instrumentInstance.instrument._id,
        errors: errors.array(),
        instrumentinstance: instrumentInstance,
      });
      return;
    } else {
      // Data from form is valid
      await instrumentInstance.save();
      res.redirect(instrumentInstance.url);
    }
  }),
];


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
