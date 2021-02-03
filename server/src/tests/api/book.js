const mongoose = require('mongoose');
const db =  require('../configs/db');
const app = require('../../app');
const request = require('supertest')(app);

const Book = require('../../models/book');

const dummyBook = {
  name: 'Dummy book',
  ISBN: '788-4-11-144410-0',
  author: null,
}

describe('Books', () => {

  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  
  describe('/GET books', () => {
    test('it should GET empty books array', async () => {
      const res = await request.get('/api/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBeNull();
      expect(Array.isArray(res.body.data)).toBeTruthy();

    });

    test('it should INSERT & GET One Book', async () => {

      const book = await new Book(dummyBook);
      await book.save();

      const res = await request.get('/api/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBeNull();
      expect(Array.isArray(res.body.data)).toBeTruthy();

      expect(res.body.data).toHaveLength(1);
			expect(mongoose.Types.ObjectId.isValid(res.body.data[0]._id)).toBe(true);
			expect(res.body.data[0].name).toBe(dummyBook.name);
      expect(res.body.data[0].ISBN).toBe(dummyBook.ISBN); 
    });

    test('it should INSERT & GET Same inserted Book', async () => {

      const book = await new Book(dummyBook);
      await book.save();

      const res = await request.get(`/api/books/${book._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBeNull();

      expect(res.body.data).not.toBe(null);
			expect(mongoose.Types.ObjectId.isValid(res.body.data._id)).toBe(true);
			expect(res.body.data.name).toBe(dummyBook.name);
      expect(res.body.data.ISBN).toBe(dummyBook.ISBN); 
      // expect(res.body.data.author).not.toBe(null); 
    });

    test('it should return Invalid ID', async () => {

      const res = await request.get(`/api/books/2478923794278928`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toEqual('Invalid ID');

      // expect(res.body.data.author).not.toBe(null); 
    });

    test('it should return 404 no book - valid but wrong id ', async () => {

      const res = await request.get(`/api/books/5f99382e3e29086f8589417a`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toEqual('Book not found!');

    });
    

  });

});