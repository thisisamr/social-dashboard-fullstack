import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { Comment, User } from "@prisma/client";
import { FC } from "react";
import BlogAuther from "./BlogAuthor";
const CommentComponent: FC<{
  comment: Comment & {
    author: User;
  };
}> = ({ comment }) => {
  return (
    <Flex align={"center"} justify="center">
      <Stack spacing={8} mx="auto" width={1200} px={6}>
        <Center p={2}>
          <Box maxW={800} width="full" rounded={"md"} p={6} overflow={"hidden"}>
            <Text as={"p"}>{comment?.text}</Text>
            {<BlogAuther author={comment.author} />}
          </Box>
        </Center>
      </Stack>
    </Flex>
  );
};
export default CommentComponent;
