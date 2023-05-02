import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import rootReducer from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
