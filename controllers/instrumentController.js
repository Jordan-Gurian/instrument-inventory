const Instrument = require("../models/instrument");
const Category = require("../models/category");
const InstrumentInstance = require("../models/instrumentinstance");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  // Get all categories which we can use for adding to our instrument.
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("instrument_form", {
    title: "Create Instrument",
    categories: allCategories,
  });
});


// Handle instrument create on POST.
exports.instrument_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an Instrument object with escaped and trimmed data.
    const instrument = new Instrument({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all categories for form.
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      // Mark our selected genres as checked.
      for (const category of allCategories) {
        if (instrument.category.includes(category._id)) {
          category.checked = "true";
        }
      }
      res.render("instrument_form", {
        title: "Create Instrument",
        categories: allCategories,
        instrument: instrument,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save instrument.
      await instrument.save();
      res.redirect(instrument.url);
    }
  }),
];

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
