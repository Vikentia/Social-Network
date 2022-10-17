import store from "./redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

ReactDOM.render(
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById("root")
);
