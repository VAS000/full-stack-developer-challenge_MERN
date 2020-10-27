const mongoose = require('mongoose');

const isValidMongoObjectID = id => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  isValidMongoObjectID,
}