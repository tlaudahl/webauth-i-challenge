const router = require('express').Router();
const bcrypt = require('bcryptjs');

const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/userRouter.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
    res.json({ api: "It's alive" });
});

router.post('/hash', (req, res) => {
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 12);
    res.status(200).json({ password, hash })
})

module.exports = router;
