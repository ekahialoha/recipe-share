// ======================
// Initiate Express
// ======================
const express = require('express');
const router = express.Router();

// ======================
// Models
// ======================
const Recipe = require('../models/recipes.js');

// ======================
// Routes
// ======================
router.get('/', (req, res) => {
    Recipe.find({}, (err, foundRecipes) => {
        //res.send(foundRecipes);
        res.render('recipe/index.ejs', {
            recipes: foundRecipes
        });
    });
})

router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render('recipe/view.ejs', {
            recipe: recipe
        });
    });
});

router.get('/seed', (req, res) => {
    const Seed = require('../models/seeds/recipes.js');
    Recipe.create(Seed, (err, success) => {
        res.send('data seeded');
    });
});

router.post('/', (req, res) => {
    res.send('new');
});

router.delete('/', (req, res) => {
    res.send('new');
});

module.exports = router;
