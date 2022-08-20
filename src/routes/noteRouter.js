const Router = require('express');
const router = new Router();
const controller = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', controller.createNote);

router.get('/', controller.getNotes);

router.get('/:id', controller.getNote);

router.put('/:id', controller.updateNote);

router.patch('/:id', controller.changeCompletenessOfNote);

router.delete('/:id', controller.deleteNote);

module.exports = router;
