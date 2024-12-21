import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";

const books = [
  { id: "1", title: "1984", author: "George Orwell", publishedYear: 1949 },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960,
  },
];

const typeDefs = `
  type Book {
    id: ID
    title: String
    author: String
    publishedYear: Int
  }


  type Query {
   getAllBooks: [Book]
   getBookById(id: ID): Book
  }

  type Mutation{
  addNewBook(title:String!, author:String!, publishedYear:Int!): Book
  }
`;

const resolvers = {
  Query: {
    getAllBooks: () => {
      return books;
    },

    getBookById: (_, args) => {
      const bookId = args.id;

      return books.find((book) => book.id === bookId);
    },
  },

  Mutation: {
    addNewBook: (_, args) => {
      const { title, author, publishedYear } = args;

      const newBook = {
        id: books.length + 1,
        title,
        author,
        publishedYear,
      };

      books.push(newBook);

      return newBook;
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server);

console.log(`server has started at ${url}`);
