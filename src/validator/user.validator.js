import Joi from "joi";

export const registerValidator = Joi.object({
    name:Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
        "string.empty":"name is required",
        "string.min":"Name must be atleast 3 characters",
        "any.required":"Name is required"
    }),
    email:Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
        "string.email": "Email must be a valid email",
        "any.required": "Email is required",
    }),
    password: Joi.string()
    .min(6)
    .max(128)
    .messages({
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required",
    }),
    isVerified:Joi.boolean()
    .default(false)
    ,
    role:Joi.string()
    .valid("user","admin","vendor")
    .optional()
    .messages({
        "any.only": "Role must be either user, vendor, or admin",
    })
})

