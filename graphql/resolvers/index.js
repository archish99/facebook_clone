const postResolver = require("./post/post");
const userResolver = require("./user/user");

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
  },
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...postResolver.Mutation,
    ...userResolver.Mutation,
  },
};

module.exports = resolvers;
