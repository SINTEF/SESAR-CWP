import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import Draggable from "react-draggable";

import { ShowNextConfiguration } from "../model/CwpStore";
import { configurationStore, cwpStore } from "../state";

export function ChangeCountDownTime(time: number): string {
	const date = new Date(time * 1000);
	const localeTime = date.toLocaleTimeString("en-GB", {
		timeZone: "UTC",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	return localeTime;
}

export default observer(function SectorChangeCountDown(/* properties */) {
	const draggableRef = React.useRef<HTMLDivElement>(null);
	const { timeToNextConfiguration, shouldShowNextConfiguration } =
		configurationStore;
	const { toggleShowNextSectorsConfiguration, showNextSectorsConfiguration } =
		cwpStore;
	if (timeToNextConfiguration > 600 || timeToNextConfiguration < 0) {
		return null;
	}

	let buttonText = "";
	switch (showNextSectorsConfiguration) {
		case ShowNextConfiguration.Automatic:
		case ShowNextConfiguration.Off:
			buttonText = "Show next sectors";
			break;
		case ShowNextConfiguration.On:
			buttonText = "Show current sectors";
			break;
		default:
			throw new Error("Invalid showNextSectorsConfiguration");
	}
	return (
		<Draggable bounds="parent" cancel="button, input" nodeRef={draggableRef}>
			<div
				className={classnames(
					"flex flex-col flex-wrap absolute justify-center self-center top-0 right-[60%] w-[12em] shadow-md text-[11px] leading-loose text-black outline-none z-[500]",
					shouldShowNextConfiguration ? "bg-red-500/80" : "bg-gray-500/80",
				)}
				ref={draggableRef}
			>
				<div className="text-cyan-400 text-center">
					Sector change countdown:{" "}
					{ChangeCountDownTime(timeToNextConfiguration)}
				</div>
				<button onClick={toggleShowNextSectorsConfiguration} className="w-full">
					{buttonText}
				</button>
			</div>
		</Draggable>
	);
});
