const Joi = require("joi");
const { badRequestResponse } = require("../utils/responses.js");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return badRequestResponse(res, error.details[0].message);
  }
  next();
};

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  username: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(6).required(),
});

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(500).required(),
});

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(500).required(),
  categoryId: Joi.number().integer().required(),
});

const variantSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(500).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
  productId: Joi.number().integer().required(),
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  categorySchema,
  productSchema,
  variantSchema,
};
