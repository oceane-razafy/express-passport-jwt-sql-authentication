/* Note: to be able to connect your MySql database
create a .env file to be able to use the config.js file
Table name is "users"
*/

// Express package
const express = require('express');
const app = express();

// Test the server with serving files in a 'public' folder
// app.use(express.static('public'));

// CORS package
const cors = require("cors");
app.use(cors());

// Parse every json request to object variables
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Initialize the Passport library
const passport = require('passport');
app.use(passport.initialize());

// Route handlers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticateToken = require('./middlewares/authenticateToken');

// CRUD routes for the user (sign in, sign up)
app.use('/auth', authRoutes);

// Test for the token-based authentication
// app.use('/user', authenticateToken)

// Routes to use for user-based functionality
// app.use('/user', authenticateToken, userRoutes);


// Start the server on the correct port
app.listen(process.env.PORT || config.port, () => console.log("Server is listening...."));
