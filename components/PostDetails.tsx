import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import useMe from "../hooks";
import useComments from "../hooks/useComments";
import { IPostWithAutherCommentsLikes } from "../lib/types";
import AuthForm from "./AuthForm";
import CommentComponent from "./Comment";
import CommentForm from "./CommentForm";
import Likebutton from "./LikeButton";
const PostDetails: React.FC<{
  post: IPostWithAutherCommentsLikes;
  error: any;
}> = ({ post, error: err }) => {
  const { userObj, isError, isLoading } = useMe();
  const color = useColorModeValue("white", "gray.900");
  const [numberOfLikes, setNumberoflikes] = useState(post?.likes.length);
  const {
    comments,
    isError: errorComments,
    isLoading: loadingComments,
  } = useComments(post?.id);

  return (
    <>
      <Flex align={"center"} justify="center">
        <Stack spacing={8} width={1200} mx="auto" py={6} px={6}>
          <Center py={6}>
            {post !== null && (
              <Box
                maxW={800}
                width="full"
                boxShadow={"2xl"}
                rounded={"md"}
                overflow="hidden"
                p={6}
                bg={color}
              >
                <Stack>
                  <Text
                    color={"green.500"}
                    textTransform={"uppercase"}
                    fontWeight={800}
                    fontSize="sm"
                    letterSpacing={1.1}
                  >
                    Post
                  </Text>
                  <Text color={"gray.500"}>{post?.text}</Text>
                </Stack>
                <Stack mt={10} direction={"row"} spacing={4} align="center">
                  <Avatar
                    src={post?.auhtor?.imageurl ? post?.auhtor?.imageurl : ""}
                    name={post?.auhtor?.firstname}
                  />
                  <Stack direction={"column"} spacing={0} fontSize="sm">
                    <Text fontWeight={600}>{post?.auhtor.email}</Text>
                    <Text
                      color={"gray.500"}
                      fontSize={["sm"]}
                      _hover={{
                        color: "gray.100",
                        transition: "1s",
                        cursor: "pointer",
                      }}
                    >
                      {post?.createdat.toUTCString()}
                    </Text>
                  </Stack>
                </Stack>
                <Stack direction={"row"} justify="center" spacing={6}>
                  <Stack spacing={0} align="center">
                    <Text fontSize={"sm"} color="gray.500">
                      {numberOfLikes}
                    </Text>
                    <Likebutton
                      pid={post?.id}
                      authorEmail={userObj?.email}
                      setNumberoflikes={setNumberoflikes}
                    />
                  </Stack>
                </Stack>
              </Box>
            )}
            {post == null && (
              <Heading color={"green.500"} fontWeight={800}>
                Post Not Found
              </Heading>
            )}
          </Center>
        </Stack>
      </Flex>
      <Center h={20}>
        <Divider width={"80%"} orientation="horizontal" />
      </Center>
      {userObj !== null ? <CommentForm id={post?.id} /> : <AuthForm />}
      {comments
        ? comments?.map((c, i) => {
            return <CommentComponent key={i} commentwithauthor={c} />;
          })
        : ""}
    </>
  );
};

export default PostDetails;
