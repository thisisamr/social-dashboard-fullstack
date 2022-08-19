import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/authmodefetcher";
import { authMode } from "../lib/types";
import { CheckCircleIcon, MoonIcon } from "@chakra-ui/icons";

export default function AuthForm() {
  const headingcolor = useColorModeValue("gray.700", "gray.400");
  const [loginForm, setLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { mutate, cache } = useSWRConfig();
  const toast = useToast();
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        {loginForm && (
          <Heading color={headingcolor} fontSize={["xl", "2xl"]}>
            Sign in to your account
          </Heading>
        )}
        {!loginForm && <Heading color={headingcolor}>Sign up now!</Heading>}
        <Text fontSize={"md"} color={"gray.600"}>
          to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack
          spacing={4}
          as="form"
          onSubmit={async (e) => {
            setLoading(true);
            e.preventDefault();
            if (loginForm) {
              const response = await auth(authMode.SIGNIN, { email, password });
              response.message
                ? toast({
                    colorScheme: "red",
                    isClosable: true,
                    duration: 5000,
                    description: response.message,
                    position: "top",
                    title: "error",
                    status: "error",
                  })
                : toast({
                    colorScheme: "green",
                    duration: 5000,
                    isClosable: true,
                    status: "success",
                    description: "you are now logged in ⚡️",
                    icon: <CheckCircleIcon color={"green:500"} />,
                    position: "top",
                  });
              setLoading(false);
              await mutate("me");
            }
            //send to signup route
            else {
              const response = await auth(authMode.SIGNUP, {
                email,
                password,
                firstname,
                avatar,
              });
              response.message
                ? toast({
                    colorScheme: "red",
                    isClosable: true,
                    duration: 5000,
                    description: response.message,
                    position: "top",
                    title: "error",
                    status: "error",
                  })
                : toast({
                    colorScheme: "green",
                    duration: 5000,
                    isClosable: true,
                    status: "success",
                    description: `Hello , ${response.firstname} 🤞  `,
                    position: "top",
                  });
              setLoading(false);
              await mutate("me");
            }
          }}
        >
          (
          {!loginForm && (
            <FormControl id="firstname">
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                placeholder="John skywalker"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          )}
          ) (
          {!loginForm && (
            <FormControl id="avatar">
              <FormLabel>Avatar</FormLabel>
              <Input
                type="url"
                placeholder="https://someserver/user/1231423432432.jpg"
                onChange={(e) => setAvatar(e.target.value)}
              />
            </FormControl>
          )}
          )
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox onChange={(e) => console.log(e.target.checked)}>
                Remember me
              </Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              isLoading={loading}
            >
              {loginForm ? "Sign in" : "Sign up"}
            </Button>
            <Stack alignItems={"center"}>
              <Text>
                <Link
                  onClick={() => setLoginForm(!loginForm)}
                  color={"blue.400"}
                >
                  {loginForm
                    ? "Not a user Signup now"
                    : "Login to your account"}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
