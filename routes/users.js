const router = require('express').Router();
const {
  getUsers, getUsersId, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUsersId);
router.patch('/me', updateProfile);
router.get('/me', getProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
