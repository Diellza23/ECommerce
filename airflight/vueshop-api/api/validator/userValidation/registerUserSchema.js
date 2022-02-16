import Joi from 'joi';


const schema = Joi.object({
    email: Joi.string().email().min(5).max(30).required().error(()=>'"email" is not allowed to be empty'),
    password: Joi.string().alphanum().min(5).max(30).required().error(()=>'"password" is not allowed to be empty')
})

export default schema
