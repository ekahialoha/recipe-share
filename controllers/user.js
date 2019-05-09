// ======================
// Initiate Express
// ======================
const express = require('express');
const router = express.Router();

// ======================
// Models
// ======================
const User = require('../models/users.js');
const Recipe = require('../models/recipes.js');

// ======================
// Middleware
// ======================
const checkAuth = require('../middleware/check-auth.js');

router.get('/my-list', checkAuth, (req, res) => {
    User.findById(req.session.user._id).populate('list').exec((err, user) => {
        res.render('user/list.ejs', {
            list: user.list
        });
    })
});

router.get('/my-list/:id', checkAuth, (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        User.findById(req.session.user._id, (err, user) => {
            // Ensure not already in list
            if (!user.list.includes(recipe._id.toString())) {
                user.list.push(recipe._id);
                user.save((err, updatedUser) => {
                    req.session.user = updatedUser;
                    req.session.save();
                });
            }
        });
    });
    res.redirect(`/recipe/${req.params.id}`);
});


router.delete('/my-list/:id/:fromList?', checkAuth, (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        User.findById(req.session.user._id, (err, user) => {
            // Remove from user's list
            user.list = user.list.filter((existingList) => {
                return existingList.toString() !== recipe._id.toString();
            });
            user.save((err, updatedUser) => {
                req.session.user = updatedUser;
                req.session.save();
            });

            if(req.params.fromList) {
                res.redirect('/user/my-list');
            } else {
                res.redirect(`/recipe/${req.params.id}`);
            }
        });
    });
});

module.exports = router;
