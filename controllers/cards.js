const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      if (!newCard) {
        return next(new NotFoundError('Объект не найден'));
      }
      return res.send({ data: newCard });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } next(err);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};
module.exports.delCardId = (req, res) => {
  Card.findByIdAndRemove(req.user._id)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { likes: req.params._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((like) => res.send(like))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.user._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => res.send(like))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};
