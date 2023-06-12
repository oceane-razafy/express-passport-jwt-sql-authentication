/////////////// DATABASE CONFIGURATION //////////////

// MySQL package
const mysql = require('mysql');

// Import configuration for MySql database
const config = require('./config');

// Connect to the database
const connection = mysql.createConnection(config.dbConfig);

// Check if you are properly connected to the database
connection.connect(error => {
	if (!error) {
		console.log("SUCCESS: Connected to Database");
	} else {
		console.log("ERROR: Connection to Database Failed");
	}
})

module.exports = connection;