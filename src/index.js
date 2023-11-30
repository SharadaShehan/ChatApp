import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs/index.js'
import resolvers from './resolvers/index.js'
import { APP_PORT, IN_PROD } from './config.js'

(async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/chat')
      .then(() => console.log('Database connected successfully'))
      .catch(err => console.error(err))

    const app = express()
    app.disable('x-powered-by')

    const server = new ApolloServer({ typeDefs, resolvers, playground: !IN_PROD })

    server.start().then(res => {
      server.applyMiddleware({ app })

      app.listen({ port: APP_PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
      }
      )
    })
  } catch (err) {
    console.error(err)
  }
})()
