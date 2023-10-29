const router = require('express').Router();
const { getUsers, getUsersId, createUser, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUsersId);
router.post('/', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;