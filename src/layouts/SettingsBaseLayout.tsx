import { Outlet, useMatch } from "react-router-dom";
import SideNav from "../components/SideNav";
import SideNavItem from "../components/SideNav/SideNavItem";
import SideNavSection from "../components/SideNav/SideNavSection";
import clsx from "clsx";

const SettingsBaseLayout = () => {
  const settingsPathMatch = useMatch({
    path: "/settings",
  });

  const isSettingsIndexRoute = !!settingsPathMatch;

  return (
    <div className="grid max-w-[--layout-width] w-full [--sidebar-width:192px] md:grid-cols-[var(--sidebar-width),calc(100%-var(--sidebar-width)-2*var(--column-padding))] grid-cols-1">
      <SideNav className={clsx(!isSettingsIndexRoute && "md:block hidden")}>
        <SideNavSection>
          <SideNavItem to="/settings/authentication">
            Authentication
          </SideNavItem>
        </SideNavSection>
      </SideNav>
      <Outlet />
    </div>
  );
};

export default SettingsBaseLayout;
