require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');


const app = express();


//  importing routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const imageRouter = require('./routes/imageRoutes');

// importing middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);

// using pre written middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));
app.use(cookieParser(process.env.JWT_SECRET));


app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/images', imageRouter);

// using custom middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

let server;
const start = async () => {
  try {
   server = app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log('Error Starting the server: ',error);
  }
};

const gracefulShutdown = async () => {
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown); // Handle Ctrl+C
process.on('SIGTERM', gracefulShutdown); // Handle termination signal

start();