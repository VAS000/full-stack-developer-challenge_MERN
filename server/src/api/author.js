const router = require('express').Router();

const authorController = require('../controllers/author');

router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getAuthor);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);


module.exports = router;