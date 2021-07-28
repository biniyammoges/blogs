const ErrorResponse = require("../utils/errorResponse");

const notFound = (req, res, next) => {
  next(
    new ErrorResponse(
      `Route not found - ${req.method} - ${req.originalUrl}`,
      404
    )
  );
};

const errorHanlder = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || "We are sorry, something wrong with server",
  });
};

module.exports = { errorHanlder, notFound };
