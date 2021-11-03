import { Avatar } from "@chakra-ui/avatar";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { IoMdVideocam, IoMdPhotos } from "react-icons/io";
import { BsEmojiLaughingFill } from "react-icons/bs";
import LeftSideBarIcon from "../../components/icons/left-side-bar-icon/left-side-bar-icon.component";
import Post from "../../components/post/post.component";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Spinner } from "@chakra-ui/spinner";
import { useFormik } from "formik";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_POST } from "../../graphql/mutation/mutation";
import { LIST_POSTS } from "../../graphql/query/query";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsername,
  setSignOutState,
} from "../../redux/userSlice/userSlice";
import validateToken from "../../utils/validate-token";
import { useToast } from "@chakra-ui/toast";

const MidContent = ({ loading, posts, setPostsFromChild }) => {
  const topBoxBg = useColorModeValue("#fff", "#242526");
  const searchInputBg = useColorModeValue("#F0F2F5", "#3A3B3C");
  const searchInputTextColor = useColorModeValue("#65676B", "#B8BBBF");

  const token = localStorage.getItem("token");

  const username = useSelector(selectUsername);

  const dispatch = useDispatch();

  const toast = useToast();

  const [addPost] = useMutation(ADD_POST);
  const [getPosts] = useLazyQuery(LIST_POSTS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data);
      setPostsFromChild(data.listPosts);
    },
  });

  const addPostFormik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: async (values, helpers) => {
      console.log(values);
      if (validateToken(token)) {
        try {
          const data = await addPost({ variables: { ...values } });
          console.log(data);
          getPosts();
          helpers.resetForm();
        } catch (err) {
          console.log(err);
        }
      } else {
        toast({
          title: "Session expired",
          description: "Logging you out",
          status: "error",
          duration: 1000,
        });
        setTimeout(() => {
          dispatch(setSignOutState());
          localStorage.setItem("token", "");
        });
      }
    },
  });

  const { values, handleChange, handleSubmit } = addPostFormik;

  useEffect(() => {
    console.log("Loading from mid content: ", loading);
  }, [loading]);

  return (
    <VStack
      flexBasis={{ xl: "40%", lg: "50%", md: "70%", xxs: "100%" }}
      flexWrap="wrap"
      p="20px"
      spacing={6}
    >
      <Box
        bg={topBoxBg}
        p="10px"
        borderRadius="10px"
        w="100%"
        boxShadow="0 1px 4px rgba(0, 0, 0, .25)"
      >
        <VStack>
          <Flex justifyContent="flex-start" alignItems="center" w="100%">
            <Avatar
              src="https://scontent.fhyd2-1.fna.fbcdn.net/v/t1.18169-9/13892283_1180339358683709_3822302935394916137_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=3Xxb26-M61YAX-PEdeB&tn=KybyyKGIH_erizVv&_nc_ht=scontent.fhyd2-1.fna&oh=f0cd06bde5f83fdb3e7ca7fd477d0d02&oe=61A1CFA3"
              size="sm"
              cursor="pointer"
              mr="10px"
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              style={{ width: "100%" }}
            >
              <Input
                type="text"
                bg={searchInputBg}
                borderRadius="20px"
                fontSize={{ xs: "16px", xxs: "15px" }}
                autoComplete="off"
                name="body"
                value={values.body}
                onChange={handleChange}
                color={searchInputTextColor}
                _placeholder={{ color: searchInputTextColor }}
                placeholder={`What's on your mind, ${username
                  .substring(0, 1)
                  .toUpperCase()}${username.substring(1)}?`}
              />
            </form>
          </Flex>
          <Divider />
          <Flex
            justifyContent="space-between"
            w="100%"
            display={{ xs: "flex", xxs: "none" }}
          >
            <LeftSideBarIcon
              icon={IoMdVideocam}
              title="Live Video"
              color="#F4556F"
            />
            <LeftSideBarIcon
              icon={IoMdPhotos}
              title="Photo/Video"
              color="#58C472"
            />
            <LeftSideBarIcon
              icon={BsEmojiLaughingFill}
              title="Feeling/Activity"
              color="#F8C03E"
            />
          </Flex>
        </VStack>
      </Box>
      {loading ? (
        <Spinner size="lg" />
      ) : posts && posts?.length > 0 ? (
        posts?.map((post) => (
          <Post
            key={post.id}
            post={post}
            setPostsFromChild={setPostsFromChild}
          />
        ))
      ) : (
        <Text>There are no posts yet. Create new up there 👆</Text>
      )}
    </VStack>
  );
};

export default MidContent;
