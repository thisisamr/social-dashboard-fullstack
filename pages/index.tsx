import { Flex, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import useMe from "../hooks";
import usePost from "../hooks/usePost";

const Home: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { user, isError, isLoading } = useMe();
  const { posts, isLoading: isloadindPosts, isError: isErrorPosts } = usePost();

  return (
    <div>
      {!user?.id ? <AuthForm /> : <CreatePost user={user} />}
      <Flex justify={"center"} align="center">
        <Stack mx={"auto"} spacing={0} width={1200} py={12} px={6}>
          {posts?.map((post, index) => {
            return <Post post={post} me={user?.email} key={post.id} />;
          })}
        </Stack>
      </Flex>
    </div>
  );
};

export default Home;
