const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({

  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    min: 5,
    max: 150,
  },

  ISBN: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  }
}, {timestamps: true});


const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel;