/* eslint-disable consistent-return */
const User = require('../models/user');
const NotFoundErrors = require('../errors/NotFoundError');
const ValidationError = require('../errors/BadRequestError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUsersId = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErrors('Пользователь не найден');
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Некорректный id пользователя'));
      }

      return next(err);
    });
};

module.exports.createUser = (req, res) => {
  const ERROR_CODE = 400;
  const {
    name, about, avatar, _id,
  } = req.body;

  User.create({
    name, about, avatar, _id,
  })
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
    });
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};
