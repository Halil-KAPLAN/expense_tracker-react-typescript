import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, theme } from "antd";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/ProtectedRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import { AppHeader } from "./components/AppHeader";
import { Logout } from "./components/Logout";

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    authenticationPath: "/login",
  };

  return (
    <Layout>
      <AppHeader />
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <div
          style={{ padding: 24, minHeight: 380, background: colorBgContainer }}
        >
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route
              path="/categories"
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<Categories />}
                />
              }
            />
            <Route
              path="/records"
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<Records />}
                />
              }
            />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Expense Tracker</Footer>
    </Layout>
  );
};

export default App;
