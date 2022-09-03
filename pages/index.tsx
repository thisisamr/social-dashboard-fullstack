import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import { validateToken } from "../lib/Auth";
const Home: NextPage<{ userObj: User | null }> = ({ userObj }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { posts, isLoading: isloadindPosts, isError: isErrorPosts } = usePost();
  const CustomSkeleton = () => {
    return (
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    );
  };
  return (
    <div>
      {userObj === null ? <AuthForm /> : <CreatePost />}

      <Flex justify={"center"} align="center">
        <Stack mx={"auto"} spacing={0} width={1200} py={12} px={6}>
          {isloadindPosts && (
            <div>
              <CustomSkeleton />
              <CustomSkeleton />
              <CustomSkeleton />
            </div>
          )}
          {posts?.map((post, index) => {
            return <Post post={post} me={userObj?.email} key={post.id} />;
          })}
        </Stack>
      </Flex>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
  let userObj = null;
  try {
    userObj = await validateToken(token);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return {
    props: {
      userObj,
    },
  };
};
