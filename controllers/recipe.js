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
router.get('/seed', (req, res) => {
    const Seed = require('../models/seeds/recipes.js');
    Recipe.create(Seed, (err, success) => {
        res.send('data seeded');
    });
});

router.get('/', (req, res) => {
    Recipe.find({}, {}, {
        sort: {
            createdAt: -1
        },
        limit: 10
    }, (err, foundRecipes) => {
        //res.send(foundRecipes);
        res.render('recipe/index.ejs', {
            recipes: foundRecipes
        });
    });
});

router.get('/new', (req, res) => {
    res.render('recipe/new.ejs');
});

router.post('/', (req, res) => {
    Recipe.create(req.body, (err, createdRecipe) => {
        res.redirect('/recipe');
    });
});

router.get('/search', (req, res) => {
    Recipe.find(
        { $text: { $search: req.query.q } },
        { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .exec((err, foundRecipes) => {
        res.render('recipe/search.ejs', {
            results: foundRecipes
        });
    });
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

router.delete('/:id', (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, recipeDelete) => {
        res.redirect('/recipe');
    });
});

module.exports = router;
