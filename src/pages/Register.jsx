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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const toast = useToast();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await register(formData);
      toast({
        title: "Success!",
        description: "Account created. You can now login.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      nav("/login");
    } catch (err) {
      if (err.response.status === 409) {
        toast({
          title: "Oops!",
          description: "Username already exists.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      } else {
        toast({
          title: "Oops!",
          description: `${err.response.data.errors[0].msg}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    }
  }

  return (
    <Flex justify={"center"} align={"center"} minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading textAlign={"center"} fontSize={"4xl"}>
            Sign Up
          </Heading>
          <Text textAlign={"center"} fontSize={"lg"} color={"gray.500"}>
            Register an account to join{" "}
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
            community.
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
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} name="confirmPassword" onChange={handleFormChange} />
                  <InputRightElement>
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
                  Sign Up
                </Button>
              </Stack>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Text
                  as={Link}
                  to="/login"
                  color={"red.500"}
                  fontWeight={600}
                  _hover={{
                    color: "red.400",
                  }}
                >
                  Sign in here.
                </Text>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
