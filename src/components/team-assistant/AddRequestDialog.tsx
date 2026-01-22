import * as Sentry from "@sentry/react";
import { observer } from "mobx-react-lite";
import type AircraftModel from "../../model/AircraftModel";
import {
	handlePublishPromise,
	publishPilotRequest,
} from "../../mqtt-client/publishers";
import { PilotRequestTypes } from "../../proto/ProtobufAirTrafficSimulator";
import { cwpStore } from "../../state";

interface AddRequestDialogProps {
	aircraft: AircraftModel;
	onClose: () => void;
}

type RequestTypeOption = {
	type: PilotRequestTypes;
	label: string;
	icon: string;
};

const REQUEST_TYPES: RequestTypeOption[] = [
	{
		type: PilotRequestTypes.FLIGHT_LEVEL,
		label: "Flight Level",
		icon: "/flight_level_request.svg",
	},
	{
		type: PilotRequestTypes.DIRECTTO,
		label: "Direct To",
		icon: "/icon_direct_request.svg",
	},
	{
		type: PilotRequestTypes.HEADING,
		label: "Heading",
		icon: "/icon_thunderstorm.svg",
	},
];

/**
 * Compact inline dialog for creating test Team Assistant requests.
 * Opens the existing popup components (AircraftLevelPopup, ChangeNextFixPopup, ChangeBearingPopup)
 * and intercepts their output to create a TA request instead of changing the aircraft.
 */
export default observer(function AddRequestDialog({
	aircraft,
	onClose,
}: AddRequestDialogProps) {
	const { aircraftId, callSign } = aircraft;

	const createRequest = (type: PilotRequestTypes, parameter: string): void => {
		const requestId = crypto.randomUUID();
		const requestParameter = Number.parseInt(parameter, 10) || 0;

		// Convert PilotRequestTypes enum to JSON request_type number
		// 0 = flight_level_request, 1 = direct_request, 2 = absolute_heading_request, 3 = relative_heading_request
		let requestType = 0;
		switch (type) {
			case PilotRequestTypes.FLIGHT_LEVEL:
				requestType = 0;
				break;
			case PilotRequestTypes.DIRECTTO:
				requestType = 1;
				break;
			case PilotRequestTypes.HEADING:
				requestType = 2; // Using absolute heading
				break;
			default:
				requestType = 0;
		}

		// Publish to MQTT - the message will be received back via subscriber
		handlePublishPromise(
			publishPilotRequest(callSign, requestId, requestType, requestParameter),
		);
	};

	const handleTypeSelect = (type: PilotRequestTypes): void => {
		// Set up the callback that will receive the selected value from the popup
		cwpStore.setTaRequestCallback((value: string) => {
			createRequest(type, value);
		}, aircraftId);

		// Open the appropriate existing popup, preserving the callback
		switch (type) {
			case PilotRequestTypes.FLIGHT_LEVEL:
				cwpStore.openLevelPopupForAircraft(aircraftId, true);
				break;
			case PilotRequestTypes.DIRECTTO:
				cwpStore.openChangeNextFixForAircraft(aircraftId, true);
				break;
			case PilotRequestTypes.HEADING:
				cwpStore.openChangeBearingForAircraft(aircraftId, true);
				break;
			default:
				// SPEED type not supported in this dialog
				Sentry.captureMessage(
					`AddRequestDialog: Unsupported request type selected: ${type}`,
				);
				break;
		}

		// Close this dialog - the existing popup will handle the rest
		onClose();
	};

	return (
		<div className="absolute top-0 w-max bg-neutral-800/40 border-l border-l-neutral-800 select-none backdrop-blur-[1.5px] rounded rounded-l-none flex gap-1 p-1">
			{REQUEST_TYPES.map(({ type, label, icon }) => (
				<button
					key={type}
					type="button"
					onClick={() => handleTypeSelect(type)}
					className="btn btn-neutral btn-xs flex flex-col gap-0"
					title={label}
				>
					<img src={icon} alt={label} className="w-4 h-4" />
				</button>
			))}
		</div>
	);
});
