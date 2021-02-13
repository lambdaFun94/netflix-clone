import mongoose from "mongoose";
import "colors";

export default async function connectDB() {
  let mongoURI = process.env.MONGO_DEV_URI;
  process.env.NODE_ENV === "production" && process.env.MONGO_PROD_URI;

  try {
    const { connection } = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `Connected to DB: ${connection._connectionString}`.underline.red.dim
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
