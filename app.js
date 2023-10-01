require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const { PORT, DB_ADDRESS } = require('./utils/config/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.set('strictQuery', false);

mongoose.connect(DB_ADDRESS, () => {
  console.log('Успешное подключение к базе данных!');
});

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestLogger);

app.use('/', require('./routes/auth'));
app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));
app.use(require('./middlewares/handleNotFound'));

app.use(errorLogger);
app.use(errors());

app.use(require('./middlewares/errors'));

app.listen(PORT, () => {
  console.log(`Приложение запущено на порте ${PORT}!`);
});
