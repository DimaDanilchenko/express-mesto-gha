const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');


app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  req.user = {
    _id: '653d0abcecd62711574ed80b' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});


// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});