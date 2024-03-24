import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

export default function DeleteModal({ message, onConfirm, isOpen, onClose }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{message}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>You cannot undo this action.</ModalBody>
        <ModalFooter gap="3">
          <Button colorScheme="red" leftIcon={<DeleteIcon />} onClick={onConfirm}>
            Delete
          </Button>
          <Button
            bg={"gray.500"}
            color={"white"}
            _hover={{
              bg: "gray.700",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

DeleteModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
