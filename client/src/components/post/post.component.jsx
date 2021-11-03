import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Icon from "@chakra-ui/icon";
import { useSelector } from "react-redux";
import { selectUsername } from "../../redux/userSlice/userSlice";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_POST, LIKE_POST } from "../../graphql/mutation/mutation";
import { LIST_POSTS } from "../../graphql/query/query";
import { useToast } from "@chakra-ui/toast";

const Post = ({ post, setPostsFromChild }) => {
  const postBg = useColorModeValue("#fff", "#242526");
  const toast = useToast();

  const username = useSelector(selectUsername);

  const [deletePost] = useMutation(DELETE_POST);
  const [likePost] = useMutation(LIKE_POST);
  const [getPosts] = useLazyQuery(LIST_POSTS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data);
      setPostsFromChild(data.listPosts);
    },
  });

  const handleDeletePost = async (id) => {
    console.log("Deleting post with id: ", id);
    try {
      const data = await deletePost({ variables: { postId: id } });
      console.log(data);
      toast({
        title: "Post deleted",
        status: "success",
        duration: 1000,
      });
      getPosts();
    } catch (err) {
      toast({
        title: "Error deleting",
        status: "error",
        duration: 1000,
      });
      console.log(err);
    }
  };

  const handleLikePost = async (id) => {
    setLikeCount(postLiked ? likeCount - 1 : likeCount + 1);
    console.log("Liking the post with id: ", id);
    try {
      const data = await likePost({ variables: { postId: id } });
      console.log(data);
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const [postLiked, setPostLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  useEffect(() => {
    console.log("In post use effect");
    if (post?.likes.find((like) => like.username === username)) {
      setPostLiked(true);
    }
  }, [post.likes, username, getPosts]);

  return (
    <Box
      bg={postBg}
      p="10px"
      borderRadius="10px"
      w="100%"
      boxShadow="0 1px 4px rgba(0, 0, 0, .25)"
    >
      <VStack alignItems="flex-start">
        <Flex alignItems="flex-start" justifyContent="space-between" w="100%">
          <Flex>
            <Avatar
              src="https://scontent.fhyd2-1.fna.fbcdn.net/v/t1.18169-9/13892283_1180339358683709_3822302935394916137_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=3Xxb26-M61YAX-PEdeB&tn=KybyyKGIH_erizVv&_nc_ht=scontent.fhyd2-1.fna&oh=f0cd06bde5f83fdb3e7ca7fd477d0d02&oe=61A1CFA3"
              size="sm"
              cursor="pointer"
              mr="10px"
            />
            <Box>
              <Text
                fontSize={{ xs: "16px", xxs: "15px" }}
                fontWeight="bold"
                mb="8px"
              >
                {`${post.username
                  .substring(0, 1)
                  .toUpperCase()}${post.username.substring(1)}`}
              </Text>
              <Text fontSize="12px" mt="-10px">
                {new Date(post.createdAt).toLocaleString()}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center">
            <Flex alignItems="center" mr="10px">
              {postLiked ? (
                <Icon
                  as={AiFillHeart}
                  fontSize={{ sm: "22px", xxs: "18px" }}
                  cursor="pointer"
                  mr="5px"
                  fill="red"
                  onClick={() => {
                    handleLikePost(post.id);
                    setPostLiked(false);
                  }}
                />
              ) : (
                <Icon
                  as={AiOutlineHeart}
                  fontSize={{ sm: "22px", xxs: "18px" }}
                  cursor="pointer"
                  mr="5px"
                  onClick={() => {
                    handleLikePost(post.id);
                    setPostLiked(true);
                  }}
                />
              )}
              <Text>{likeCount}</Text>
            </Flex>
            {username === post.username ? (
              <Icon
                as={MdDeleteForever}
                fontSize="22px"
                cursor="pointer"
                fill="red.400"
                onClick={() => handleDeletePost(post.id)}
              />
            ) : null}
          </Flex>
        </Flex>
        <Text>{post.body}</Text>
      </VStack>
    </Box>
  );
};

export default Post;
