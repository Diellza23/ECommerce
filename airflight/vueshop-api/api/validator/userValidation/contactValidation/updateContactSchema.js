import Joi from "joi";

const updatedContactSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  message: Joi.string().required(),
});
export default updatedContactSchema;
