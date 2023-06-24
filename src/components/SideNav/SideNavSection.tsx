import { PropsWithChildren } from "react";

interface Props {}

const SideNavSection = ({ children }: PropsWithChildren<Props>) => {
  return (
    <div className="font-medium text-sm w-full py-2 border-b border-b-zinc-200">
      {children}
    </div>
  );
};

export default SideNavSection;
