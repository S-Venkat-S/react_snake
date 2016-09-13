import ReactDOM from "react-dom"
import React from "react";
import Root from "./Root.jsx";

ReactDOM.render(
	<Root gridSize={100} />,
	document.getElementById("root")
);

var allowedKeys = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
document.onkeyup =function (event) {
	if (allowedKeys.indexOf(event.key) != -1) {
		ReactDOM.render(
			<Root keyCode={event.key} />,
			document.getElementById("root")
		);
	}
};
