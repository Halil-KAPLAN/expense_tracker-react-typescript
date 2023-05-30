import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

const ProtectedRoute = ({
  isAuthenticated,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) =>
  isAuthenticated ? outlet : <Navigate to={{ pathname: authenticationPath }} />;

export default ProtectedRoute;
