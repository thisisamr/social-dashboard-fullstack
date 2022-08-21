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
import { createPost } from "../lib/createPostfetcher";
import { CheckCircleIcon, CheckIcon, WarningIcon } from "@chakra-ui/icons";
import { mutate } from "swr";

const CreatePost = () => {
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [state, setState] = useState("initial");
  const [loading, setIsloading] = useState(false);
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
                isClosable: true,
                duration: 1000,
              });
              await mutate("post");

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
                icon: <WarningIcon color={"red.500"} />,
              });
              setIsloading(false);
            }
          }}
        >
          <FormControl>
            <Input
              variant="solid"
              bgColor={"gray.100"}
              color={"gray.800"}
              borderWidth={1}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              type="text"
              required
              placeholder="what's on your mind ?"
              _placeholder={{ color: "gray.400" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            width={75}
            variant={"solid"}
            colorScheme="twitter"
            isLoading={loading}
            disabled={text.length == 0}
          >
            {submitted ? <CheckIcon color={"#29FB40"} /> : <Text>Go</Text>}
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
};

export default CreatePost;
