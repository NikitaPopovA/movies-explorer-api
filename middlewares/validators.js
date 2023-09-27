const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const validationError = require('../utils/errors/error-validation');

const isURLValid = (value) => {
  if (!validator.isURL(value)) {
    throw validationError;
  }
  return value;
};

module.exports.signUpRegistrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.signInloginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createMovieValidationSchema = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isURLValid),
    trailerLink: Joi.string().required().custom(isURLValid),
    thumbnail: Joi.string().required().custom(isURLValid),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidationSchema = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.updateProfileInfoValidationSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
});
