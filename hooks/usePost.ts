import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { Post, User } from "@prisma/client";
import { IPostWithAutherCommentsLikes } from "../lib/types";

const usePost = (): {
  posts: IPostWithAutherCommentsLikes[] | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<IPostWithAutherCommentsLikes[], any>(
    "post",
    fetcher
  );
  return {
    posts: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default usePost;
