const router = require('express').Router();

const bookController = require('../controllers/book');

router.get('/', bookController.getBooks);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.get('/:id', bookController.getBook);

module.exports = router;