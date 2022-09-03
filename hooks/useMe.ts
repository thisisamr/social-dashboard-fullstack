import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { User } from "@prisma/client";

const useMe = (): {
  userObj: User | null | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<User | null, any>("me", fetcher);
  return {
    userObj: data,
    isLoading: !data && data !== null && !error,
    isError: error,
  };
};
export default useMe;
