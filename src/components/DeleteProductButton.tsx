import React, { useRef } from "react";
import { ProductCardProps } from "../types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteImage, deleteProduct } from "../api/firebase";

function DeleteProductButton({
  productData,
  rightIcon,
  leftIcon,
  size,
  isIconButton,
}: ProductCardProps & {
  rightIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
  size?: string;
  isIconButton?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      {isIconButton ? (
        <IconButton
          aria-label="Delete Item"
          colorScheme="red"
          onClick={onOpen}
          borderRadius={8}
          variant="solid"
          size={size ?? "sm"}
          icon={leftIcon}
        />
      ) : (
        <Button
          colorScheme="red"
          onClick={onOpen}
          borderRadius={8}
          rightIcon={rightIcon}
          leftIcon={leftIcon}
          variant="solid"
          size={size ?? "sm"}
        >
          Delete
        </Button>
      )}

      <AlertDialog
        isOpen={isOpen}
        //@ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay backdropFilter="blur(2px)">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete item
            </AlertDialogHeader>

            <AlertDialogBody>
              You are about to delete "{productData.name}". This action is irreversible!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                //@ts-ignore
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (!productData.id) return;
                  deleteImage(productData.image);
                  deleteProduct(productData.id ?? "");
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteProductButton;
