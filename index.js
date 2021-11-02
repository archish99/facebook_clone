const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const app = express();

app.use(cors());

dotenv.config({ path: `${__dirname}/config.env` });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});

server.applyMiddleware({ app });

const DB_CONNECTION = process.env.DB.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB_CONNECTION)
  .then((res) => console.log("DB connected successfully"));

app.listen({ port: 5000 }, () =>
  console.log(`Server started on ${server.graphqlPath}`)
);
