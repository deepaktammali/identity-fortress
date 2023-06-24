import { Auth } from "@aws-amplify/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import PageLoader from "./components/PageLoader";
import { config as amplifyAuthConfig } from "./config/amplify/auth";
import { queryClient } from "./config/tanstack/query";
import useAmplifyZustandBridge from "./hooks/use-amplify-zustand-bridge";

Auth.configure(amplifyAuthConfig);

function App() {
  const { initiating } = useAmplifyZustandBridge();

  if (initiating) {
    return <PageLoader />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster richColors />
      </QueryClientProvider>
    </>
  );
}

export default App;
