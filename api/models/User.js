import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Please provide a password"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  profilePicture: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
});

// Encrypt password with bcrypt & generate profile picture
UserSchema.pre("save", async function (next) {
  !this.isModified("password") && next();
  this.password = await bcrypt.hash(this.password, 10);
  this.profilePicture = String(Math.floor(Math.random() * 5));
});

UserSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Generate JWT
UserSchema.methods.generateSignedJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

const User = mongoose.model("User", UserSchema);
export default User;
