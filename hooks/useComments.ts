import useSWR from "swr";
import { CommentwithAuthor } from "../lib/types";
import fetcher from "../utils/fetcher";

const useComments = (): {
  comments: CommentwithAuthor[] | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<CommentwithAuthor[], any>(
    "comment/getAllByPostId",
    fetcher
  );
  return {
    comments: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default useComments;
