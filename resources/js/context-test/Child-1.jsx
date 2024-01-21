import React, { memo } from "react";
import Child3 from "./Child-3";

function Child1() {
	console.log("child1 re-render");
	return (
		<div>
			<h1>Child1</h1>
			<Child3></Child3>
		</div>
	);
}

export default Child1;
