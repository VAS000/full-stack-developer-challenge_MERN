const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = new Schema({

  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 25,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 25,
  },
}, {timestamps: true});

authorSchema.index({ firstName: 1, lastName: 1}, { unique: true });

const authorModel = mongoose.model('Author', authorSchema);

module.exports = authorModel;