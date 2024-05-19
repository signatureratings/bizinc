# Backend Service

the backend service is in folder Backend

## Getting Started

To get started, follow these steps:

1. Install dependencies: `npm install`
2. Create a .env file is the folder Backend `Backend/.env`
3. Set the variables mentioned below. change the database values accordingly
```
PORT=3200
DB_USER="sairam"
DB_HOST="localhost"
DB_DATABASE="bizinc"
DB_PASSWORD="sairam"
DB_PORT="5432"
JWT_SECRET="sairam"
SECRET_KEY="sairam"
```
4. make sure you have downloaded the postgresql before running the next script. run the script to isntall the tables in the database from the Backend folder
`node Database/checkDB.js`
5. if the result says database checked then all the tables are created in the DB
6. Start the server: `npm start`

The server will start on `http://localhost:3200`.

# Authentication

Used Json web tokens for authentication where accesstoken and refreshtokens are created when user is logged in and they are stored in the client side when ever a request is made it attaches those token on the headers and we get those token and decrypt it to know the person i use a simple decryption secret but for production i can be a assymetric encryption or symmetric encryption with secret key being a large file. when accesstoken expires it gets the value from refreshtoken and verifies in DB and then generates new accesstoken

# API Endpoints

## Authentication

- `POST /login`: Log in a user. The request body should be a JSON object with `email` and `password` properties.
- `POST /register`: Register a new user. The request body should be a JSON object with `email`, `name` and `password`
- `POST /logout`: Log out the current user. This endpoint requires authentication from headers.

## Images

- `GET /images`: Fetch all images. This endpoint requires authentication.
- `GET /images/:id`: Fetch a single image by its ID. This endpoint requires authentication.
- `POST /image`: Create a new image. The request body should be a JSON object with `title`, `description`, and `image` properties. This endpoint  requires authentication.
- `PUT /image/:id`: Update an existing image. The request body should be a JSON object with the properties you want to update. This endpoint requires authentication.
- `DELETE /image/:id`: Delete an existing image. This endpoint requires authentication.

# Tech Stack

## Backend

1. ExpressJS
2. pg
3. express-fileupload
4. cors

## Frontend

1. Nextjs

# Frontend Service

the  Frontend service is in folder frontend

## Getting Started

To get started, follow these steps:

1. Install dependencies: `npm install`
2. Start the server : `npm run dev` or else build and start the main file

you can access the server at `http://localhost:3000`
