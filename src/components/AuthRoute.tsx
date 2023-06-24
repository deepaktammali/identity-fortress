import { useAuthStore } from "../stores/auth";
import ConditionalRoute from "./ConditionalRoute";

const AuthRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return <ConditionalRoute fallbackPath="/" condition={!isAuthenticated} />;
};

export default AuthRoute;
