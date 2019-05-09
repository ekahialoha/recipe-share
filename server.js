// ======================
// Dependencies
// ======================
// use dotenv to import configs
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');

// ======================
// Initiate Application
// ======================
const app = express();

// ======================
// Configuration
// ======================
const PORT = process.env.PORT || 3000;
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
// Allows sessions for users to login
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
// Ensure EJS has access to variables and avoid having to pass them every render call
const ejsGlobals = require('./middleware/ejs.js');
app.use(ejsGlobals);

// ======================
// Database
// ======================
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
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
  res.redirect('/recipe');
});

const authController = require('./controllers/auth.js');
app.use('/auth', authController);

const userController = require('./controllers/user.js');
app.use('/user', userController);

const recipeController = require('./controllers/recipe.js');
app.use('/recipe', recipeController);
