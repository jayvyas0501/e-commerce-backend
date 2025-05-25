import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  stock: Joi.number().min(0).optional(),
  images: Joi.array()
    .items(
      Joi.object({
        public_id: Joi.string().required(),
        url: Joi.string().uri().required()
      })
    )
    .required(),
  rating: Joi.number().min(0).max(5).optional()
});
