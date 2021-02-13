import Movie from "../models/Movie.js";
import { dataForSeeding } from "./dataForSeeding.js";

import connectDB from "../config/db.js";
connectDB();

const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log(`Data destroyed`.red.inverse);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Movie.deleteMany();
    await Movie.insertMany(dataForSeeding);
    console.log(`Database successfully seeded`.green.inverse);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Command line arguments
process.argv[2] === "-d" ? deleteData() : importData();
