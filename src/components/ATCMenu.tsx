/* ATCMenu.tsx */
import { observer } from "mobx-react-lite";
import {
	acceptFlight,
	handlePublishPromise,
	persistFrontendFlightController,
} from "../mqtt-client/publishers";
import { aircraftStore, configurationStore, cwpStore } from "../state";
import type AircraftModel from "../model/AircraftModel";

export default observer(function ATCMenu(properties: {
	aircraft: AircraftModel;
}) {
	const { aircraftId, assignedFlightId, controlledBy } = properties.aircraft;

	if (cwpStore.ATCMenuAircraftId !== aircraftId) {
		return null;
	}

	const toggleAssumeFlight = (): void => {
		const flightIsAlreadyAssumed =
			controlledBy === configurationStore.currentCWP;
		if (flightIsAlreadyAssumed) {
			// Handle flight de-assume logic here.
		} else {
			aircraftStore.aircrafts
				.get(aircraftId)
				?.setController(configurationStore.currentCWP);
			handlePublishPromise(
				acceptFlight(
					controlledBy,
					configurationStore.currentCWP,
					assignedFlightId,
				),
			);
			handlePublishPromise(
				persistFrontendFlightController(
					aircraftId,
					configurationStore.currentCWP,
				),
			);
		}
	};

	return (
		<div className="bg-gray-800 p-4 w-36 text-gray-200 font-sans flex flex-col items-center">
			<div className="space-y-2 w-full">
				<div className="space-y-2 w-full">
					<button
						onClick={toggleAssumeFlight}
						className={`btn btn-sm w-full ${controlledBy === configurationStore.currentCWP ? "btn-disabled" : "btn-primary"}`}
					>
						{controlledBy === configurationStore.currentCWP
							? "DE ASSUME"
							: "ASSUME"}
					</button>
					<button
						onClick={() => {}}
						className="btn btn-sm w-full btn-secondary"
					>
						INTEGRE
					</button>
				</div>

				<div className="space-y-2 w-full">
					<button className="btn btn-sm w-full btn-accent">TP</button>
					<button className="btn btn-sm w-full btn-accent">SEP</button>
					<button className="btn btn-sm w-full btn-accent">QDM</button>
				</div>
			</div>
		</div>
	);
});
