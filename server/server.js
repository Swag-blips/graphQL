import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "John Doe", age: 30, isMarried: true },
  { id: "2", name: "Jane Smith", age: 25, isMarried: false },
  { id: "3", name: "Alice Johnson", age: 40, isMarried: true },
  { id: "4", name: "Bob Brown", age: 35, isMarried: false },
  { id: "5", name: "Charlie Davis", age: 28, isMarried: true },
];

const typeDefs = `
type Query{
getUsers: [User]
getUserById(id:ID): User
}

type Mutation{
createUser(name: String!, age:Int!, isMarried: Boolean!): User
}

type User{
 id: ID
 name: String
 age:Int
 isMarried: Boolean
}
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, agrs) => {
      const { name, age, isMarried } = args;

      const newUser = { id: users.length + 1, name, age, isMarried };
      users.push(newUser);
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`server running on ${url}`);

// Query mutation
// typeDefs, resolvers
