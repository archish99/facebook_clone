import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { AiOutlineSearch, AiFillHome, AiFillShop } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { TiGroupOutline } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md";
import React from "react";

import { BsFacebook } from "react-icons/bs";
import TopBarMidIcon from "../../components/top-bar-mid-icon/top-bar-mid-icon.component";
import TopBarAvatar from "../../components/top-bar-avatar/top-bar-avatar.component";

const TopBar = () => {
  const topBarBg = useColorModeValue("#FFF", "#242526");
  const searchInputBg = useColorModeValue("#F0F2F5", "#3A3B3C");
  const searchInputTextColor = useColorModeValue("#65676B", "#B8BBBF");
  const { colorMode } = useColorMode();

  return (
    <Flex
      bg={topBarBg}
      p="10px"
      alignItems="center"
      justifyContent="space-between"
      boxShadow={colorMode === "light" ? "0 2px 4px rgba(0, 0, 0, .25)" : ""}
    >
      <Flex alignItems="center" flexBasis="30%">
        <Icon as={BsFacebook} mr="10px" fontSize="40px" fill="#14A0F9" />
        <InputGroup alignItems="center" w="45%">
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
      <Flex flexBasis="40%" justifyContent="space-around" textAlign="center">
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
      <Flex flexBasis="30%" justifyContent="flex-end">
        <TopBarAvatar />
      </Flex>
    </Flex>
  );
};

export default TopBar;
