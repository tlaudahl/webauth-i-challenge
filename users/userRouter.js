const router = require('express').Router();

const Users = require('./userModel.js');


const requiresAuth = require('../auth/requiresAuth')

router.get('/', requiresAuth, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
