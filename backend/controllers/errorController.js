const AppError = require("../utils/AppError");

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error: ", err);
    res.status(500).json({
      status: "error",
      message: "Something went really wrong",
    });
  }
};

const handleCastError = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateFields = (err) => {
  const errorAt = Object.keys(err.keyValue)[0];
  return new AppError(
    `Duplicate field: ${errorAt}, value: ${err.keyValue[errorAt]}. Please use another value`,
    400
  );
};

const handleValidation = (err) => {
  return new AppError(
    `Invalid Input data. ${Object.values(err.errors)[0].properties.message}`,
    400
  );
};

const handleInvalidToken = () => {
  return new AppError("Invalid token. Please login again", 401);
};

const handleExpiredToken = () => {
  return new AppError("Token Expired. Please login again", 401);
};

const globalErrorhandle = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);

    if (error.name === "CastError") {
      error = handleCastError(error);
    } else if (error.code === 11000) {
      error = handleDuplicateFields(error);
    } else if (error._message === "Validation failed") {
      error = handleValidation(error);
    } else if (error.name === "JsonWebTokenError") {
      error = handleInvalidToken();
    } else if (error.name === "TokenExpiredError") {
      error = handleExpiredToken();
    }

    sendErrProd(error, res);
  }
};

module.exports = globalErrorhandle;
