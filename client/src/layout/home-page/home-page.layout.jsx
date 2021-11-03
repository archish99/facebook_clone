import { useQuery } from "@apollo/client";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { LIST_POSTS } from "../../graphql/query/query";
import MidContent from "../mid-content/mid-content.layout";
import RightSideBar from "../right-sidebar/right-sidebar.layout";
import LeftSideBar from "../side-bar/left-side-bar/left-side-bar.layout";
import TopBar from "../top-bar/top-bar.layout";

const HomePage = () => {
  const bg = useColorModeValue("#F0F2F5", "#18191A");

  const { loading, error, data } = useQuery(LIST_POSTS);

  const [posts, setPosts] = useState([]);

  const setPostsFromChild = (posts) => setPosts(posts);

  useEffect(() => {
    if (loading) console.log("Loading");
    else {
      console.log(data?.listPosts);
      setPosts(data?.listPosts);
    }
  }, [loading]);

  return (
    <Box bg={bg} minH="100vh">
      <TopBar />
      <Flex>
        <LeftSideBar />
        <MidContent
          loading={loading}
          posts={posts}
          setPostsFromChild={setPostsFromChild}
        />
        <RightSideBar />
      </Flex>
    </Box>
  );
};

export default HomePage;
