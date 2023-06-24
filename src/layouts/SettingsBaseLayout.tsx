import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import SideNavItem from "../components/SideNav/SideNavItem";
import SideNavSection from "../components/SideNav/SideNavSection";

const SettingsBaseLayout = () => {
  return (
    <div className="grid max-w-[--layout-width] w-full [--sidebar-width:192px] grid-cols-[var(--sidebar-width),calc(100%-var(--sidebar-width)-2*var(--column-padding))]">
      <SideNav>
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
