const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/error-notFound');
const ForbiddenError = require('../utils/errors/error-forbidden');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner,
    });

    res.status(201).send(movie);
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id).orFail(
      new NotFoundError('Фильм не найден по указанному идентификатору'),
    );

    if (`${movie.owner}` !== req.user._id) {
      throw new ForbiddenError('Этот фильм не принадлежит вам, поэтому удаление невозможно');
    }

    await Movie.findByIdAndRemove(req.params._id).orFail(
      new NotFoundError('Фильм не найден по указанному идентификатору'),
    );

    res.send({ message: 'Фильм успешно удален' });
  } catch (err) {
    next(err);
  }
};
