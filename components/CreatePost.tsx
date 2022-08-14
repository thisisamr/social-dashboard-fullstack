import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useMe from "../hooks";
import usePost from "../hooks/usePost";
import { createPost } from "../lib/createPostfetcher";
import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import { AuthUserObject } from "../lib/types";

const CreatePost: React.FC<{ user: AuthUserObject }> = () => {
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [state, setState] = useState("initial");
  const [loading, setIsloading] = useState(false);
  const { posts, isLoading: isloadindPosts, isError: isErrorPosts } = usePost();
  return (
    <Flex minH={"20vh"} align={"center"} justify="center">
      <Container
        maxWidth={"lg"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded="lg"
        padding={6}
        flexDirection="column"
        mt={5}
        border="1px solid #80808038"
      >
        <Heading fontSize={{ base: "xl", sm: "2xl" }} textAlign="center" mb={5}>
          Speak your Mind
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          as={"form"}
          spacing={"12px"}
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setIsloading(true);
              const response = await createPost("post/create", { text });
              if (response.error) {
                throw new Error(response.error);
              }
              setIsloading(false);
              toast({
                status: "success",
                colorScheme: "green",
                position: "top",
                title: "success",
                icon: <CheckCircleIcon color={"green.500"} />,
                description: "Successfully Posted ",
              });
              setSubmitted(true);
              setText("");
              setTimeout(() => {
                setSubmitted(false);
              }, 1500);
            } catch (error) {
              toast({
                status: "error",
                colorScheme: "pink",
                position: "top",
                title: "error",
                description: "Error creating a post",
              });
              setIsloading(false);
            }
          }}
        >
          <FormControl>
            <Input
              variant="solid"
              borderWidth={1}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              type="text"
              required
              placeholder="what's on your mind ?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            width={["100%", "100px"]}
            variant={"solid"}
            isLoading={loading}
            disabled={text.length == 0}
          >
            {submitted ? (
              <CheckCircleIcon color={"#29FB40"} />
            ) : (
              <Text>Go</Text>
            )}
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
};

export default CreatePost;
