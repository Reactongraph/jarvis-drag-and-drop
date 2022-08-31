import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./containers/landing";
import "bootstrap/dist/css/bootstrap.min.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<LandingPage />, document.getElementById("root"));

serviceWorker.unregister();
