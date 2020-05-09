import farmer from '../controllers/farmer';
import authenticator from '../middlewares/authenticator'
import validator from '../middlewares/validator';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Zero Humger API!',
  }));

  app.post('/api/v1/farmer/signup', validator.auth, farmer.signup); // API route for farmer to signup
  app.post('/api/v1/farmer/login', validator.auth, farmer.login); // API route for user to login
  app.get('/api/v1/farmers', authenticator, farmer.getAll);
};