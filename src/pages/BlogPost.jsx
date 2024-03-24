import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogPost, deleteBlogPost } from "../services/API";
import { DateTime } from "luxon";
import he from "he";
import DeleteBlogPostButton from "../components/DeleteBlogPostButton";
import Comments from "../components/Comments";
import Loading from "../components/Loading";
import heroImg from "../assets/hero-img.png";

export default function BlogPost() {
  const [postDetails, setPostDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { isAuth, isAuthor } = useContext(AuthContext);
  const { postID } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue("gray.900", "gray.400");
  const boxColor = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    async function getBlogPost() {
      try {
        const blogPost = await fetchBlogPost(postID);
        setPostDetails(blogPost);
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setPostDetails(null);
      } finally {
        setIsLoading(false);
      }
    }
    getBlogPost();
  }, [isAuth]);

  async function handleBlogPostDelete(postID) {
    try {
      await deleteBlogPost(postID);
      nav("/");
      toast({
        title: "Success!",
        description: "You have successfully deleted your blog post.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function formatDate(timestamp) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED);
  }

  return (
    <Box bg={boxColor} mt={"60px"}>
      {isLoading && <Loading />}
      {error && <Text>{error}</Text>}
      {postDetails && (
        <>
          <Container minH={"100vh"} maxW={"5xl"}>
            <SimpleGrid columns={1} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 18 }}>
              <Flex>
                <Image
                  rounded={"md"}
                  alt={"blog image"}
                  src={he.decode(postDetails.image)}
                  fit={"cover"}
                  fallbackSrc={heroImg}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "200px", md: "500px" }}
                ></Image>
              </Flex>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Flex justifyContent={"space-between"} flexDirection={{ base: "column", md: "row" }} gap={"20px"}>
                  <Box as="header" order={{ base: 2, md: 1 }}>
                    <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "xl", sm: "3xl", lg: "4xl" }}>
                      {he.decode(postDetails.title)}
                    </Heading>
                    <Text color={textColor} fontWeight={300} fontSize={"2xl"}>
                      {he.decode(postDetails.author.username)}
                    </Text>
                    <Text color={textColor} fontWeight={300} fontSize={"2xl"}>
                      {formatDate(postDetails.timeStamp)}
                    </Text>
                  </Box>
                  <Flex order={{ base: 1, md: 2 }}>
                    {isAuthor && (
                      <>
                        <Box fontSize="sm" margin="5px" zIndex="1">
                          <Button size="sm" p="2px 8px" colorScheme="blue" leftIcon={<EditIcon />} onClick={() => nav(`/posts/${postID}/edit`)}>
                            Edit Post
                          </Button>
                        </Box>
                        <DeleteBlogPostButton deleteBlogPost={() => handleBlogPostDelete(postDetails._id)} />
                      </>
                    )}
                  </Flex>
                </Flex>
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"} divider={<StackDivider borderColor={borderColor} />}>
                  <VStack whiteSpace={"pre-wrap"} spacing={{ base: 4, sm: 6 }}>
                    <Text fontSize={"lg"}>{he.decode(postDetails.content)}</Text>
                  </VStack>
                </Stack>
              </Stack>
            </SimpleGrid>
            <hr />
          </Container>
          <Comments />
        </>
      )}
    </Box>
  );
}
