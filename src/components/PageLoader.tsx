import { LoadingSpinner } from "hds-react";

const PageLoader = () => {
  return (
    <main className="flex flex-col justify-between items-center">
      <LoadingSpinner />
    </main>
  );
};

export default PageLoader;
