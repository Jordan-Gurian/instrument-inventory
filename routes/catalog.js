const express = require("express");
const router = express.Router();

// Require controller modules.
const instrument_controller = require("../controllers/instrumentController");
const category_controller = require("../controllers/categoryController");
const instrument_instance_controller = require("../controllers/instrumentinstanceController");

/// INSTRUMENT ROUTES ///

// GET catalog home page.
router.get("/", instrument_controller.index);

// GET request for creating an Instrument. NOTE This must come before routes that display Instrument (uses id).
router.get("/instrument/create", instrument_controller.instrument_create_get);

// POST request for creating Instrument.
router.post("/instrument/create", instrument_controller.instrument_create_post);

// GET request to delete Instrument.
router.get("/instrument/:id/delete", instrument_controller.instrument_delete_get);

// POST request to delete Instrument.
router.post("/instrument/:id/delete", instrument_controller.instrument_delete_post);

// GET request to update Instrument.
router.get("/instrument/:id/update", instrument_controller.instrument_update_get);

// POST request to update Instrument.
router.post("/instrument/:id/update", instrument_controller.instrument_update_post);

// GET request for one Instrument.
router.get("/instrument/:id", instrument_controller.instrument_detail);

// GET request for list of all Instrument items.
router.get("/instruments", instrument_controller.instrument_list);

/// CATEGORY ROUTES ///

// GET request for creating Category. NOTE This must come before route for id (i.e. display category).
router.get("/category/create", category_controller.category_create_get);

// POST request for creating Category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update Category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update Category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Categorys.
router.get("/categories", category_controller.category_list);

/// INSTRUMENTINSTANCE ROUTES ///

// GET request for creating a InstrumentInstance. NOTE This must come before route that displays InstrumentInstance (uses id).
router.get(
  "/instrumentinstance/create",
  instrument_instance_controller.instrumentinstance_create_get,
);

// POST request for creating InstrumentInstance.
router.post(
  "/instrumentinstance/create",
  instrument_instance_controller.instrumentinstance_create_post,
);

// GET request to delete InstrumentInstance.
router.get(
  "/instrumentinstance/:id/delete",
  instrument_instance_controller.instrumentinstance_delete_get,
);

// POST request to delete InstrumentInstance.
router.post(
  "/instrumentinstance/:id/delete",
  instrument_instance_controller.instrumentinstance_delete_post,
);

// GET request to update InstrumentInstance.
router.get(
  "/instrumentinstance/:id/update",
  instrument_instance_controller.instrumentinstance_update_get,
);

// POST request to update InstrumentInstance.
router.post(
  "/instrumentinstance/:id/update",
  instrument_instance_controller.instrumentinstance_update_post,
);

// GET request for one InstrumentInstance.
router.get("/instrumentinstance/:id", instrument_instance_controller.instrumentinstance_detail);

// GET request for list of all InstrumentInstance.
router.get("/instrumentinstances", instrument_instance_controller.instrumentinstance_list);

module.exports = router;
