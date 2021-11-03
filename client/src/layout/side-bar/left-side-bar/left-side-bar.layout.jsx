import React from "react";
import { VStack } from "@chakra-ui/react";
import { FaUserFriends, FaStore } from "react-icons/fa";
import { MdGroups, MdAccessTimeFilled } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";

import LeftSideBarIcon from "../../../components/icons/left-side-bar-icon/left-side-bar-icon.component";

const LeftSideBar = () => (
  <VStack
    p="20px"
    flexBasis="30%"
    alignItems="flex-start"
    spacing={6}
    display={{ sm: "flex", xxs: "none" }}
  >
    <LeftSideBarIcon
      title="Friends"
      icon={FaUserFriends}
      color="#6BDBCC"
      width="70%"
    />
    <LeftSideBarIcon
      title="Groups"
      icon={MdGroups}
      color="#39B4FC"
      width="70%"
    />
    <LeftSideBarIcon
      title="Marketplace"
      icon={FaStore}
      color="#BF48BD"
      width="70%"
    />
    <LeftSideBarIcon
      title="Watch"
      icon={RiVideoFill}
      color="#F06F41"
      width="70%"
    />
    <LeftSideBarIcon
      title="Memories"
      icon={MdAccessTimeFilled}
      color="#EF506C"
      width="70%"
    />
  </VStack>
);

export default LeftSideBar;
