import {
  Button,
  Heading,
  Container,
  Flex,
  FormControl,
  Stack,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchBlogPost, updateBlogPost } from "../services/API";
import Loading from "../components/Loading";
import he from "he";

export default function EditBlogPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const nav = useNavigate();
  const toast = useToast();
  const { postID } = useParams();
  const borderColor = useColorModeValue("gray.400", "gray.600");

  useEffect(() => {
    async function getBlogPost() {
      try {
        const blogPost = await fetchBlogPost(postID);
        setTitle(he.decode(blogPost.title));
        setImage(he.decode(blogPost.image));
        setContent(he.decode(blogPost.content));
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setTitle("");
        setImage("");
        setContent("");
      } finally {
        setIsLoading(false);
      }
    }
    getBlogPost();
  }, []);

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
      const updatedPost = await updateBlogPost(postID, {
        title,
        image,
        content,
      });
      toast({
        title: "Success!",
        description: "Blog post successfully updated",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      nav(`/posts/${updatedPost._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {isLoading && <Loading message="Loading Post Details..." />}
      {error && <Text>{error}</Text>}
      {isAuth && (
        <Container h="100vh" maxW="5xl" mt="60px" p={{ base: 5, md: 8 }}>
          <Flex justifyContent={"center"}>
            <Heading as="h3" size="lg" fontWeight="bold" textAlign="center" mb="6">
              Update Blog Post
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
                  Update
                </Button>
                <Button as={NavLink} to={"/"} w={28} bg={"gray.600"} color={"white"} _hover={{ bg: "gray.700" }}>
                  Cancel
                </Button>
              </Flex>
            </Stack>
          </form>
        </Container>
      )}
    </>
  );
}
