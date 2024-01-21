import React, { createContext, useCallback, useEffect, useState } from "react";
import Child1 from "./Child-1";
import Child2 from "./Child-2";

function Parent() {
	const ContextAPI = createContext();
	const [count, setCount] = useState(0);
	const increament = useCallback(() => {
		setCount((prev) => prev++);
	}, []);
	return (
		<ContextAPI.Provider value={count}>
			<button onClick={increament}>Increament</button>
			<Child1></Child1>
			<Child2></Child2>
		</ContextAPI.Provider>
	);
}

export default Parent;
