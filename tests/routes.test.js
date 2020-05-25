import request from 'supertest';
const logger = require('simple-node-logger').createSimpleLogger();
const app = require('../src/app');

describe('Testing apis', () => {
  describe('Farmer authentication', () => {
    test('It should test signup', async (done) => {
      const user = {
        email: 'htolajide@yahoo.com', 
        fullname: 'Hammed kabiru', 
        password: 'olajide4me',
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
    test('It should test farmer profile edit', async (done) => {
      const user = {
        email: 'htolajide@yahoo.com', 
        fullname: 'Hammed kabiru', 
        password: 'olajide4me',
      };
      try{
        const response = await request(app).put('/api/v1/farmer/profile/edit').send(user);
        if(response.statusCode !== 201){
          expect(response.body).toHaveProperty('message');
          expect(response.statusCode).toBe(401);
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
      const user = {
        email: 'htolajide@yahoo.com',
        password: 'olajide4real'
      };
      const response = await request(app).patch('/api/v1/farmer/reset/password').send(user);
      expect(response.statusCode).toBe(201);
      done();
    });
  })
  describe('Buyer APIs', () => {
    test('It should test signup', async (done) => {
      const user = {
        email: 'htolajide@yahoo.com', 
        fullname: 'Hammed kabiru', 
        password: 'olajide4me',
      };
      try{
        const response = await request(app).post('/api/v1/buyer/signup').send(user);
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
    test('It should test buyer profile edit', async (done) => {
      const user = {
        email: 'htolajide@yahoo.com', 
        fullname: 'Hammed kabiru', 
        password: 'olajide4me',
      };
      try{
        const response = await request(app).put('/api/v1/buyer/profile/edit').send(user);
        if(response.statusCode !== 201){
          expect(response.body).toHaveProperty('message');
          expect(response.statusCode).toBe(401);
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
        password: 'olajide4real',
      };
      try{
        const response = await request(app).post('/api/v1/buyer/login').send(user);
        expect(response.body).toHaveProperty('token');
        expect(response.statusCode).toBe(200);
        done();
      }catch(error){
        logger.error(error.message);
      }
    });
    test('It should test password reset', async done => {
      const user = {
        email: 'htolajide@yahoo.com',
        password: 'olajide4real'
      };
      const response = await request(app).patch('/api/v1/buyer/reset/password').send(user);
      expect(response.statusCode).toBe(201);
      done();
    });
    test('Should list of buyers', async (done) => {
      const response = await request(app).get('/api/v1/buyers');
      expect(response.statusCode).toBe(200);
      done();
    });
    test('Should get buyer products', async (done) => {
      const response = await request(app).get('/api/v1/buyer/products');
      if(response.statusCode !== 200){
        expect(response.body.message).toBe('You have not been authenticated!');
        expect(response.statusCode).toBe(401);
      }else{
          expect(response.statusCode).toBe(200);
      }
      done();
    });
    test('It should test buyer buy product', async done => {
      const user = {
        name: 'Beans',
        unit: 'Bags',
        quantity: 5,
        price: 17500,
        farmerid: '5eb80f484b7bfb49a8ba45f4'
      };
      const response = await request(app).post('/api/v1/buyer/product/buy').send(user);
      if(response.statusCode !== 201){
        expect(response.body.message).toBe('You have not been authenticated!');
        expect(response.statusCode).toBe(401);
      }else{
          expect(response.statusCode).toBe(201);
      }
      done();
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
        name: 'beans',
        unit: 'bags',
        quantity: 50,
        price: 16500
      }
      const response = await request(app).post('/api/v1/farmer/product/add').send(product);
      if(response.statusCode !== 201){
        expect(response.body).toHaveProperty('message');
        expect(response.statusCode).toBe(401);
      }else{
        expect(response.statusCode).toBe(201);
      }
      done();
    })

    test('Should test farmer edit product', async (done) => {
      try{
        const product = {
          name: 'beans',
          unit: 'bag',
          quantity: 50,
          price: 17500
        }
        const product_id = 'eb806670265aa310c864fde';
        const response = await request(app).patch(`/api/v1/farmer/product/${product_id}/edit`).send(product);
        if(response.statusCode !== 201){
          expect(response.body).toHaveProperty('message');
          expect(response.statusCode).toBe(401);
          }else{
            expect(response.statusCode).toBe(201);
          }
          done();
      }catch(error){
        logger.error(error.message)
      }
    })
    test('Should return farmer products', async (done) => {
      const response = await request(app).get('/api/v1/farmer/products');
      if(response.statusCode !== 200){
        expect(response.body.message).toBe('You have not been authenticated!');
        expect(response.statusCode).toBe(401);
      }else{
          expect(response.statusCode).toBe(200);
      }
      done();
    })
    test('Should return stock', async (done) => {
      const response = await request(app).get('/api/v1/show/products');
      expect(response.statusCode).toBe(200);
      done();
    })
    test('Should return list of farmers', async (done) => {
      const response = await request(app).get('/api/v1/farmers/');
      expect(response.statusCode).toBe(200);
      done();
    })
    test('Should return farmer sales', async (done) => {
      const response = await request(app).get('/api/v1/farmer/sales');
      if(response.statusCode !== 200){
        expect(response.body.message).toBe('You have not been authenticated!');
        expect(response.statusCode).toBe(401);
      }else{
          expect(response.statusCode).toBe(200);
      }
      done();
    })
  })
  describe("Product Api", () => {
    test('Should test product addition', async (done) => {
      const name = {
        name: 'Yam'
      }
      const response = await request(app).post('/api/v1/product/add').send(name);
      if(response.statusCode !== 201){
        expect(response.body.message).toBe('Product already exists');
        expect(response.statusCode).toBe(400);
        }else{
          expect(response.statusCode).toBe(201);
        }
        done();
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
        name: 'Pcs'
      }
      const response = await request(app).post('/api/v1/unit/add').send(name);
      if(response.statusCode !== 201){
        expect(response.body.message).toBe('Unit already exists');
        expect(response.statusCode).toBe(400);
      }else{
          expect(response.statusCode).toBe(201);
      }
      done();
    })
    test('Should return list of units', async (done) => {
      const response = await request(app).get('/api/v1/units');
      expect(response.statusCode).toBe(200);
      done();
    })
    test('Should return list of sellers by product', async (done) => {
      const city = 'Lagos', product = 'Beans';
      const response = await request(app).get(`/api/v1/${city}/${product}/sellers`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body).toHaveProperty('result');
      done();
    })
  })
})
