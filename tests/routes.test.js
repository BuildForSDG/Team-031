import request from 'supertest';
const logger = require('simple-node-logger').createSimpleLogger();
const app = require('../src/app');

describe('Testing apis', () => {
  describe('Farmer authentication', () => {
    test('It should test signup', async (done) => {
      const user = {
        email: 'kabiru@yahoo.com', 
        fullname: 'Hammed kabiru', 
        password: 'olajide',
      };
      try{
        const response = await request(app).post('/api/v1/farmer/signup').send(user);
        if(response.statusCode !== 201){
        expect(response.body).toHaveProperty('message');
        expect(response.statusCode).toBe(403);
        }else{
          expect(response.statusCode).toBe(201);
        }
        done();
      }catch(error){
        logger.error(error.message);
      }
    });
    test('It should test login', async (done) => {
      const user = {
        email: 'olajide@yahoo.com', 
        password: 'olajide4real',
      };
      try{
        const response = await request(app).post('/api/v1/farmer/login').send(user);
        expect(response.body).toHaveProperty('token');
        expect(response.statusCode).toBe(200);
        done();
      }catch(error){
        logger.error(error.message);
      }
    });
    test('It should test password reset', async done => {
      try{
        const user = {
          email: 'olajide@yahoo.com',
          password: 'olajide4real'
        };
        const response = await request(app).patch('/api/v1/farmer/reset/password').send(user);
        expect(response.statusCode).toBe(201);
        done();
      }catch(error){
        logger.error(error.message);
      }
    });
  })
})
