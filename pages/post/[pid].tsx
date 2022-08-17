import { GetServerSideProps, NextPage } from "next";
import { prisma } from "../../prisma/prisma";
import { Box } from "@chakra-ui/react";
import { IPostWithAutherCommentsLikes } from "../../lib/types";
import PostDetails from "../../components/PostDetails";
const readmore: NextPage<{
  post: IPostWithAutherCommentsLikes;
  error?: any;
}> = (props) => {
  return <PostDetails post={props?.post} error={props?.error} />;
};
export default readmore;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { pid } = query;
  if (pid && !isNaN(+pid)) {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: +pid,
        },
        include: {
          auhtor: {
            select: {
              createdat: true,
              firstname: true,
              id: true,
              imageurl: true,
              _count: { select: { posts: true } },
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  createdat: true,
                  firstname: true,
                  id: true,
                  imageurl: true,
                  _count: { select: { posts: true } },
                },
              },
            },
            orderBy: {},
          },
          likes: {
            include: {
              author: {
                select: {
                  createdat: true,
                  firstname: true,
                  id: true,
                  imageurl: true,
                  _count: { select: { posts: true } },
                },
              },
            },
          },
        },
      });
      return {
        props: {
          post,
          error: post?.id ? null : "Post Not Found",
        },
      };
    } catch (error: any) {
      return {
        props: {
          post: null,
          error: error.message,
        },
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
};
