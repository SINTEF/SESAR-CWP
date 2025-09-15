import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const BLINK_INTERVAL = 500; // ms

export default observer(function Stca() {
	const [blink, setBlink] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => setBlink((b) => !b), BLINK_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	const style = {
		width: 40,
		height: 20,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: blink ? "red" : "white",
		color: blink ? "white" : "black",
		border: `2px solid ${blink ? "black" : "red"}`,
		fontWeight: "bold",
		fontSize: 12,
		transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
	} as React.CSSProperties;

	return <div style={style}>STCA</div>;
});
