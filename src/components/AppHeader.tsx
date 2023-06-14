import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";

import { AppState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";
import { UserDispatch } from "../types/user";

export const AppHeader = () => {
  const { data, loading } = useSelector((state: AppState) => state.user);

  const dispatch: UserDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  const { pathname } = useLocation();

  const headerItems = data.username
    ? [
        {
          key: "/records",
          label: "Expense Records",
        },
        {
          key: "/categories",
          label: "Categories",
        },
        {
          key: "/logout",
          label: "Logout",
        },
      ]
    : loading
    ? []
    : [
        {
          key: "/login",
          label: "Login",
        },
      ];

  const onMenuChangeHandle: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
      <div
        style={{
          float: "left",
          width: 120,
          height: 31,
          margin: "16px 24px 16px 0",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={headerItems}
        onClick={onMenuChangeHandle}
      ></Menu>
    </Header>
  );
};
