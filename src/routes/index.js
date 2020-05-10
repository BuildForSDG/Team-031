import farmer from '../controllers/farmer';
import authenticator from '../middlewares/authenticator'
import validator from '../middlewares/validator';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Zero Humger API!',
  }));

  app.post('/api/v1/farmer/signup', validator.auth, farmer.signup); // API route for farmer to signup
  app.post('/api/v1/farmer/login', validator.auth, farmer.login); // API route for farmer to login
  app.patch('/api/v1/farmer/reset/password', validator.auth, farmer.resetPassword); // API route for farmer reset password
  app.get('/api/v1/farmers', authenticator, farmer.getAll); // Api route for listing farmers
  app.delete('/api/v1/farmer/all/delete', farmer.deleteAll); // API route for user to login
};