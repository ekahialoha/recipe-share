// ======================
// Recipe Schema/Model
// ======================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    directions: { type: String, required: true },
    owner: String,
    images: [String],
    credit: String,
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
