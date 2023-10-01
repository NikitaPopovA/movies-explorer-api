const router = require('express').Router();
const { signUpRegistrationValidation, signInloginValidation } = require('../middlewares/validators');
const { createNewUser } = require('../controllers/users');
const { login } = require('../controllers/login');

router.post('/signup', signUpRegistrationValidation, createNewUser);
router.post('/signin', signInloginValidation, login);

module.exports = router;
