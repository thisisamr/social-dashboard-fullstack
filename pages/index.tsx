import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import CreatePost from "../components/CreatePost";
import useMe from "../hooks";

const Home: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { user, isError, isLoading } = useMe();

  return <div>{!user?.id ? <AuthForm /> : <CreatePost user={user} />}</div>;
};

export default Home;
