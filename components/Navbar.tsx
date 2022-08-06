import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Disabled_Profile_Text } from "../utils/constants";
import LogOutButton from "./LogOutButton";
import NavLink from "./NavLink";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [loggedIn] = useState(false);
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent={"space-between"}>
        <HStack spacing={8} alignItems="center">
          <NavLink to="/" mr={4}>
            Home
          </NavLink>
          <Tooltip
            isDisabled={loggedIn}
            hasArrow
            label={Disabled_Profile_Text}
            background={"red.600"}
          >
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <div className={loggedIn ? "" : "link-disabled"}>
                <NavLink to={"/profile"} mr={4}>
                  Profile
                </NavLink>
              </div>
            </HStack>
          </Tooltip>
        </HStack>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {!loggedIn ? (
              <Stack direction={"row"} alignItems="center">
                <Box>
                  <Badge variant={"outline"} colorScheme={"red"}>
                    Not Logged in
                  </Badge>
                </Box>
              </Stack>
            ) : (
              <LogOutButton />
            )}
            <IconButton
              variant={"ghost"}
              onClick={toggleColorMode}
              aria-label="toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
            <HStack>
              <Tooltip
                isDisabled={!loggedIn}
                hasArrow
                label={"user email"}
                bg={"green.600"}
              >
                <Avatar size={"sm"} src={loggedIn ? "" : ""}>
                  <AvatarBadge
                    boxSize={"1.25em"}
                    bg={loggedIn ? "green.500" : "tomato"}
                  ></AvatarBadge>
                </Avatar>
              </Tooltip>
            </HStack>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
