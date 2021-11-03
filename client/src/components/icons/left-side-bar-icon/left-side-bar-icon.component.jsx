import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

const LeftSideBarIcon = ({ icon, title, color, width }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignItems="center"
      p={{ xl: "5px 10px", md: "5px" }}
      borderRadius="20px"
      cursor="pointer"
      w={width}
      _hover={{
        background: `${colorMode === "light" ? "#E4E6E9" : "#746a6a7f"}`,
      }}
    >
      <Icon
        as={icon}
        fontSize={{ xs: "25px", xxs: "20px" }}
        fill={color}
        mr="10px"
      />
      <Text
        fontSize={{ xl: "18px", xs: "15px", xxs: "12px" }}
        fontWeight="bold"
      >
        {title}
      </Text>
    </Flex>
  );
};

export default LeftSideBarIcon;
