import Joi from "joi";

export const profileValidator = Joi.object({
    phone: Joi.string()
    .pattern("/^[0-9]{10,15}$/")
    .message("Phone must be a valid number with 10-15 digits")
    .optional(),
    address:Joi.object({
        street:Joi.string().optional()
    }),
    
})