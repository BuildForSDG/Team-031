import request from 'supertest';
const app = require('../src/app');

describe('Testing apis', () => {
  describe('Farmer authentication', () => {
    test('It should test signup', async (done) => {
      const user = {
        email: 'olajide@yahoo.com', 
        fullname: 'Hammed Olajide', 
        password: 'olajide',
      };
      const response = await request(app).post('/api/v1/farmer/signup').send(user);
      expect(response.body).toHaveProperty('userData');
      expect(response.statusCode).toBe(201);
      done();
    });

    test('It should test login', async (done) => {
      const user = {
        email: 'olajide@yahoo.com', 
        password: 'olajide',
      };
      const response = await request(app).post('/api/v1/farmer/login').send(user);
      expect(response.body).toHaveProperty('token');
      expect(response.statusCode).toBe(200);
      done();
    })
  })
})
