import { Box, Button, Text, Flex, useColorMode, useColorModeValue, Stack, IconButton, useDisclosure, Collapse, useToast } from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TbLogout, TbLogin } from "react-icons/tb";
import { IoPersonAdd } from "react-icons/io5";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const { isAuth, isAuthor, logout } = useContext(AuthContext);
  const toast = useToast();
  const nav = useNavigate();
  return (
    <Box position="fixed" top="0" w="full" zIndex="3">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        minH={"60px"}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.500"}
        align={"center"}
      >
        <Flex display={{ base: "block", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={6} h={6} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text as={NavLink} to={"/"} fontSize={"22px"} letterSpacing={{ sm: 0, md: 4 }} fontWeight={800}>
            <Text as="span" color={"red"}>
              &#123;{" "}
            </Text>
            DevDash
            <Text as="span" color={"red"}>
              {" "}
              &#125;
            </Text>
          </Text>
        </Flex>
        <Stack justify={"flex-end"} direction={"row"} spacing={{ base: "2", md: "6" }}>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
          {isAuth && isAuthor && (
            <Button as={NavLink} to={"/posts/new"} display={{ base: "none", md: "flex" }} leftIcon={<EditIcon />}>
              Create Post
            </Button>
          )}
          {isAuth ? (
            <Button
              onClick={() => {
                logout();
                nav("/");
                toast({
                  title: "Goodbye!",
                  description: "You have successfully logged out.",
                  status: "success",
                  duration: 1500,
                  isClosable: true,
                });
              }}
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight={600}
              color={"white"}
              bgGradient="linear(to-r, red.400, red.500, red.600)"
              _hover={{
                bgGradient: "linear(to-l, red.300, red.400, red.500)",
              }}
              display={{ base: "none", md: "flex" }}
              leftIcon={<TbLogout size={"1.2rem"} />}
            >
              Log Out
            </Button>
          ) : (
            <>
              <Button as={NavLink} to={"/login"} display={{ base: "none", md: "flex" }} leftIcon={<TbLogin size={"1.2rem"} />}>
                Log In
              </Button>
              <Button
                as={NavLink}
                to={"/register"}
                display={{ base: "none", md: "flex" }}
                bgGradient="linear(to-r, red.400, red.500, red.600)"
                _hover={{
                  bgGradient: "linear(to-l, red.300, red.400, red.500)",
                }}
                color={"white"}
                leftIcon={<IoPersonAdd size={".8rem"} />}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav onToggle={onToggle} isAuth={isAuth} logout={logout} isAuthor={isAuthor} />
      </Collapse>
    </Box>
  );
}
function MobileNav({ onToggle, isAuth, logout, isAuthor }) {
  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stack bg={bgColor} display={{ md: "none" }} onClick={onToggle}>
      {isAuth ? (
        <>
          <Text
            py={4}
            px={6}
            onClick={logout}
            cursor={"pointer"}
            display={"flex"}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={"gray.500"}
            fontWeight={600}
          >
            Log Out
          </Text>
          {isAuthor && (
            <Text
              py={4}
              px={6}
              as={NavLink}
              to={"/posts/new"}
              cursor={"pointer"}
              display={"flex"}
              borderBottom={1}
              borderStyle={"solid"}
              borderColor={"gray.500"}
              fontWeight={600}
            >
              Create Post
            </Text>
          )}
        </>
      ) : (
        <>
          <Text
            py={4}
            px={6}
            as={NavLink}
            to={"/login"}
            display={"flex"}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={"gray.500"}
            fontWeight={600}
          >
            Log In
          </Text>
          <Text
            py={4}
            px={6}
            as={NavLink}
            to={"/register"}
            display={"flex"}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={"gray.500"}
            fontWeight={600}
          >
            Register
          </Text>
        </>
      )}
    </Stack>
  );
}

MobileNav.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  isAuthor: PropTypes.bool,
};
