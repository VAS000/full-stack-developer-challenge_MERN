const Joi = require('@hapi/joi');

const createSchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(150),

  ISBN: Joi.string()
    .required()
    // TODO:// ISBN validation
    .trim(),
  
  authorID: Joi.string()
  .required()
  .trim()
});

const updateSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(5)
    .max(150),

  ISBN: Joi.string()
    // TODO:// ISBN validation
    .trim(),
  
  authorID: Joi.string()
  .trim()
});


module.exports = {
  createSchema,
  updateSchema
};