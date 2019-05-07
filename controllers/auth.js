// ======================
// Initiate Express
// ======================
const express = require('express');
const router = express.Router();


// ======================
// Dependencies
// ======================
const bcrypt = require('bcrypt');

// ======================
// Models
// ======================
const User = require('../models/users.js');

// ======================
// Routes
// ======================
router.get('/register', (req, res) => {
    res.render('auth/register.ejs');
});

router.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, newUser) => {
        if(err) {
            console.log(err);
        } else {
            console.log(newUser);
        }

        // Sign user in after completing registration
        req.session.user = newUser;
        res.redirect('/recipe');
    });
});

router.get('/login', (req, res) => {
    res.render('auth/login.ejs');
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
            res.render('auth/login.ejs', {
                error: true
            });
        } else {
            req.session.user = foundUser;
            res.redirect('/recipe');
        }
    });
});

router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/recipe');
    });
});

module.exports = router;
