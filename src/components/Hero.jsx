import { Button, Flex, Heading, Image, Stack, Text, Icon, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { IoPersonAdd } from "react-icons/io5";
import heroImg from "../assets/hero-img.png";

export default function Hero() {
  const { isAuth } = useContext(AuthContext);
  return (
    <Stack
      minH="40vh"
      direction={{ base: "column", md: "row" }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                zIndex: -1,
              }}
              color={useColorModeValue("gray.900", "white")}
            >
              Welcome to
            </Text>
            <br />{" "}
            <Text color={"red"} as={"span"}>
              The{" "}
              <Text as="span" color={"red"}>
                &#123;{" "}
              </Text>
              <Text as="span" color={useColorModeValue("gray.900", "white")}>
                DevDash
              </Text>
              <Text as="span" color={"red"}>
                {" "}
                &#125;
              </Text>{" "}
              Blog
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={useColorModeValue("gray.800", "gray.200")}>
            Hello! This is Pradip. I am a full stack developer based in Nepal🇳🇵. This is a blog site created with MERN stack.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            {!isAuth && (
              <Button
                as={Link}
                to="/register"
                rounded={"full"}
                bgGradient="linear(to-r, red.400, red.500, red.600)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-l, red.300, red.400, red.500)",
                }}
                leftIcon={<IoPersonAdd size={".8rem"} />}
              >
                Register
              </Button>
            )}
            <Button as="a" href="https://github.com/basnetrajpradip" bg={useColorModeValue("gray.300", "gray.700")} target="_blank" rounded={"full"}>
              <Icon as={FaGithub} h={4} w={4} />
              <Text as="span" ml={1}>
                {" "}
                Github
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} display={{ base: "none", md: "block" }} src={heroImg} height={"600px"} />
      </Flex>
    </Stack>
  );
}
