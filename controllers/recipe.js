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
});

router.get('/new', (req, res) => {
    res.send('new');
});

router.post('/', (req, res) => {
    res.send('create');
});

router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render('recipe/view.ejs', {
            recipe: recipe
        });
    });
});

router.put('/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, recipeUpdated) => {
        console.log(recipeUpdated);
        res.redirect('/recipe');
    });
});

router.get('/:id/edit', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render('recipe/edit.ejs', {
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

module.exports = router;
