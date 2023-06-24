import { NavLink, NavLinkProps } from "react-router-dom";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// MainNavigationNavLink

type MainNavigationNavLinkProps = NavLinkProps;

const MainNavigationNavLink = (
  props: React.PropsWithChildren<MainNavigationNavLinkProps>
) => {
  const { className, children, ...otherProps } = props;

  return (
    <NavLink
      {...otherProps}
      className={({ isActive }) => {
        return twMerge(
          clsx(
            "border-b-2 border-b-transparent px-3 py-2 font-medium",
            isActive && "border-b-blue-950",
            "hover:border-b-blue-950",
            className
          )
        );
      }}
    >
      {children}
    </NavLink>
  );
};

// MainNavigationNavLink

interface MainNavigationProps {
  className?: string;
}

const MainNavigation = (props: MainNavigationProps) => {
  const { className } = props;

  return (
    <nav className={twMerge(clsx("w-full", className))}>
      <ul className="flex gap-2">
        <li>
          <MainNavigationNavLink to="/">Home</MainNavigationNavLink>
        </li>
        <li>
          <MainNavigationNavLink to="/settings">Settings</MainNavigationNavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
