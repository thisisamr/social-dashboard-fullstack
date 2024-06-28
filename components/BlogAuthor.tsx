import { Avatar, Box, HStack, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { User } from "@prisma/client";
import { auth } from "../lib/authmodefetcher";

const BlogAuthor: FC<{
  author: {
    id: number;
    email: string;
    firstname: string;
    imageurl: string | null;
  };
  createdAt: string;
}> = ({ author, createdAt }) => {
  return (
    <HStack mt={2} spacing={2} display={"flex"} alignItems="center">
      <Avatar
        boxSize={"40px"}
        src={author?.imageurl || ""}
        name={author?.firstname}
      />
      <Text fontWeight={"md"}>{author?.firstname}</Text>
      <Text fontWeight={"md"} fontSize={["x-small", "xs"]} color={"gray.500"}>
        {createdAt}
      </Text>
      <Text></Text>
    </HStack>
  );
};

export default BlogAuthor;
