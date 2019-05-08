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

router.get('/my-list', (req, res) => {
    User.findById(req.session.user._id).populate('list').exec((err, lists) => {
        res.send(lists);
    })
});

router.get('/my-list/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        User.findById(req.session.user._id, (err, user) => {
            // Ensure not already in list
            if (!user.list.includes(recipe._id.toString())) {
                user.list.push(recipe._id);
                user.save((err, updatedUser) => {
                    console.log(updatedUser);
                    req.session.user = updatedUser;
                    req.session.save();
                });
            }
        });
    });
    res.redirect(`/recipe/${req.params.id}`);
});


router.delete('/my-list/:id', (req, res) => {
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
            res.redirect('/user/my-list')
        });
    });
});

module.exports = router;
