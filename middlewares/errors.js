const validationError = require('../utils/errors/error-validation');
const { ERROR_CODES_COMMON } = require('../utils/errors/constans');
const conflictError = require('../utils/errors/error-conflict');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
    return;
  }

  if (err.code === 11000) {
    res.status(conflictError.statusCode).send({
      message: conflictError.message,
    });
    return;
  }

  const { statusCode = ERROR_CODES_COMMON, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === ERROR_CODES_COMMON
        ? 'На сервере произошла ошибка'
        : message,
  });

  next();
};
