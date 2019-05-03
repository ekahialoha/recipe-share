// ======================
// Dependencies
// ======================
// use dotenv to import configs
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// ======================
// Initiate Application
// ======================
const app = express();

// ======================
// Configuration
// ======================
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// ======================
// Middleware
// ======================
// Allows to use PUT, DELETE, PATCH methods via ?_method in URL
app.use(methodOverride('_method'));
// Parses info from POST HTTP methods into object
app.use(express.urlencoded({ extended: true }));
// Allow static files to be served client js, css, images, etc
app.use(express.static('public'));

// ======================
// Database
// ======================
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('MONGO DATABASE: Connection successful.');
});

// ======================
// Application Listener
// ======================
app.listen(PORT, () => {
    console.log(`APPLICATION: Listening on port ${PORT}.`);
});

// ======================
// Routes/Controllers
// ======================
app.get('/', (req, res) => {
  res.send('index');
});

const recipeController = require('./controllers/recipe.js');
app.use('/recipe', recipeController);
