#! /usr/bin/env node

console.log(
    'This script populates some test instruments, categories, and instrumentinstances to your database.'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Instrument = require("./models/instrument");
  const Category = require("./models/category");
  const InstrumentInstance = require("./models/instrumentinstance");
  
  const instruments = [];
  const categories = [];
  const instrumentinstances = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createInstruments();
    await createInstrumentInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // inistruments[0] will always be the Trumpet instrument, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  };
  
  async function instrumentCreate(index, name, description, numInStock, category) {
    const instrumentdetail = {
      name: name,
      description: description,
      category: category,
      numInStock: numInStock,
    };
  
    const instrument = new Instrument(instrumentdetail);
    await instrument.save();
    instruments[index] = instrument;
    console.log(`Added instrument: ${name}`);
  }
  
  async function instrumentInstanceCreate(index, instrument, price, condition) {
    const instrumentinstancedetail = {
      instrument: instrument,
      price: price,
    };
    if (condition != false) instrumentinstancedetail.condition = condition;
  
    const instrumentinstance = new InstrumentInstance(instrumentinstancedetail);
    await instrumentinstance.save();
    instrumentinstances[index] = instrumentinstance;
    console.log(`Added instrumentinstance: ${instrumentinstance._id}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Brass", "A brass instrument is a musical instrument that produces sound by sympathetic vibration of air in a tubular resonator in sympathy with the vibration of the player's lips."),
      categoryCreate(1, "Percussion", "A percussion instrument is a musical instrument that is sounded by being struck or scraped by a beater including attached or enclosed beaters or rattles struck, scraped or rubbed by hand or struck against another similar instrument."),
      categoryCreate(2, "Strings", "String instruments, also known as chordophones, are musical instruments that produce sound when a performer vibrates the strings. They are usually made of wood and have heavy strings mounted on a hollow body."),
      categoryCreate(3, "Woodwinds", "Woodwind instruments are a family of musical instruments within the greater category of wind instruments."),
    ]);
  }
  
  async function createInstruments() {
    console.log("Adding Instruments");
    await Promise.all([
        instrumentCreate(0,
        "Trumpet",
        "The trumpet is a brass instrument commonly used in classical and jazz ensembles. The trumpet group ranges from the piccolo trumpet—with the highest register in the brass family—to the bass trumpet, pitched one octave below the standard B♭ or C trumpet.",
        0,
        [categories[0]]
      ),
      instrumentCreate(1,
        "Tuba",
        "The tuba is the largest and lowest-pitched musical instrument in the brass family. As with all brass instruments, the sound is produced by lip vibration – a buzz – into a mouthpiece.",
        0,
        [categories[0]],
      ),
      instrumentCreate(2,
        "Clarinet",
        "The clarinet is a single-reed musical instrument in the woodwind family, with a nearly cylindrical bore and a flared bell.",
        0,
        [categories[3]],
      ),
      instrumentCreate(3,
        "Flute",
        "The flute is a member of a family of musical instruments in the woodwind group. Like all woodwinds, flutes are aerophones, producing sound with a vibrating column of air.",
        0,
        [categories[3]]
      ),
      instrumentCreate(4,
        "Violin",
        "The violin, colloquially known as a fiddle,[a] is a wooden chordophone, and is the smallest, and thus highest-pitched instrument (soprano) in regular use in the violin family.",
        0,
        [categories[2]]
      ),
      instrumentCreate(5,
        "Drum Set",
        "The drum is a member of the percussion group of musical instruments. In the Hornbostel-Sachs classification system, it is a membranophone.",
        0,
        [categories[1]]
      ),
      instrumentCreate(6,
        "Piano",
        "The piano is a keyboard instrument that produces sound when its keys are depressed, through engagement of an action whose hammers strike strings. Modern pianos have a row of 88 black and white keys, tuned to a chromatic scale in equal temperament.",
        0,
        [categories[1], categories[2]]
      ),
    ]);
  }
  
  async function createInstrumentInstances() {
    console.log("Adding authors");
    await Promise.all([
      instrumentInstanceCreate(0, instruments[0], "$400", "New"),
      instrumentInstanceCreate(1, instruments[1], "$650", "New"),
      instrumentInstanceCreate(2, instruments[2], "$200", "Used - Fair"),
      instrumentInstanceCreate(3,
        instruments[3],
        "$375",
        "New",
      ),
      instrumentInstanceCreate(4,
        instruments[3],
        "$260",
        "Used - Good",
      ),
      instrumentInstanceCreate(5,
        instruments[3],
        "$225",
        "Used - Fair",
      ),
      instrumentInstanceCreate(6,
        instruments[4],
        "$550",
        "New",
      ),
      instrumentInstanceCreate(7,
        instruments[4],
        "$875",
        "New",
      ),
      instrumentInstanceCreate(8,
        instruments[4],
        "$295",
        "Used - Fair"
      ),
      instrumentInstanceCreate(9, instruments[0], "$740", "New"),
      instrumentInstanceCreate(10, instruments[1], "$290", "Used - Good"),
    ]);
  }