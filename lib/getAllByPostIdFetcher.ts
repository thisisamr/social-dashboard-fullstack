import fetcher from "../utils/fetcher";

export const fetchAllComments = (url: string) => {
  return fetcher(url);
};
