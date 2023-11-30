import Joi from 'joi'

const email = Joi.string().email().required().label('Email')
const username = Joi.string().alphanum().min(4).max(30).required().label('Username')
const name = Joi.string().max(254).required().label('Name')
const password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})/).required().label('Password').messages({
  'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be 8-30 characters long.'
})

export const signIn = Joi.object().keys({
  email,
  password
})

export const signUp = Joi.object().keys({
  email,
  username,
  name,
  password
})
