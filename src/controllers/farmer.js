import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import configuration from '../config/config.json';
const Farmer  = require("../models/farmer");
export default{
  signup: async (req, res, next) => {
	const farmer = new Farmer({
	  fullname: req.body.fullname,
	  email: req.body.email,
	  password: await bcrypt.hash(req.body.password, 10)	
	});
	farmer.save().then( (userData) => {
        const token = jwt.sign({ userId: userData._id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
        res.cookie('farmerid', userData._id, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.status(201).json({
          success: true,
          message: 'account successfully created',
          cookieUserid: res.cookie.farmerid,
          token: token,
          userData
        })
    })
    .catch((error) => {
			res.status(400).json({
			  error: error.message
			});
		});
  },
  getAll: (req, res, next) => {
	Farmer.find().then(
		(farmers) => {
			res.status(200).json(farmers);
		}
	).catch( (error) => {
		res.status(400).json({
			error: error.message
		});
	});
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
	Farmer.findOne({email}).then(
	  async (farmer) => {
        const match = await bcrypt.compare(password, farmer.password);
        if (!match) {
          return res.send({ 
            status: true,
            message: 'Login failed, check your password' });
        }
        // sign jwt and wrap in a cookie
        const token = jwt.sign({ userId: farmer._id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
        res.cookie('farmerid', farmer._id, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        return res.status(200).json({
          token: token, 
          farmer_id: farmer._id
        });
      })
      .catch(
		(error) => {
		  res.status(400).json({
			error: error.message
		  });
		}
    );
  },
}