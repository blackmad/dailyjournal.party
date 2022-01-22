import React from "react";
import ReactDOM from "react-dom";
import seedrandom from "seedrandom";

import "./styles/index.css";
import App from "./App";

seedrandom(new Date().toString(), { global: true });

ReactDOM.render(<App />, document.getElementById("content"));
