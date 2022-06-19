import request from 'supertest';
import { app } from '../app';

describe('#test express app', () => {
  let server = app.listen(3000);
  describe('#test server', () => {
    it('#test GET /', async () => {
      await request(server).get('/').expect(200, 'Hello world！');
    });

    it('#test GET /login', async () => {
      await request(server).get('/login').redirects(2).expect(200);
    });

    it('#test GET /product', async () => {
      await request(server).get('/product').expect(200, {
        msg: 'add success'
      });
    });
  });
});
