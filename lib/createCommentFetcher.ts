import { Post } from "@prisma/client";
import fetcher from "../utils/fetcher";

export const createComment = (
  url: string,
  data: {
    pid: number;
    text: string;
  }
) => {
  return fetcher(url, data);
};
