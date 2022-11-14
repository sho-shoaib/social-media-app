const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function (val) {
        return validator.isAlphanumeric(val);
      },
      message: "A username can only contain letters and numbers (a-zA-Z0-9)",
    },
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    validate: {
      validator: function (val) {
        return validator.isEmail(val);
      },
      message: "Email is not valid",
    },
    trim: true,
    unique: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "A user must have a confirmPassword"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "ConfirmPassword does not match Password",
    },
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }
  next();
});

userSchema.methods.correctPassword = async (canditatePass, realPass) => {
  return await bcrypt.compare(canditatePass, realPass);
};

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
