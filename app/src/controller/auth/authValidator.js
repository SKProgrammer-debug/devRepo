const { Joi } = require("express-validation");

const authValidator = {
  body: Joi.object({
    email: Joi.string().required().messages({
      'string.base': 'Please provide emailId'
    }),
  })
    .required()
    .messages({
      "any.required": "Please provide login details",
    }),
};

module.exports = {
  authValidator: authValidator,
};