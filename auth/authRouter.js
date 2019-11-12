const router = require('express').Router();
const bcrypt = require('bcryptjs');


const Users = require('../users/userModel.js');

router.post('/register', (req, res) => {
    let user = req.body;

    const hashedPassword = bcrypt.hashSync(user.password, 12)
    user.password = hashedPassword;

    Users.add(user)
    .then(saved => {
        req.session.username = saved.username;
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username;
            res.status(200).json({ message: 'Logged In!' });
        } else {
        res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
    if(res.session) {
        res.session.destroy();
    } else {
        res.status(401).json({ error: "You are already logged out" })
    }
})

module.exports = router;
