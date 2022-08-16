import { Button, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import React from "react";
import { mutate } from "swr";
import { deletePost } from "../lib/deletePostfetcher";
import { HiTrash } from "react-icons/hi";
const DeleteButton: React.FC<{ postid: number }> = ({ postid }) => {
  const toast = useToast();
  return (
    <Tooltip
      hasArrow
      label="you can delete this post"
      background={"red.600"}
      fontSize="xs"
    >
      <IconButton
        onClick={async () => {
          const deleted = await deletePost("post/delete", { id: postid });
          if (deleted.error) {
            toast({
              status: "error",
              title: "error",
              description: deleted.error,
              duration: 3000,
              position: "top",
            });
          } else {
            toast({
              status: "info",
              colorScheme: "blue",
              description: "Post Deleted",
              position: "bottom",
              size: "xs",
              isClosable: true,
              variant: "subtle",
              duration: 1500,
            });
          }
          mutate("post");
        }}
        icon={<HiTrash />}
        colorScheme="red"
        aria-label="Delete Post"
        variant={"outline"}
        size={"xs"}
      />
    </Tooltip>
  );
};
export default DeleteButton;
