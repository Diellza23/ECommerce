import Joi from "joi";

const updatedVueshopSchema = Joi.object({
  _id: Joi.string().required(),
  type: Joi.string().valid("flat", "house"),
  squareMeters: Joi.number(),
  price: Joi.number(),
});
export default updatedVueshopSchema;
