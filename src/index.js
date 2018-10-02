import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
const background = {
  "background-image":
    "url('https://images.pexels.com/photos/616484/pexels-photo-616484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
  "background-size": "100%"
};

ReactDOM.render(
  <BrowserRouter>
    <App style={background} />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
