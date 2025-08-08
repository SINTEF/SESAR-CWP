import { observer } from "mobx-react-lite";
import React from "react";
import classNames from "classnames";
import { cwpStore } from "../state";

export default observer(function SpeedVectorNavbarControl() {
	const {
		speedVectorMinutes,
		setSpeedVectorMinutes,
		showSpeedVectors,
		toggleShowSpeedVectors,
	} = cwpStore;

	const predefinedValues = [1, 2, 3, 4, 6, 9];

	return (
		<div className="flex gap-1">
			<button
				type="button"
				className={classNames(
					"h-full text-white text-xs bg-[#1e3a5f] rounded-none border border-[#2a5d8f] overflow-hidden whitespace-nowrap shrink",
					"hover:bg-[#2a5d8f] hover:border-[#4b90db] active:bg-[#366fa3] active:border-[#5aa1e6]",
					"focus:outline-none focus:shadow-none focus:border-[#3f77b2]",
					showSpeedVectors && "bg-[#4b90db] border-[#6bb3f0]"
				)}
				onClick={() => toggleShowSpeedVectors()}
			>
				W
			</button>
			{predefinedValues.map((val) => (
				<button
					key={val}
					type="button"
					className={classNames(
						"h-full text-white text-xs bg-[#1e3a5f] rounded-none border border-[#2a5d8f] overflow-hidden whitespace-nowrap shrink",
						"hover:bg-[#2a5d8f] hover:border-[#4b90db] active:bg-[#366fa3] active:border-[#5aa1e6]",
						"focus:outline-none focus:shadow-none focus:border-[#3f77b2]",
						speedVectorMinutes === val && "bg-[#4b90db] border-[#6bb3f0]"
					)}
					onClick={() => setSpeedVectorMinutes(val)}
				>
					{val}
				</button>
			))}
		</div>
	);
});
