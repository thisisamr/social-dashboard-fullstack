import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";
const CommentButton: FC<{ pid: number }> = ({ pid }) => {
  return (
    <Link href={`/post/${pid}`} passHref>
      <IconButton
        aria-label="comments"
        icon={<HiOutlineChatAlt2 />}
      ></IconButton>
    </Link>
  );
};

export default CommentButton;
