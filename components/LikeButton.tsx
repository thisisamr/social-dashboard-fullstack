import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { HiOutlineThumbUp } from "react-icons/hi";
import { mutate } from "swr";
import { likePost } from "../lib/likePostFetcher";
const Likebutton: FC<{
  pid?: number;
  authorEmail?: string;
  setNumberoflikes: Dispatch<SetStateAction<number>>;
}> = ({ pid, authorEmail, setNumberoflikes }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  return (
    <Tooltip
      placement="left"
      hasArrow
      label={authorEmail ? "smash the like Button" : "please login to like"}
      bg={authorEmail ? "green.600" : "red.500"}
    >
      <IconButton
        isLoading={loading}
        onClick={async () => {
          if (!authorEmail) {
            return;
          }
          try {
            setNumberoflikes((n) => n + 1);
            await likePost("post/like", {
              pid: pid,
            });
            toast({
              colorScheme: "green",
              duration: 5000,
              isClosable: true,
              status: "info",
              icon: <CheckCircleIcon color={"blue.500"} />,
              description: "you liked this post",
              position: "bottom",
            });
            //here i would turn it into an optimistic ui thing
            await mutate("post");
          } catch (error: any) {
            setNumberoflikes((n) => n - 1);
            let msg: string = "";
            switch (error?.info?.error?.code) {
              case "P1001":
                msg = "Cannot reach DbServers Check with the system admin";
                break;
              case "P2025":
                msg = "no post found with the provided id";
                break;

              default:
                msg = error?.info?.error;
                break;
            }
            toast({
              colorScheme: "red",
              isClosable: true,
              duration: 5000,
              description: msg,
              position: "top",
              title: "error",
              status: "error",
              icon: <WarningIcon color={"red.500"} />,
            });
            setLoading(false);
          }

          //go and like this post with pid
        }}
        aria-label="Like button"
        icon={<HiOutlineThumbUp />}
      />
    </Tooltip>
  );
};

export default Likebutton;
