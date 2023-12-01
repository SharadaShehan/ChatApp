import Joi from 'joi'
import mongoose from 'mongoose'

export const startChat = Joi.object().keys({
  title: Joi.string().min(6).max(50).label('Title').required(),
  userIds: Joi.array().min(1).max(20).unique().items(
    Joi.string().external(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid user ID')
      }
    }).required()
  ).label('User IDs').required()
})
