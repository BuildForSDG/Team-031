import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'; // for accessing config in .env file
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const mongoose  = require("mongoose");
const logger = require('simple-node-logger').createSimpleLogger();
import routes from './routes';

dotenv.config();
// store the port number
const port = parseInt(process.env.PORT, 10) || 4500;
// set up express app
const app = express();

mongoose.connect("mongodb+srv://htolajide:olajide4me@cluster0-kpchb.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{
	logger.info("Successfully connected to MongoDB Atlas!");
  }).catch((error) => {
	  logger.info("Unable to connect to MongoDb Atlas!");
	  logger.info(error);
  });

// to resolve cross origin resource shearing (CORS) error add folowing to te response header 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
routes(app);
app.get('*', (req, res) => { res.end('Zero Hunger Backend!!!'); });
app.listen(port, () => logger.info(`Zero hunger ready at ${port}`));

module.exports = app;
