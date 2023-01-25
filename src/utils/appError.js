module.exports = class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

// createError = (message, statusCode) => {
//   const error = new Error(message);
//   error.statusCode = statusCode;
//   throw error;
// };
