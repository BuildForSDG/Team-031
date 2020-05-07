import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import configuration from '../config/config.json';
const Farmer  = require("../models/farmer");
export default{
  signup: async (req, res, next) => {
	const farmer = new Farmer({
	  fullname: req.body.fullname,
	  email: req.body.email,
	  password: await bcrypt.hash(req.body.password, 10),
	  time: req.body.time		
	});
	farmer.save().then( (userData) => {
        const token = jwt.sign({ userId: userData.id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
        res.cookie('farmerid', userData._id, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.status(201).json({
          success: true,
          message: 'account successfully created',
          cookieUserid: res.cookie.userid,
          token: token,
          userData
        })
    })
    .catch((error) => {
			res.status(400).json({
			  error: error.message
			});
		});
    }
}