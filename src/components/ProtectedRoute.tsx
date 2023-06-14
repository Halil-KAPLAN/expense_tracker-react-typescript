import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

const ProtectedRoute = ({
  authenticationPath,
  outlet,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  return !!token ? outlet : <Navigate to={{ pathname: authenticationPath }} />;
};

export default ProtectedRoute;
