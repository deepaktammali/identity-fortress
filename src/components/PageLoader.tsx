import { Spinner } from "@geist-ui/core";

const PageLoader = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <Spinner />
    </main>
  );
};

export default PageLoader;
