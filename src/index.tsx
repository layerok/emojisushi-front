import * as ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "~App";
import reportWebVitals from "./reportWebVitals";
import { createSession, getSession } from "~utils/session.utils";

if (!getSession()) {
  createSession();
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
