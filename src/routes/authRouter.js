const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');

router.post(
    '/register',
    check('username', 'Username cannot be empty'),
    check('password', 'Password cannot be less than 4 and more than 10 symbols').isLength({
        min: 4,
        max: 10
    }),
    controller.registration
);

router.post('/login', controller.login);
module.exports = router;
