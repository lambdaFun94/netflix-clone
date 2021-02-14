import Movie from "../models/Movie.js";
import User from "../models/User.js";
import { filmDataForSeeding } from "./filmDataForSeeding.js";
import { userDataForSeeding } from "./userDataForSeeding.js";

import connectDB from "../config/db.js";
connectDB();

const deleteData = async () => {
  try {
    await Movie.deleteMany();
    await User.deleteMany();
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
    await Movie.insertMany(filmDataForSeeding);
    await User.deleteMany();
    await User.insertMany(userDataForSeeding);

    console.log(`Database successfully seeded`.green.inverse);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Command line arguments
process.argv[2] === "-d" ? deleteData() : importData();
