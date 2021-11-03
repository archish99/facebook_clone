import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Divider, Flex, Text, VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { AiOutlineSearch, AiFillHome, AiFillShop } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { TiGroupOutline } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import React from "react";

import { BsFacebook } from "react-icons/bs";
import TopBarMidIcon from "../../components/top-bar-mid-icon/top-bar-mid-icon.component";
import TopBarAvatar from "../../components/top-bar-avatar/top-bar-avatar.component";
import { Button } from "@chakra-ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/modal";
import RightSideBarIcon from "../../components/icons/right-side-bar-icon/right-side-bar-icon.component";
import { useDisclosure } from "@chakra-ui/hooks";
import DrawerIcon from "../../components/icons/drawer-icon/drawer-icon.component";

const TopBar = () => {
  const bg = useColorModeValue("#FFF", "#242526");
  const searchInputBg = useColorModeValue("#F0F2F5", "#3A3B3C");
  const searchInputTextColor = useColorModeValue("#65676B", "#B8BBBF");
  const drawerTextColor = useColorModeValue("#6E7074", "#A6A8AD");
  const { colorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={bg}
      p="10px"
      alignItems="center"
      justifyContent="space-between"
      boxShadow={colorMode === "light" ? "0 2px 4px rgba(0, 0, 0, .25)" : ""}
    >
      <Flex alignItems="center" flexBasis={{ md: "30%", sm: "60%" }}>
        <Icon as={BsFacebook} mr="10px" fontSize="40px" fill="#14A0F9" />
        <InputGroup alignItems="center" w={{ xl: "45%", md: "60%" }}>
          <Input
            type="text"
            placeholder="Search Facebook"
            borderRadius="50px"
            bg={searchInputBg}
            color={searchInputTextColor}
            _placeholder={{ color: searchInputTextColor }}
          />
          <InputLeftElement
            children={
              <Icon
                as={AiOutlineSearch}
                cursor="pointer"
                fontSize="20px"
                fill={searchInputTextColor}
              />
            }
          />
        </InputGroup>
      </Flex>
      <Flex
        flexBasis="40%"
        justifyContent="space-around"
        textAlign="center"
        display={{ md: "flex", xxs: "none" }}
      >
        <TopBarMidIcon
          icon={AiFillHome}
          fill="#14A0F9"
          m="0 auto"
          label="Home"
        />
        <TopBarMidIcon icon={HiOutlineVideoCamera} m="0 auto" label="Videos" />
        <TopBarMidIcon icon={AiFillShop} m="0 auto" label="Market Place" />
        <TopBarMidIcon icon={TiGroupOutline} m="0 auto" label="Friends" />
        <TopBarMidIcon icon={MdOutlineDashboard} m="0 auto" label="Gaming" />
      </Flex>
      <Flex flexBasis="30%" justifyContent="flex-end" alignItems="center">
        <TopBarAvatar />
        <Button
          p="0"
          ml="5px"
          bg="transparent"
          onClick={onOpen}
          _active={{ bg: "transparent" }}
          _focus={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
          display={{ md: "none", sm: "inline-block" }}
        >
          <Icon as={RiMenu3Line} fontSize="23px" />
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerBody p="20px">
            <VStack>
              <Text
                alignSelf="flex-start"
                fontWeight="semibold"
                color={drawerTextColor}
              >
                Contacts
              </Text>
              <Divider />
              <RightSideBarIcon name="Friend 1" />
              <RightSideBarIcon name="Friend 2" />
              <RightSideBarIcon name="Friend 3" />
              <RightSideBarIcon name="Friend 4" />
              <RightSideBarIcon name="Friend 5" />
              <Divider />
              <VStack alignItems="flex-start" w="100%" p="0 15px" spacing={4}>
                <DrawerIcon icon={AiFillHome} title="Home" />
                <DrawerIcon icon={HiOutlineVideoCamera} title="Videos" />
                <DrawerIcon icon={AiFillShop} title="Market Place" />
                <DrawerIcon icon={TiGroupOutline} title="Friends" />
                <DrawerIcon icon={MdOutlineDashboard} title="Gaming" />
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default TopBar;
