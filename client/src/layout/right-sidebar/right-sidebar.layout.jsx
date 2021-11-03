import React from "react";
import { VStack, HStack, Divider, Text, Icon, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { BsFillCameraVideoFill, BsThreeDots } from "react-icons/bs";
import RightSideBarIcon from "../../components/icons/right-side-bar-icon/right-side-bar-icon.component";

const RightSideBar = () => {
  const textAndIconColor = useColorModeValue("#6E7074", "#A6A8AD");

  return (
    <VStack
      flexBasis="30%"
      p="20px"
      spacing={4}
      alignItems="flex-end"
      display={{ md: "flex", xxs: "none" }}
    >
      <VStack w={{ xl: "50%", lg: "70%", md: "90%" }} alignItems="flex-start">
        <HStack w="100%" justifyContent="space-between">
          <Text fontWeight="semibold" color={textAndIconColor}>
            Contacts
          </Text>
          <Flex>
            <Icon
              as={BsFillCameraVideoFill}
              cursor="pointer"
              fill={textAndIconColor}
              mr="10px"
              fontSize="18px"
            />
            <Icon
              as={BsThreeDots}
              cursor="pointer"
              fill={textAndIconColor}
              fontSize="20px"
            />
          </Flex>
        </HStack>
        <RightSideBarIcon name="Friend 1" />
        <RightSideBarIcon name="Friend 2" />
        <RightSideBarIcon name="Friend 3" />
        <RightSideBarIcon name="Friend 4" />
      </VStack>
    </VStack>
  );
};

export default RightSideBar;
