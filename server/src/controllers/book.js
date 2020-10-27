const Book = require('../models/book');
const Author = require('../models/author');

const { jsonSuccess, jsonError } = require("../helpers/http.js");
const { isValidMongoObjectID } = require('../helpers/validations');

const {
  createSchema,
  updateSchema,
} = require("../validations/book");

const validateAuthorID = async(res, authorID) => {
  if(!isValidMongoObjectID(authorID)) {
    return jsonError(res, {
      statusCode: 404,
      message: "Invalid ID"
    });
  }

  const author = await Author.findById(authorID);
  if(!author) {
    return jsonError(res, {
      statusCode: 422,
      message: "Invalid AuthorID"
    });
  }
}

const createUpdateErrorResponse = (res, err, next) => {

  console.log(err);

  res.status(422);

  if (err.name === 'ValidationError') { // for mongoose validation error -- should not reach here, but just in case :D   
    return next(new Error('Validation failed or some fields are empty'));
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    return next(new Error('name and ISBN should be unique!'));
  }

  res.status(500);
  next(new Error('Internal server error'));
}


const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("author");;
    jsonSuccess(res, {
      data: books,
    });
  }catch {
    res.status(500);
    next(new Error('Internal server error'));
  }
}


const createBook = async (req, res, next) => {
  try {
    const { error } = createSchema.validate(req.body);

    if (error) {
      res.status(422);
      return next(new Error(error.details[0].message));
    }

    const { name, ISBN, authorID } = req.body;
    
    await validateAuthorID(res, authorID);
    
    const book = new Book({
      name,
      ISBN,
      author: authorID
    });

    const newbook = await book.save();
    
    if(newbook) {
      jsonSuccess(res, {
        message: 'Book created successfully',
      });
    }
  } catch (err) {
    createUpdateErrorResponse(res, err, next);
  }
  
}

const getBook = async (req, res, next) => {

  const { id } = req.params;
  if(!isValidMongoObjectID(id)) {
    return jsonError(res, {
      statusCode: 404,
      message: "Invalid ID"
    });
  }

  try {
    const book = await Book.findById(id).populate('author');
  
    if(!book) {
      res.status(404);
      jsonError(res, {
        statusCode: 404,
        message: 'Book not found!',
      });
    } else {
      jsonSuccess(res, {
        data: book,
      });
    }
  }catch {
    res.status(500);
    next(new Error('Internal server error'));
  }

}

const updateBook = async (req, res, next) => {
  if(!Object.keys(req.body).length) {
    return jsonError(res, {
      statusCode: 422,
      message: "Request body is empty!"
    });
  }

  const { id } = req.params;

  if(!isValidMongoObjectID(id)) {
    return jsonError(res, {
      statusCode: 404,
      message: "Invalid ID"
    });
  }

  try {

    const { error } = updateSchema.validate(req.body);

    if (error) {
      res.status(422);
      return next(new Error(error.details[0].message));
    }

    const {  name, ISBN, authorID } = req.body;
    
    if(!!authorID) {
      await validateAuthorID(res, authorID);
    }

    const book = await Book.findById(id);
    if(!book) {
      return jsonError(res, {
        statusCode: 404,
        message: 'Book not found!',
      });
    }

    book.name = name || book.name;
    book.ISBN = ISBN || book.ISBN;
    book.author = authorID || book.author; 

    const newBook = await book.save();
    
    if(newBook) {
      jsonSuccess(res, {
        message: 'Book updated successfully',
      });
    }
    
  }catch(err) {
    createUpdateErrorResponse(res, err, next);
  }
}

const deleteBook = async (req, res, next) => {

  const { id } = req.params;
  if(!isValidMongoObjectID(id)) {
    return jsonError(res, {
      statusCode: 404,
      message: "Invalid ID"
    });
  }

  try {
    const book = await Book.findByIdAndRemove(id);
    if(book) {
      jsonSuccess(res, {
        message: "Book deleted successfully!",
      });
    } else {
      jsonError(res, {
        statusCode: 404,
        message: 'Book was not found!',
      });
    }

  }catch {
    res.status(500);
    next(new Error('Internal server error'));
  }
}


module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
}