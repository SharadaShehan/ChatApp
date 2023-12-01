import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models/index.js'
import { signIn, signUp } from '../schemas/index.js'
import * as Auth from '../auth.js'

export default {
  Query: {
    me: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      return await User.findById(req.session.userId)
    },
    users: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      const users = await User.find({})
      return users
    },
    user: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user ID.`)
      }
      return await User.findById(args.id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      Auth.checkSignedOut(req)
      await signUp.validateAsync(args, { abortEarly: false })
      const user = await User.create(args)
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      await signIn.validateAsync(args, { abortEarly: false })
      const user = await Auth.attemptSignIn(args.email, args.password)
      req.session.userId = user.id
      return user
    },
    signOut: async (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req)
      return await Auth.signOut(req, res)
    }
  }
}
