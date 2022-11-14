const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError.js");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) {
    const err = new AppError("Please provide an Email and Password", 400);
    next(err);
    return;
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    const err = new AppError("Invalid email or password", 400);
    next(err);
    return;
  }

  // 3) If everything is ok send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and checking if it exists
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token === "") {
    const err = new AppError(
      "You are not logged in please login to make a post",
      401
    );
    next(err);
    return;
  }

  // 2) Verifying token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Checking if user exists
  const user = await User.findById(decoded.id);
  if (!user) {
    next(new AppError("User no longer exists", 401));
    return;
  }

  // 4) Check if user changed password since token was created
  const isPasswordChanged = user.changedPasswordAfter(decoded.iat);
  if (isPasswordChanged) {
    next(new AppError("Password recently changed. Please login again", 401));
    return;
  }

  // 5) Send request
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      const err = new AppError("You dont have access to this route", 401);
      next(err);
      return;
    }
    next();
  };
};
