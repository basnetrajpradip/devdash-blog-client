import { Button, Heading, Container, Flex, FormControl, Stack, FormLabel, Input, Textarea, useColorModeValue, useToast } from "@chakra-ui/react";

import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createBlogPost } from "../services/API";

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const { isAuth } = useContext(AuthContext);
  const nav = useNavigate();
  const toast = useToast();
  const borderColor = useColorModeValue("gray.400", "gray.600");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleImageChange(e) {
    setImage(e.target.value);
  }
  function handleContentChange(e) {
    setContent(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newBlogPost = await createBlogPost({ title, image, content });
      toast({
        title: "Success!",
        description: "New blog post added.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      nav(`/posts/${newBlogPost._id}`);
    } catch (err) {
      if (err.response.status === 401) {
        toast({
          title: "Oops!",
          description: "You're logged out. Log in",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      } else {
        console.log(err);
      }
    }
  }

  return (
    isAuth && (
      <Container h="100vh" maxW="5xl" mt="60px" p={{ base: 5, md: 8 }}>
        <Flex justifyContent={"center"}>
          <Heading as="h3" size="lg" fontWeight="bold" textAlign="center" mb="6">
            Create Blog Post
          </Heading>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel fontSize={19} fontWeight={700}>
                Title
              </FormLabel>
              <Input type="text" name="title" borderColor={borderColor} value={title} onChange={handleTitleChange}></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={19} fontWeight={700}>
                Image Url
              </FormLabel>
              <Input type="text" name="image" borderColor={borderColor} value={image} onChange={handleImageChange}></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={19} fontWeight={700}>
                Content
              </FormLabel>
              <Textarea
                borderColor={borderColor}
                minH={{ base: "200px", md: "400px" }}
                resize="vertical"
                name="content"
                value={content}
                onChange={handleContentChange}
              ></Textarea>
            </FormControl>
            <Flex justifyContent={"center"} gap={4}>
              <Button
                type="submit"
                w={28}
                bg={"red.500"}
                color="white"
                _hover={{
                  bg: "red.600",
                }}
              >
                Submit
              </Button>
              <Button as={NavLink} to={"/"} w={28} bg={"gray.600"} color={"white"} _hover={{ bg: "gray.700" }}>
                Cancel
              </Button>
            </Flex>
          </Stack>
        </form>
      </Container>
    )
  );
}
