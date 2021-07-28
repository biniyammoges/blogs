const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      minLength: [3, "Name can't be less than 3 characters"],
      maxLength: [50, "Name can't be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      minLength: [6, "Password should be at least 6 character"],
      required: [true, "Please add password"],
    },
    avatar: {
      type: String,
      default: "no-avatar.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "tester"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
    emailVerifyToken: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.genAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(20);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
