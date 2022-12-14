import { Avatar, Box, HStack, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { User } from "@prisma/client";
import { auth } from "../lib/authmodefetcher";

const BlogAuthor: FC<{ author: User }> = ({ author }) => {
  return (
    <HStack mt={2} spacing={2} display={"flex"} alignItems="center">
      <Avatar boxSize={"40px"} src={author?.imageurl || ""} />
      <Text fontWeight={"md"}>{author?.firstname}</Text>
      <Text></Text>
      <Text></Text>
    </HStack>
  );
};

export default BlogAuthor;
