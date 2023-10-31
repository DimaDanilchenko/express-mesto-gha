const router = require('express').Router();
const {
  getCards, delCardId, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.post('/:_id', delCardId);
router.put('/:cardId/likes', likeCard);
router.put('/:cardId/likes', dislikeCard);

module.exports = router;
