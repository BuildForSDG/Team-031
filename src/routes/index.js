import farmer from '../controllers/farmer';
//import authenticator from '../middlewares/authenticator'

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Zero Humger API!',
  }));

  app.post('/api/v1/farmer/signup', farmer.signup); // API route for farmer to signup
  //app.post('/api/v1/farmer/login', Users.login); // API route for user to login
};