import validationHelpers from '../utilities/validationHelpers';
import { emailRegex, passwordRegex, } from '../utilities/regexen';

const { checkForEmptyFields, checkPatternedFields } = validationHelpers;

export default {
  auth: (req, res, next) => {
    const errors = [];
    const {
      fullname, email, password
    } = req.body;

    if (req.path.includes('signup')) {
      errors.push(...checkForEmptyFields('Full Name', fullname));
      errors.push(...checkForEmptyFields('Email', email));
    }
    errors.push(...checkPatternedFields('Email address', email, emailRegex));
    errors.push(...checkPatternedFields('Password', password, passwordRegex));

    if (errors.length) {
      return res.status(400).send({
        message: 'Your request contain errors',
        data: errors,
      });
    }
    return next();
  },
  product: (req, res, next) => {
    const errors = [];
    const { name,  imageurl} = req.body;

    errors.push(...checkForEmptyFields('Product name', name));
    errors.push(...checkForEmptyFields('Product image', imageurl));

    if (errors.length) {
      return res.status(400).send({
        message: 'Your request contain errors',
        data: errors,
      });
    }
    return next();
  },
  checkProductIdParams: (req, res, next) => {
    const { params: { productId } } = req;
    const parsedNumber = parseInt(productId, 10);
    const isInteger = Number.isInteger(parsedNumber);
    const isGreaterThanZero = parsedNumber > 0;

    if (isInteger && isGreaterThanZero) return next();
    return res.status(400).json('ID must be an integer greater than zero');
  },
};
