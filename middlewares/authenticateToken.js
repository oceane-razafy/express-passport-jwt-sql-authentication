// Express & Router packages
const express = require('express')
const router = express.Router()

// Export configuration data
const config = require('../config');

// Export database connection
const connection = require('../db');

// Packages for token-based authentication
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Token-based authentication process
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
	return res.json({ message: 'You are authorized to access this resource' });
});

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secretOrKey,
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
	// Check if id is in the datatabase
	const query = `SELECT * FROM users WHERE id = '${jwt_payload.sub}'`;
	connection.query(query, (error, results, fields) => {
		// Id is not in the database
		if (error) {
			console.log(error);
			return done(error, false, { message: 'Error processing authentication' });
		}
		// User is authenticated
		else if (results.length > 0) {
			return done(null, results[0]);
		}
	});
}));

module.exports = router;
