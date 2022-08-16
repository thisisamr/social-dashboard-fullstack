import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { mutate } from "swr";
import { logout } from "../lib/logoutFetcher";

const LogOutButton = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  return (
    <Button
      isLoading={loading}
      variant={"solid"}
      colorScheme="twitter"
      leftIcon={<LockIcon />}
      onClick={async () => {
        try {
          setLoading(true);
          const res = await logout("/logout");
          setLoading(false);
          toast({
            title: "Success",
            status: "success",
            description: res?.message,
            colorScheme: "green",
            isClosable: true,
            icon: <CheckCircleIcon />,
            position: "top",
          });

          mutate("me");
        } catch (error) {
          setLoading(false);
          console.log(error);

          toast({
            status: "error",
            position: "top",
            title: "error",
            description: "something went wrong",
            colorScheme: "red",
            isClosable: true,
          });
        }
      }}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
