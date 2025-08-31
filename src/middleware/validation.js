const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      details: error.details,
    });
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

module.exports = { validate, registerSchema, loginSchema };