import { ApolloServer } from "apollo-server";

import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import dotenv from "dotenv";
import connectMongo from "./connectMongo.js";

dotenv.config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000, () => {
  connectMongo();
  console.log("server is running on port 4000");
});
