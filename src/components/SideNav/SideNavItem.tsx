import clsx from "clsx";
import { PropsWithChildren } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props extends NavLinkProps {}

const SideNavItem = ({
  className,
  children,
  ...otherProps
}: PropsWithChildren<Props>) => {
  return (
    <li className="flex">
      <NavLink
        {...otherProps}
        className={({ isActive }) => {
          return twMerge(
            clsx(
              "border-l-4 border-transparent px-3 py-1 hover:bg-zinc-100 w-full grow",
              isActive && "bg-zinc-100 border-l-blue-900",
              className
            )
          );
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default SideNavItem;
