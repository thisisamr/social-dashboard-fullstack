import fetcher from "../utils/fetcher";

export const likePost = (
  url: string,
  data: { pid?: number; authorEmail?: string }
) => {
  return fetcher(url, data);
};
