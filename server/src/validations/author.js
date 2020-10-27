const Joi = require('@hapi/joi')

const createSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .regex(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/) //  can be extended/altered later
    .trim()
    .min(2)
    .max(25),

  lastName: Joi.string()
    .required()
    .regex(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/) // can be extended/altered later
    .trim()
    .min(2)
    .max(25),
});

const updateSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/) //  can be extended/altered later
    .trim()
    .min(2)
    .max(25),

  lastName: Joi.string()
    .regex(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/) // can be extended/altered later
    .trim()
    .min(2)
    .max(25),
});

module.exports = {
  createSchema,
  updateSchema,
};