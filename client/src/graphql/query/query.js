import { gql } from "@apollo/client";

export const LIST_POSTS = gql`
  query listPosts {
    listPosts {
      id
      body
      username
      createdAt
      comments {
        id
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;
