import { Post } from "@prisma/client";
import fetcher from "../utils/fetcher";

export const createPost = (url: string, data: { text: string }) => {
  return fetcher(url, data);
};
