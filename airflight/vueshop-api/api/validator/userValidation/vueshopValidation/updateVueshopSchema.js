import Joi from "joi";

const updatedVueshopSchema = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  category: Joi.string().valid("electronics", "other")
});
export default updatedVueshopSchema;
