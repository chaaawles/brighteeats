import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    hello: String
    users: [User]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`);

// Resolvers
export const rootValue = {
  hello: () => 'Hello, GraphQL!',
  users: () => [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
  ]
};
