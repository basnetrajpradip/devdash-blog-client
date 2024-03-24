import { Container, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, deleteComment } from "../services/API";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function Comments() {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postID } = useParams();
  const toast = useToast();

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    try {
      const postComments = await fetchComments(postID);
      setComments(postComments);
      setError(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setComments(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCommentDelete(commentID) {
    try {
      await deleteComment(postID, commentID);
      getComments();
      toast({
        title: "Success!",
        description: "You have successfully deleted your comment.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container maxW="5xl">
      <CommentForm comments={comments} setComments={setComments} />
      <CommentList comments={comments} isLoading={isLoading} error={error} deleteComment={handleCommentDelete} />
    </Container>
  );
}
