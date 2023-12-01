import { gql } from 'apollo-server-express'

export default gql`
    extend type Mutation {
      startChat(title: String!, userIds: [ID!]!): Chat
    }
    type Chat {
        id: ID!
        title: String!
        users: [User!]!
        messages: [Message!]!
        lastMessage: Message
        createdAt: String!
        updatedAt: String!
    }
`
