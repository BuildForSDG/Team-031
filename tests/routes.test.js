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
        email: 'htolajide@yahoo.com', 
        password: 'olajide4me',
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
  describe("Tests Location api", () => {
    test('Should return location object', async (done) => {
      const response = await request(app).get('/api/v1/user/location');
      expect(response.statusCode).toBe(200);
      done();
    })
  })

  describe("Tests Farmer Products", () => {
    test('Should test farmer add product', async (done) => {
      const product = {
        name: 'rice',
        unit: 'bag',
        quantity: 50,
        price: 16500
      }
      const response = await request(app).post('/api/v1/farmer/product/add').send(product);
      expect(response.statusCode).toBe(201);
      done();
    })

    test('Should test farmer edit product', async (done) => {
      const product = {
        name: 'rice',
        unit: 'bag',
        quantity: 50,
        price: 17500
      }
      const product_id = 'eb806670265aa310c864fde';
      const response = await request(app).patch(`/api/v1/farmer/product/${product_id}/edit`).send(product);
      expect(response.statusCode).toBe(201);
      done();
    })
  })
  describe("Product Api", () => {
    test('Should test product addition', async (done) => {
      const name = {
        name: 'corn'
      }
      const response = await request(app).post('/api/v1/product/add').send(name);
      expect(response.statusCode).toBe(201);
      done();
    })
    test('Should return list of products', async (done) => {
      const response = await request(app).get('/api/v1/products');
      expect(response.statusCode).toBe(200);
      done();
    })
  })
  describe("Unit Api", () => {
    test('Should test unit addition', async (done) => {
      const name = {
        name: 'basket'
      }
      const response = await request(app).post('/api/v1/unit/add').send(name);
      expect(response.statusCode).toBe(201);
      done();
    })
    test('Should return list of units', async (done) => {
      const response = await request(app).get('/api/v1/units');
      expect(response.statusCode).toBe(200);
      done();
    })
  })
})
