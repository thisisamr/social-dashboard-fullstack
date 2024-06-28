import { CheckCircleIcon, LockIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { logout } from "../lib/logoutFetcher";

const LogOutButton = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate, cache } = useSWRConfig();
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

          await mutate("me");
          await router.push("/");
        } catch (error) {
          setLoading(false);
          toast({
            status: "error",
            position: "top",
            title: "error",
            description: "something went wrong",
            colorScheme: "red",
            isClosable: true,
            icon: <WarningIcon color={"red.500"} />,
          });
        }
      }}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
