import { message } from "antd";

type AlertType = "success" | "error";

const showAlert = (msg: string, type: AlertType) => {
  switch (type) {
    case "success":
      message.success(msg);
      break;
    case "error":
      message.error(msg);
      break;
  }
};

export default showAlert;
