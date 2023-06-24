import clsx from "clsx";
import { PropsWithChildren, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../stores/auth";
import { Button } from "hds-react";
import { logOutUser } from "../utils/auth";

// HeaderNavigationLink

interface HeaderNavigationLinkProps extends NavLinkProps {}

const HeaderNavigationLink = ({
  className,
  children,
  ...otherProps
}: PropsWithChildren<HeaderNavigationLinkProps>) => {
  return (
    <NavLink
      {...otherProps}
      className={({ isActive }) => {
        return twMerge(
          clsx("font-medium", isActive && "text-blue-800", className)
        );
      }}
    >
      {children}
    </NavLink>
  );
};

// HeaderNavigationLink

// HeaderPublicNav

const HeaderPublicNav = () => {
  return (
    <nav>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <HeaderNavigationLink to="/auth/login">Login</HeaderNavigationLink>
        </li>
        <li>
          <HeaderNavigationLink to="/auth/register">
            Register
          </HeaderNavigationLink>
        </li>
        <li>
          <HeaderNavigationLink to="/auth/confirm">
            Confirm
          </HeaderNavigationLink>
        </li>
      </ul>
    </nav>
  );
};

// HeaderPublicNav

interface HeaderProps {
  className?: string;
}

const Header = (props: HeaderProps) => {
  const { className } = props;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async () => {
    try {
      setIsSigningOut(true);
      logOutUser();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div
      className={twMerge(
        clsx("flex justify-between w-full items-center", className)
      )}
    >
      <span className="font-semibold sm:block hidden text-lg text-blue-700">
        IdentityFortress
      </span>
      <span className="font-semibold sm:hidden block text-lg text-blue-700">
        IF
      </span>
      {!isAuthenticated && <HeaderPublicNav></HeaderPublicNav>}
      {isAuthenticated && (
        <Button
          size="small"
          variant="secondary"
          onClick={signOut}
          isLoading={isSigningOut}
          loadingText="Sign Out"
        >
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Header;
