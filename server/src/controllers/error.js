const { jsonError } = require("../helpers/http");

const error_404 = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
};

const error_global_handler = (err, req, res, next) => {
  let message = err.message || 'Internal server error';
  // TODO: For future may need to add other envs.
  if (process.env.NODE_ENV === "dev") {
    message = err.stack;
  }
  // Todo: try to look at above and refactor
  jsonError(res, {
    message,
    statusCode: res.statusCode || 500,
  });
};


module.exports = {
  error_404,
  error_global_handler,
};