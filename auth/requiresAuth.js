const Users = require('../users/userModel');
const bcrypt = require('bcryptjs');



module.exports = (req, res, next) => {
    if(req.session && req.session.username) {
        next();
    } else {
        res.status(401).json({ error: "Please login" })
    }
}