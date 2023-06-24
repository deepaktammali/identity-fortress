import { Navigate, Outlet, useLocation } from "react-router-dom";

interface Props {
  condition: boolean;
  fallbackPath: string;
}

const ConditionalRoute = ({ condition, fallbackPath }: Props) => {
  const location = useLocation();

  if (condition) {
    return <Outlet />;
  }

  return <Navigate to={fallbackPath} state={{ fromPath: location.pathname }} />;
};

export default ConditionalRoute;
