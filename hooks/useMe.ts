import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { User } from "@prisma/client";

const useMe = (): {
  user: User | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<User, any>("/me", fetcher);
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default useMe;
