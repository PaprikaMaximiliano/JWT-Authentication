const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const noteRouter = require('./noteRouter');

router.use('/auth', authRouter);
router.use('/users', authMiddleware, userRouter);
router.use('/notes', authMiddleware, noteRouter);

module.exports = router;
