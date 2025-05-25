import Joi from "joi";

export const profileValidator = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message({
      "string.pattern.base": "Phone must be a valid number with 10 digits",
    })
    .optional(),
  address: Joi.object({
    street: Joi.string().max(100).optional(),
    city: Joi.string().max(50).optional(),
    state: Joi.string().max(50).optional(),
    postalCode: Joi.string().max(20).optional(),
    country: Joi.string().max(50).optional(),
  }).optional(),
  dateOfBirth: Joi.date().less("now").optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
});
