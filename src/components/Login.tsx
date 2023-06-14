import { Button, Form, Input, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import showAlert from "../utils/showAlert";
import { LoginForm, UserDispatch } from "../types/user";
import { login } from "../store/actions/userActions";
import { AppState } from "../store";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, loading, error } = useSelector((state: AppState) => state.user);
  const dispatch: UserDispatch = useDispatch();

  useEffect(() => {
    error && showAlert(error, "error");
  }, [error]);

  useEffect(() => {
    data.username && showAlert("You have successfully logged in!", "success");
  }, [data.username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/records");
  }, [data, navigate]);

  const onFinish = (values: LoginForm) => {
    dispatch(login(values));
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Please login
      </h2>

      {state?.newSignUp && (
        <Result
          status="success"
          title="You successfully signed up."
          subTitle="Please login using your credentials."
        />
      )}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
