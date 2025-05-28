import { observer } from "mobx-react-lite";
import React from "react";
import { cwpStore } from "../state";

export default observer(function SpeedVectorNavbarControl() {
	const { speedVectorMinutes, setSpeedVectorMinutes } = cwpStore;

	const predefinedValues = [1, 2, 3, 4, 6, 9];

	return (
		<div className="speed-vector-navbar">
			<button type="button" className="active">
				W
			</button>
			{predefinedValues.map((val) => (
				<button
					key={val}
					type="button"
					className={`speed-button ${speedVectorMinutes === val ? "active" : ""}`}
					onClick={() => setSpeedVectorMinutes(val)}
				>
					{val}
				</button>
			))}
		</div>
	);
});
