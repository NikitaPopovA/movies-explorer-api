const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidationSchema, deleteMovieValidationSchema } = require('../middlewares/validators');

router.get('/', getMovies);
router.post('/', createMovieValidationSchema, createMovie);
router.delete('/:_id', deleteMovieValidationSchema, deleteMovie);

module.exports = router;
