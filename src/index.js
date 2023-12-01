import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import typeDefs from './typeDefs/index.js'
import resolvers from './resolvers/index.js'
import { APP_PORT, IN_PROD, DB_HOST, DB_PORT, DB_NAME, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './config.js'

(async () => {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
      .then(() => console.log('Database connected successfully'))
      .catch(err => console.error(err))

    const app = express()
    app.disable('x-powered-by')

    app.use(session({
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: IN_PROD
      }
    }))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: IN_PROD
        ? false
        : {
            settings: {
              'request.credentials': 'include'
            }
          },
      context: ({ req, res }) => ({ req, res })
    })

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
