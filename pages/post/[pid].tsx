import { GetServerSideProps, NextPage } from "next";
import { Box } from "@chakra-ui/react";
const readmore: NextPage<{ id: number }> = ({ id }) => {
  return <Box>{id}</Box>;
};
export default readmore;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      id: 1,
    },
  };
};
