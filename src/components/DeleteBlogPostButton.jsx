import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import DeleteModal from "./DeleteModal";
import PropTypes from "prop-types";

export default function DeleteBlogPostButton({ deleteBlogPost }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box fontSize="sm" margin="5px" zIndex="1">
        <Button onClick={onOpen} size="sm" p="2px 8px" colorScheme="red" leftIcon={<DeleteIcon />}>
          Delete Post
        </Button>
      </Box>
      <DeleteModal
        message="Delete blog post?"
        onConfirm={() => {
          deleteBlogPost();
          onClose();
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

DeleteBlogPostButton.propTypes = {
  deleteBlogPost: PropTypes.func.isRequired,
};
