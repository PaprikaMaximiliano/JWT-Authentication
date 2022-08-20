const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', controller.getUser);

router.delete('/me', controller.deleteUser);

router.patch('/me', controller.changePassword);

module.exports = router;
