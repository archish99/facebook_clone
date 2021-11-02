import Icon from "@chakra-ui/icon";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

const TopBarMidIcon = ({ label, icon, ...otherProps }) => {
  return (
    <Tooltip label={label} hasArrow placement="bottom">
      <span>
        <Icon
          as={icon}
          fontSize="35px"
          mr="80px"
          cursor="pointer"
          {...otherProps}
        />
      </span>
    </Tooltip>
  );
};

export default TopBarMidIcon;
