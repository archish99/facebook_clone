import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { FiMoon, FiLogOut } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useToast } from "@chakra-ui/toast";
import { setSignOutState } from "../../redux/userSlice/userSlice";

const TopBarAvatar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const menuBg = useColorModeValue("#fff", "#18191A");

  const history = useHistory();
  const dispatch = useDispatch();

  const toast = useToast();

  const handleSignOut = () => {
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: "1000",
    });
    setTimeout(() => {
      history.push("/login-signup");
      dispatch(setSignOutState());
      localStorage.setItem("token", "");
    }, 1200);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <Avatar
            src="https://scontent.fhyd2-1.fna.fbcdn.net/v/t1.18169-9/13892283_1180339358683709_3822302935394916137_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=3Xxb26-M61YAX-PEdeB&tn=KybyyKGIH_erizVv&_nc_ht=scontent.fhyd2-1.fna&oh=f0cd06bde5f83fdb3e7ca7fd477d0d02&oe=61A1CFA3"
            size="sm"
            cursor="pointer"
          />
        }
        bg="none"
        _hover={{ background: "none" }}
        _focus={{ background: "none" }}
        _active={{ background: "none" }}
      />
      <MenuList bg={menuBg} minW="max-content" maxW="max-content">
        <MenuItem
          icon={
            colorMode === "dark" ? (
              <BsSun fontSize="15px" />
            ) : (
              <FiMoon fontSize="15px" />
            )
          }
          onClick={toggleColorMode}
        >
          {colorMode === "dark" ? "Light" : "Dark"}
        </MenuItem>
        <MenuItem onClick={handleSignOut} icon={<FiLogOut fontSize="15px" />}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TopBarAvatar;
