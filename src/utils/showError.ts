import { message } from "antd";

const showError: Function = ({
  response: {
    data: { errorMessage },
  },
}: any) => {
  message.error(errorMessage);
};

export default showError;
