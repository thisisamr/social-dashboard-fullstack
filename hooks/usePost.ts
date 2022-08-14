import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { Post, User } from "@prisma/client";

const usePost = (): {
  posts: Post[] | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<Post[], any>("/post", fetcher);
  return {
    posts: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default usePost;
