/**
 * Time component that can be dragged around.
 */

import "./Time.css";

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
		<div className="time">{time}</div>
		// </Draggable>
	);
});
