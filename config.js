// Access environment variables
require("dotenv").config()

module.exports = {
	// Secret for token
	secretOrKey: process.env.SECRETORKEY,
  
	// Configuration for MySql
	dbConfig: {
		host: process.env.HOST,
		user: process.env.USER_DB,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
	},

	// Server port
	port: 3000,
};