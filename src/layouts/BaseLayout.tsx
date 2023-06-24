import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import MainNavigation from "../components/MainNavigation";

const BaseLayout = () => {
  return (
    <div className="flex flex-col grow items-center gap-8">
      <div className="flex flex-col items-center w-full gap-4">
        <header className="flex flex-col items-center w-full px-[--column-padding] py-2 gap-2 border-b border-b-zinc-300">
          <Header className="max-w-[--layout-width]" />
        </header>
        <div className="w-full flex justify-center px-[--column-padding]">
          <MainNavigation className="max-w-[--layout-width] w-full text-md" />
        </div>
      </div>
      <main className="grow flex flex-col w-full px-[--column-padding] items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
