const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/error-notFound');

exports.createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(201).send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      new NotFoundError('Такой пользователь не найден'),
    );
    res.status(200).send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfileInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(201).send({ email: user.email, name: user.name });
    })
    .catch((err) => next(err));
};
