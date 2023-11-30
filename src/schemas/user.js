import Joi from 'joi'

export default Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().min(4).max(30).required().label('Username'),
  name: Joi.string().max(254).required().label('Name'),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})/).required().label('Password').messages({
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be 8-30 characters long.'
  })
})
