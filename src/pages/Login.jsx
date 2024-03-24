import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const nav = useNavigate();
  axios.defaults.withCredentials = true;

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await login(formData);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      nav("/");
    } catch (err) {
      if (err.response.status === 401) {
        toast({
          title: "Oops!",
          description: "Incorrect username or password.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      } else {
        toast({
          title: "Oops!",
          description: `${err.message}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    }
  }

  return (
    <Flex justify={"center"} align={"center"} minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={3} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading textAlign={"center"} fontSize={"4xl"}>
            Welcome Back!
          </Heading>
          <Text textAlign={"center"} fontSize={"lg"} color={"gray.500"}>
            Log in to access your{" "}
            <Text as={"span"} color={useColorModeValue("gray.800", "white")} fontWeight={600}>
              <Text as="span" color={"red"}>
                &#123;{" "}
              </Text>
              DevDash
              <Text as="span" color={"red"}>
                {" "}
                &#125;
              </Text>{" "}
            </Text>
            account.
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" onChange={handleFormChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} name="password" onChange={handleFormChange} />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack pt={2}>
                <Button
                  type="submit"
                  size="lg"
                  bgGradient="linear(to-r, red.400, red.500, red.600)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-l, red.300, red.400, red.500)",
                  }}
                >
                  Log In
                </Button>
              </Stack>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don&apos;t have an acount?{" "}
                <Text
                  as={Link}
                  to="/register"
                  color={"red.500"}
                  fontWeight={600}
                  _hover={{
                    color: "red.400",
                  }}
                >
                  Sign up here.
                </Text>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
