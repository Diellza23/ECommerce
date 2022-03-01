import Joi from "joi";

const updatedContactSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  message: Joi.string(),
});
export default updatedContactSchema;
