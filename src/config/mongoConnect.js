import mongoose from 'mongoose';
const logger = require('simple-node-logger').createSimpleLogger();

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://htolajide:olajide4me@cluster0-kpchb.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() =>{
        logger.info("Successfully connected to MongoDB Atlas!");
      }).catch((error) => {
        logger.error("Unable to connect to MongoDb Atlas!");
        logger.error(error.message);
      });
    }
module.exports = connectDB;