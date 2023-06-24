import { useAuthStore } from "../stores/auth";
import ConditionalRoute from "./ConditionalRoute";

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <ConditionalRoute fallbackPath="/auth/login" condition={isAuthenticated} />
  );
};

export default PrivateRoute;
