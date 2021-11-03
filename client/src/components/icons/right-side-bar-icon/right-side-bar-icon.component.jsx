import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

const RightSideBarIcon = ({ name }) => {
  const hoverColor = useColorModeValue("#E4E6E9", "#746a6a7f");

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      w="100%"
      p="5px 10px"
      borderRadius="20px"
      _hover={{ background: hoverColor }}
    >
      <Avatar src="https://bit.ly/broken-link" size="sm" mr="10px" />
      <Text fontSize={{ xl: "17px", md: "15px" }} fontWeight="semibold">
        {name}
      </Text>
    </Flex>
  );
};

export default RightSideBarIcon;
