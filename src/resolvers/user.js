import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models/index.js'
import { signUP } from '../schemas/index.js'

export default {
  Query: {
    users: async (root, args, context, info) => {
      const users = await User.find({})
      return users
    },
    user: async (root, args, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user ID.`)
      }
      return await User.findById(args.id)
    }
  },
  Mutation: {
    signUP: async (root, args, context, info) => {
      await signUP.validateAsync(args, { abortEarly: false })
      return await User.create(args)
    }
  }
}
