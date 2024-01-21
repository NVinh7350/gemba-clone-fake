import React, { useContext } from "react";
import { ContextAPI } from "../context";
function Child3() {
	const { count } = useContext(ContextAPI);
	return (
		<div style={{ border: "1px solid blue" }}>
			<h1>Child3</h1>
			<h2>{count}</h2>
		</div>
	);
}

export default Child3;
