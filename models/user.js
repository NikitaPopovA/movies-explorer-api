const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: [true, 'Поле "email" обязательно для заполнения'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    require: [true, 'Поле "password" обязательно для заполнения'],
    select: false,
  },
  name: {
    type: String,
    require: [true, 'Поле "name" обязательно для заполнения'],
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
