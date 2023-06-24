import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthBaseLayout = () => {
  return (
    <div className="flex flex-col grow items-center">
      <header className="flex justify-center px-[--column-padding] py-2 w-full max-w-[--layout-width]">
        <Header />
      </header>
      <main className="grow flex flex-col justify-center w-full px-[--column-padding]">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthBaseLayout;
