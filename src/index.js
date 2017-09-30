import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { PlayerApp } from "./app";
import registerServiceWorker from "./registerServiceWorker";

import { getAvailableMedia } from "./configuration";

const availableMedia = getAvailableMedia();

ReactDOM.render(
	<PlayerApp
		availableMedia={availableMedia}
	/>,
	document.getElementById("root")
);
registerServiceWorker();
