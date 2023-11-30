import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
        name: String!
        createdAt: String!
    }

    extend type Query {
        users: [User!]!
        user(id: ID!): User
    }

    extend type Mutation {
        signUP(username: String!, email: String!, name: String!, password: String!): User
    }
`
