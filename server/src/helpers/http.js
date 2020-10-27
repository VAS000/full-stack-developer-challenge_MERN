/* Handle error codes as constant */

const jsonSuccess = (res, { data = null, message = null, statusCode } = {}) => {
  res.status(statusCode || 200);
  res.json({
    status: "success",
    data,
    message,
  });
}

const jsonError = (res, { message = null, statusCode } = {}) => {
  const code = statusCode || 500;
  res.status(code);
  res.json({
    status: "error",
    code: code,
    message: message || "Internal Server Error",
  });
}

const serverErrorHandler = (res, next) => {
  res.status(500);
  const error = Error('Server Error: please try again');
  next(error);
};

module.exports = {
  jsonSuccess,
  jsonError,
  serverErrorHandler,
};
