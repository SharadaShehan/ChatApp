import { startChat } from '../schemas/index.js'
import { User, Chat, Message } from '../models/index.js'
import { UserInputError } from 'apollo-server-express'
import * as Auth from '../auth.js'

export default {
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      const { title, userIds } = args
      await startChat.validateAsync(args, { abortEarly: false })
      const idsFound = await User.where('_id').in(userIds).countDocuments()
      if (userIds.length !== idsFound) {
        throw new UserInputError('One or more User IDs are invalid')
      }
      if (!userIds.includes(req.session.userId)) {
        userIds.push(req.session.userId)
      }
      const chat = await Chat.create({ title, users: userIds })
      await User.updateMany({ _id: { $in: userIds } }, { $push: { chats: chat._id } })
      return chat
    }
  },
  Chat: {
    users: async (chat, args, context, info) => {
      await chat.populate('users')
      return chat.users
    },
    messages: async (chat, args, context, info) => {
      return Message.find({ chat: chat._id })
    },
    lastMessage: async (chat, args, context, info) => {
      await chat.populate('lastMessage')
      return chat.lastMessage
    }
  }
}
