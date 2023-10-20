import React from "react";
import { Button, Modal } from "@mantine/core";

const DeleteModal = ({ isOpen, onClose, onConfirm,name }) => {
  return (
      <Modal.Root opened={isOpen} onClose={onClose}>
  <Modal.Overlay />
  <Modal.Content>
    <Modal.Header>
      <Modal.Title><b>Please Confirm</b></Modal.Title>
      <Modal.CloseButton />
    </Modal.Header>
    <Modal.Body>
        <p>Are you sure you want to delete {name}?</p>
        <Button mt="lg" onClick={onConfirm}>Yes, Delete</Button>
        <Button ml="sm" color="gray" onClick={onClose}>Cancel</Button>

    </Modal.Body>
  </Modal.Content>
</Modal.Root>
  );
};  

export default DeleteModal;
