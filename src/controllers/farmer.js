import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import configuration from '../config/config.json';
import sendEmail from '../config/emailer'
const Farmer  = require("../models/farmer");
export default{
  signup: async (req, res) => {
    const {fullname, email, password } = req.body;
	const farmer = new Farmer({
        fullname: fullname,
        email: email,
        password: await bcrypt.hash(password, 10)	
    });
    Farmer.findOne({email: email}).then( (result) => {
        if (result){
            return res.status(403).json({status: 'Request Failed', message: "Email already exists"})
        }
        farmer.save().then( (userData) => {
            const token = jwt.sign({ userId: userData._id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
            res.cookie('farmerid', userData._id, { expires: new Date(Date.now() + 3600000), httpOnly: true });
            res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
            res.status(201).json({
            status: 'Success',
            message: 'account successfully created',
            cookieUserid: res.cookie.farmerid,
            token: token,
            userData
            })
            sendEmail(userData.email);
        })
        .catch((error) => {
            res.status(400).json({
                 error: error.message
            });
        });
    })
  },
  getAll: (req, res, ) => {
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
  login: (req, res) => {
    const { email, password } = req.body;
	Farmer.findOne({email}).then(
        async (farmer) => {
            if (!farmer)
            return res.status(404).json({status: 'Request failed', message: 'Email is not recognized'});
            const match = await bcrypt.compare(password, farmer.password);
            if (!match) {
                return res.status(401).send({ 
                    status: "Request failed",
                    message: 'Login failed, check your password'
                });
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
	});
  },
  resetPassword: (req, res) => {
	const { email, password} =  req.body;
	Farmer.findOne({email: email}).then(
		async (result) => {
            if (!result) 
            return res.status(200).json({status: 'Failed', message: "Email not recognized"});
            Farmer.updateOne({email: email}, {password: await bcrypt.hash(password, 10)}).then( 
                () => {
                    res.status(201).json({
                        message: "Password successfully reset!"
                    });
                }
            )}       
    ).catch(
		(error) => {
			res.status(400).json({
				error: error.message
			});
		}
    );
  },
  deleteAll: (req, res) => {
	Farmer.deleteMany().then(
		() => {
			res.status(200).json({
				message: "Farmers deleted successfully!"
			});
        })
        .catch((error) => {
			res.status(400).json({
				error: error.message
			});
		}
	);
  },
}