import { LinkProps, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Link as ChakraLink } from "@chakra-ui/react";
interface NavLinkProps extends LinkProps {
  children?: string | JSX.Element;
  to: string;
  activeProps?: LinkProps;
  _hover?: LinkProps;
}
const NavLink: React.FC<NavLinkProps> = ({
  to,
  activeProps,
  children,
  _hover,
  ...props
}) => {
  const router = useRouter();
  const isActive = router.pathname === to;
  const color = useColorModeValue("black", "white");
  if (isActive) {
    return (
      <Link href={to} passHref>
        <ChakraLink
          fontWeight={"bold"}
          {...props}
          {...activeProps}
          _hover={{ color: "selected" }}
          color={color}
        >
          {children}
        </ChakraLink>
      </Link>
    );
  }
  return (
    <Link href={to} passHref>
      <ChakraLink
        fontWeight={"bold"}
        {...props}
        {...activeProps}
        _hover={{ color: "selected" }}
        color={color}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};
export default NavLink;
