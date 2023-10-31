const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'карточка или пользователь не найден.' });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'на сервере произошла ошибка.' });
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};
module.exports.delCardId = (req, res, next) => {
  Card.findByIdAndRemove(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'карточка или пользователь не найден.' });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'на сервере произошла ошибка.' });
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  console.log(req.params.cardId);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  )
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      } else if (err.status === 404) {
        res.status(404).send({ message: 'карточка или пользователь не найден.' });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'на сервере произошла ошибка.' });
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => res.send(like))
    .catch((err) => {
      if (err.status === 400) {
        res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'карточка или пользователь не найден.' });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'на сервере произошла ошибка.' });
      } else {
        next(err);
      }
    });
};
