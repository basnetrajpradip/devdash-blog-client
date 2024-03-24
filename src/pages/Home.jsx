import { Box, Container, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchAllBlogPosts } from "../services/API";
import Loading from "../components/Loading";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    async function getBlogPosts() {
      try {
        const allBlogPosts = await fetchAllBlogPosts();
        setBlogPosts(allBlogPosts);
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    getBlogPosts();
  }, [isAuth]);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.800")} mt={{ base: "60px", md: "60px" }}>
      <Hero />
      {isLoading && <Loading message={"Loading Posts"} />}
      {error && <Text>{error}</Text>}
      {blogPosts && (
        <Container /* minHeight="100vh" */ maxWidth="1600px" mx="auto" my={{ base: "3", md: "auto" }} p={{ base: 5, md: 10 }}>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="10">
            {blogPosts.map((post) => {
              return <BlogCard key={post._id} post={post} />;
            })}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}
