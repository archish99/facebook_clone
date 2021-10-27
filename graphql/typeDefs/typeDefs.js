const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Comment {
    id: ID!
    createdAt: String!
    body: String!
    username: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    listPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): String!
    likePost(postId: ID!): Post!
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
