const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
  // console.log(req.user._id); // _id станет доступен
};
module.exports.delCardId = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка валидации');
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((like) => res.send(like))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => res.send(like))
    .catch((err) => res.status(500).send({ message: err.message }));
};
