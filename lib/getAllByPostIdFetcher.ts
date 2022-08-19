import fetcher from "../utils/fetcher";

export const fetchAllComments = (url: string, data: { pid: number }) => {
  return fetcher(url, data);
};
