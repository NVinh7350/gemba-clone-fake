import React, { memo, useContext } from "react";
import { ContextAPI } from "../context";
function Child2() {
	const { count } = useContext(ContextAPI);
	console.log("child2 re-render");
	return (
		<div style={{ border: "1px solid red" }}>
			<h2>Child2</h2>
			<h3>count = {count}</h3>
			{/* <button onClick={increament}>increament</button> */}
		</div>
	);
}

export default memo(Child2);
