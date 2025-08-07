/**
 * Time component that can be dragged around.
 */

import { observer } from "mobx-react-lite";
import React from "react";
import Draggable from "react-draggable";

import { simulatorStore } from "../state";
import { formatSimulatorTimeHMS } from "../utils";

export default observer(function Time() {
	// Get the tame in the hh:mm:ss format
	const time = formatSimulatorTimeHMS(simulatorStore.timestamp);

	return (
		// <Draggable bounds="parent">
		<div className="font-mono right-1/2 rounded-sm text-white font-bold text-2xl px-2 py-0.5">{time}</div>
		// </Draggable>
	);
});
