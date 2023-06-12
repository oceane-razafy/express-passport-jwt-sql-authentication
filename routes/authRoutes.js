// Express & Router packages
const express = require('express')
const router = express.Router()

// Export configuration data
const config = require('../config');

// Export database connection
const connection = require('../db');

// Package to crypt password
var bcrypt = require('bcryptjs');

// Package to create the token
const jwt = require('jsonwebtoken');


//////////////////////////// REGISTER ///////////////////////////////////

// Middleware function to check if user already exists in database
function userExists(req, res, next) {
	const { email, password } = req.body;

	connection.query('SELECT * FROM users WHERE email = ? ', [email], function(error, results, fields) {
		if (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		} else if (results.length) {
			console.log("User already exists in the database");
			res.status(409).json({ message: 'User already exists in the database' });
		/* if user does not exist, continue with the callback function
		to insert the new user into the database */
		} else if (results.length == 0) {
			next();
		}
	});
}

// Insert new user into the database with its hashed password
router.post('/register', userExists, (req,res) => {
	const { email, password } = req.body;

	// Function to create the salt
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error' });
		}
		// Use the salt to finalize the hash process
		bcrypt.hash(password, salt, function(err, hash) {
			if (err) {
				// Error while hashing
				console.log(err);
				res.status(500).json({ message: 'Internal Server Error' });
			} else {
				// Insertion of the email and the hashed password into the database
				const query = `INSERT INTO users (email, password) VALUES ('${email}', '${hash}')`;
				connection.query(query, (err, result) => {
					if (err) {
						console.log(err);
						res.status(500).json({ message: 'Internal Server Error' });
					// Insertion of new user successful
					} else {
						res.status(200).json({ message: 'Insertion of new user successful' });
					}
				})
			}
		});
	});
});


/////////////////////////// LOGIN ////////////////////////

router.post('/login', (req, res) => {
	const { email, password } = req.body;

	// Check if email is in the database
	const query = `SELECT * FROM users WHERE email = '${email}'`;
	connection.query(query, (error, results, fields) => {
		if (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
		// Email not found in the database
		else if (results.length == 0) {
			console.log("Invalid email provided");
			res.status(401).json({ message: 'Invalid email provided' });
		}
		// Comparison of password provided and password in the database
		else if (results.length > 0) {
			bcrypt.compare(password, results[0].password)
			.then((passwordsMatch) => {
				if (!passwordsMatch) {
					console.log("Invalid password provided");
					return res.status(401).json({ message: 'Invalid password provided' });
				}
				// Creation of the token
				const payload = { sub: results[0].id };
				const token = jwt.sign(payload, config.secretOrKey);
				res.json({ token });
				})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ message: 'Internal Server Error' });
			});
		}
	});
});

module.exports = router;
