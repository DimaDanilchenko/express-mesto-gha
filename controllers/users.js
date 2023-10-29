const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUsersId = (req, res) => {
  User.findById(req.params._id)
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, _id } = req.body;

  User.create({ name, about, avatar, _id })
    .then(user => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar
    }))
    .catch(err => res.status(500).send({ message: err.message }));
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое" }));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое" }));
};