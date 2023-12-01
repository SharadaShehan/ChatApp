import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
        name: String!
        chats: [Chat!]!
        createdAt: String!
        updatedAt: String!
    }

    extend type Query {
        me: User
        users: [User!]!
        user(id: ID!): User
    }

    extend type Mutation {
        signUp(username: String!, email: String!, name: String!, password: String!): User
        signIn(email: String!, password: String!): User
        signOut: Boolean
    }
`
