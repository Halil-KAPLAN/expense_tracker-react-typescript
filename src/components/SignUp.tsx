import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import api from "../utils/api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 18 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const onFinish = async (values: any, navigate: any, showErrorMsgFn: any) => {
  try {
    await api.post("/users/register", values);
    navigate("/login");
  } catch (error: any) {
    showErrorMsgFn(error.response.data.errorMessage);
  }
};

function SignUp() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const showErrorMsgFn = (errorMsg: string) => {
    messageApi.open({
      type: "error",
      content: errorMsg,
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        name="nest-messages"
        onFinish={(values: any) => {
          onFinish(values, navigate, showErrorMsgFn);
        }}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Register for an account
        </h2>
        <Form.Item name="username" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!", min: 6 },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="full_name" label="Full Name">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignUp;
