
# Express Passport JWT SQL Authentication

This project was created to assist a friend from 42 school during a game hackathon. This is a backend component, developed using ExpressJS, PassportJS, SQL database, and bcrypt for password encryption. It is responsible for providing the necessary API endpoints and authentication mechanisms to support the game's functionality.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Authentication](#authentication)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)

## Features

- User registration and login using Passport.js with token authentication.
- Secure password storage using bcrypt.js.
- SQL database integration.
- Express.js server for handling HTTP requests and routing.

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone <repository_url> backend_project
   ```

2. Navigate to the project directory:

   ```shell
   cd backend-project
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Configure the necessary environment variables (see [Environment Variables](#environment-variables) section for details).

5. Start the development server:

   ```shell
   npm start
   ```

6. The server should now be running locally on the port you provided, or by default port 3000.



## Authentication

Token-based authentication is implemented using PassportJS. To authenticate and authorize requests to protected endpoints, follow these steps:

1. Register a new user account by making a `POST` request to `/auth/register` with the necessary user information.

2. Obtain an access token by making a `POST` request to `/auth/login` with valid user credentials.

3. Include the access token in the `Authorization` header of subsequent requests as follows:

   ```
   Authorization: Bearer <access_token>
   ```

   Replace `<access_token>` with the token obtained during the login process.

## Database Configuration

The backend project utilizes an SQL database to store and manage data. To configure the database connection, follow these steps:

1. Create an SQL database. The table name should be called `users`.

2. Configure the necessary environment variables (see [Environment Variables](#environment-variables) section for details).


## Environment Variables

The backend project utilizes environment variables for configuration. Before running the project, make sure to set the following environment variables in a `.env` file at the root of the project:

```plaintext
SECRETORKEY=<your_secret_key>
HOST=<database_host>
USER_DB=<database_user>
PASSWORD=<database_password>
DATABASE=<database_name>
PORT=<server_port>
```

- `SECRETORKEY`: Secret key used for token generation and verification.
- `HOST`: Hostname of the database server.
- `USER_DB`: Username for accessing the database.
- `PASSWORD`: Password for accessing the database.
- `DATABASE`: Name of the database to connect to.
- `PORT`: Port number on which the server should listen. If not provided, the server will default to port 3000.

Make sure to replace `<your_secret_key>`, `<database_host>`, `<database_user>`, `<database_password>`, `<database_name>`, and `<server_port>` with the appropriate values for your configuration.

_Note: The `.env` file containing sensitive information should be added to the project's `.gitignore` file to prevent it from being committed to version control and exposed publicly._