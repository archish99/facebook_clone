const Post = require("../../../models/post/Post");
const checkAuth = require("../../../utils/check-auth");

module.exports = {
  Query: {
    listPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, args) => {
      const { postId } = args;

      try {
        const post = await Post.findById(postId);

        return post;
      } catch (err) {
        throw new Error("The post does not exist");
      }
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const user = checkAuth(context);
      const { username, id } = user;

      const { body } = args;

      if (body !== "") {
        try {
          const newPost = await Post.create({
            body,
            user: id,
            username,
            createdAt: new Date().toISOString(),
          });
          return newPost;
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new Error("Body must not be empty");
      }
    },
    deletePost: async (_, args, context) => {
      const user = checkAuth(context);
      const { postId } = args;

      try {
        await Post.findByIdAndDelete(postId);
        return "The post was deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    createComment: async (_, args, context) => {
      const user = checkAuth(context);
      const { username } = user;

      const { postId, body } = args;

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");

      if (body === "") throw new Error("Body must not be empty");

      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
      });

      await post.save();
      return post;
    },
    deleteComment: async (_, args, context) => {
      checkAuth(context);

      const { postId, commentId } = args;

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");

      post.comments = post.comments.filter(
        (comment) => comment.id !== commentId
      );

      await post.save();

      return "Comment deleted successfully";
    },
    likePost: async (_, args, context) => {
      const user = checkAuth(context);
      const { username } = user;

      const { postId } = args;

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");

      // Check if the post is already liked
      if (post.likes.find((like) => like.username === username)) {
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        // Not liked
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }

      await post.save();
      return post;
    },
  },
};
