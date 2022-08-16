import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { IPostWithAutherCommentsLikes } from "../lib/types";
import DeleteButton from "./DeleteButton";

const Post: React.FC<{ post: IPostWithAutherCommentsLikes; me?: string }> = ({
  post,
  me,
}) => {
  const color = useColorModeValue("white", "gray.900");

  return (
    <Center py={6}>
      <Box
        maxWidth={800}
        w={"full"}
        bg={color}
        boxShadow={"2xl"}
        rounded={"md"}
        padding={6}
        overflow={"hidden"}
      >
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Post
          </Text>
          <Text color={"gray.500"}>{post.text}</Text>
        </Stack>
        <Stack mt={10} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            name={post?.auhtor?.firstname}
            src={post?.auhtor?.imageurl || undefined}
          />
          <Stack direction={"column"} spacing={0} fontSize="sm">
            <Text fontWeight={500} fontSize="xs">
              {post?.auhtor?.email}
            </Text>
            <Text color={"gray.500"}>{post?.createdat?.toLocaleString()}</Text>
          </Stack>
        </Stack>
        <Stack mt={8} direction={"row"} spacing={6}>
          {post?.auhtor?.email === me ? <DeleteButton postid={post.id} /> : ""}
        </Stack>
        <Stack direction={"row"} spacing={6} justify="center">
          <Stack spacing={0} align={"center"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              {post?.likes?.length}
            </Text>
            {/**likes button */}
          </Stack>
          <Stack spacing={0} align="center">
            <Text fontSize={"sm"} color={"gray.500"}>
              {post?.comments?.length}
            </Text>
            {/**comment icon */}
          </Stack>
        </Stack>
        <Flex justify={"center"} mt={4}>
          <Button
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 255 / 48%), 0 10px 10px -5px rgba(66 153 255 / 43%)"
            }
            _hover={{
              bg: "blue.500",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            _focus={{
              bg: "blue.500",
            }}
            fontSize="xs"
            color={"white"}
            bg={"blue.400"}
            rounded={"full"}
            onClick={() => {
              router.push(`/post/${post?.id}`);
            }}
          >
            Read More
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default Post;
