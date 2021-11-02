import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

const LeftSideBarIcon = ({ icon, title, color, width }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignItems="center"
      p="5px 10px"
      borderRadius="20px"
      cursor="pointer"
      w={width}
      _hover={{
        background: `${colorMode === "light" ? "#E4E6E9" : "#746a6a7f"}`,
      }}
    >
      <Icon as={icon} fontSize="25px" fill={color} mr="10px" />
      <Text
        fontSize={{ base: "5px", sm: "16px", md: "15px", lg: "18px" }}
        fontWeight="bold"
      >
        {title}
      </Text>
    </Flex>
  );
};

export default LeftSideBarIcon;
