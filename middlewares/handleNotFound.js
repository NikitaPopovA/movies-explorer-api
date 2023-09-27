const NotFoundError = require('../utils/errors/error-notFound');

module.exports = () => {
  throw new NotFoundError('Не удалось найти указанный путь!');
};
