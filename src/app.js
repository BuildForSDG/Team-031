import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'; // for accessing config in .env file
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import connectDB from './config/mongoConnect';

dotenv.config();

// set up express app
const app = express();

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
connectDB();

routes(app);
app.get('*', (req, res) => { res.end('Zero Hunger Backend!!!'); });
//app.listen(port, () => logger.info(`Zero hunger ready at ${port}`));

module.exports = app;
