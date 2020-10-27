const Author = require('../models/author');

const { jsonSuccess, jsonError } = require("../helpers/http.js");

const { isValidMongoObjectID } = require('../helpers/validations');

const {
  createSchema,
  updateSchema,
} = require("../validations/author");


const createUpdateErrorResponse = (res, err) => {
  res.status(422);

  if (err.name === 'ValidationError') { // for mongoose validation error -- should not reach here, but just in case :D   
    return next(new Error('Validation failed or some fields are empty'));
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    console.log(err);
    return next(new Error('Firstname and Lastname should be unique!'));
  }

  res.status(500);
  next(new Error('Internal server error'));
}

const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    if(!authors.length) {
      jsonSuccess(res, {
        statusCode: 404,
        message: 'No author was found!',
      });
    } else {
      jsonSuccess(res, {
        data: authors,
      });
    }
  }catch {
    res.status(500);
    next(new Error('Internal server error'));
  }
}


const createAuthor = async (req, res, next) => {
  try {
    const { error } = createSchema.validate(req.body);

    if (error) {
      res.status(422);
      return next(new Error(error.details[0].message));
    }

    const { firstName, lastName } = req.body;
    const author = new Author({
      firstName,
      lastName,
    });

    const newAuthor = await author.save();
    
    if(newAuthor) {
      jsonSuccess(res, {
        message: 'Author created successfully',
      });
    }
    
  } catch (err) {
    createUpdateErrorResponse(res, err);
  }
}


const getAuthor = async (req, res, next) => {

  const { id } = req.params;
  if(!isValidMongoObjectID(id)) {
    return jsonError(res, {
      statusCode: 404,
      message: "Invalid ID"
    });
  }

  try {
    const author = await Author.findById(id);
    console.log(author);
  
    if(!author) {
      res.status(404);
      jsonError(res, {
        statusCode: 404,
        message: 'Author was found!',
      });
    } else {
      jsonSuccess(res, {
        data: author,
      });
    }
  }catch {
    res.status(500);
    next(new Error('Internal server error'));
  }
  
}

const updateAuthor =  async (req, res, next) => {

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

    const { firstName, lastName } = req.body;

    const author = await Author.findById(id);
    if(!author) {
      return jsonError(res, {
        statusCode: 404,
        message: 'Author was found!',
      });
    }

    author.firstName = firstName || author.firstName;
    author.lastName = lastName || author.lastName;

    const newAuthor = await author.save();
    
    if(newAuthor) {
      jsonSuccess(res, {
        message: 'Author updated successfully',
      });
    }
    
  }catch {
    createUpdateErrorResponse(res, err);
  }
}


const deleteAuthor = async (req, res, next) => {

  const { id } = req.params;
  if(!isValidMongoObjectID(id)) {
    return jsonError(res, {
      statusCode: 404,
      message: "Invalid ID"
    });
  }

  try {
    const author = await Author.findByIdAndRemove(id);

    console.log(author);

    if(author) {
      jsonSuccess(res, {
        message: "Author deleted successfully!",
      });
    } else {
      jsonError(res, {
        statusCode: 404,
        message: 'Author was found!',
      });
    }

  }catch {
    res.status(500);
    next(new Error('Internal server error'));
  }
}



module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  deleteAuthor,
  updateAuthor,
}