const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
// Слушаем 3000 порт
const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', require('./routes/users'));
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});