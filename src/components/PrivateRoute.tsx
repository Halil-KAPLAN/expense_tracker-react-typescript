import React from "react";
import { Navigate, Route, RouterProps } from "react-router-dom";

interface PrivateRouteProps extends RouterProps {
  component: React.FC<any>;
}

const PrivateRoute = ({
  component: Component,
  ...theRest
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  return token ? (
    <Route {...theRest} element={<Component />}></Route>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
