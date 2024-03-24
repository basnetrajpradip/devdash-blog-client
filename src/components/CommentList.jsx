import { Container, Heading, Flex, Text, Stack } from "@chakra-ui/react";
import Loading from "./Loading";
import CommentCard from "./CommentCard";
import PropTypes from "prop-types";

export default function CommentList({ comments, isLoading, error, deleteComment }) {
  return (
    <>
      {isLoading && <Loading message="Loading comments..." />}
      {error && <Text>{error}</Text>}
      {comments && comments.length > 0 && (
        <>
          <hr />
          <Container maxW="5xl" p={{ base: 5, md: 8 }}>
            <Flex justifyContent="start">
              <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={{ base: "4", md: "2" }}>
                {`Comments (${comments.length})`}
              </Heading>
            </Flex>
            <Stack direction="column" spacing={5} my={4}>
              {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} deleteComment={deleteComment} />
              ))}
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  deleteComment: PropTypes.func.isRequired,
};
