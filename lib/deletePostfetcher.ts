import { Post } from "@prisma/client";
import fetcher from "../utils/fetcher";

export const deletePost = (url: string, data: { id: number | string }) => {
  return fetcher(url, data);
};
