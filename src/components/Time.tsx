/**
 * Time component that can be dragged around.
 */

import { observer } from "mobx-react-lite";

import { simulatorStore } from "../state";
import { formatSimulatorTimeHMS } from "../utils";

export default observer(function Time() {
	// Get the tame in the hh:mm:ss format
	const time = formatSimulatorTimeHMS(simulatorStore.timestamp);

	return (
		<div className="font-mono right-1/2 rounded-sm text-white font-bold text-xl px-1 py-0.5">
			{time}
		</div>
	);
});
