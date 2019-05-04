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

// Give full text search capabilities
recipeSchema.index(
    {
        title: 'text',
        ingredients: 'text',
        directions: 'text'
    },
    {
        weights: {
            ingredients: 10,
            title: 5
        }
    }
);

module.exports = mongoose.model('Recipe', recipeSchema);
