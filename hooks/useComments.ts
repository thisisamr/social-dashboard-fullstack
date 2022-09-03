import useSWR from "swr";
import { fetchAllComments } from "../lib/getAllByPostIdFetcher";
import { CommentwithAuthor } from "../lib/types";
import fetcher from "../utils/fetcher";

const useComments = (
  id: number
): {
  comments: CommentwithAuthor[] | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<CommentwithAuthor[], any>(
    `comment/postId/${id}`,
    fetcher
  );
  return {
    comments: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default useComments;
