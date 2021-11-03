import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

const DrawerIcon = ({ icon, title }) => (
  <Flex alignItems="center">
    <Icon as={icon} mr="10px" fontSize="20px" />
    <Text fontWeight="semibold" fontSize="18px">
      {title}
    </Text>
  </Flex>
);

export default DrawerIcon;
