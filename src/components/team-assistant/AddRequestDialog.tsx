import * as Sentry from "@sentry/react";
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import { TA_TEST_REQUESTS } from "../../dev/taTestRequests";
import type AircraftModel from "../../model/AircraftModel";
import {
	handlePublishPromise,
	publishPilotRequest,
} from "../../mqtt-client/publishers";
import { PilotRequestType } from "../../schemas/pilotRequestSchema";
import { aircraftStore, cwpStore } from "../../state";

interface AddRequestDialogProps {
	aircraft: AircraftModel;
	onClose: () => void;
}

type RequestTypeOption = {
	type: PilotRequestType;
	label: string;
	icon: string;
};

const REQUEST_TYPES: RequestTypeOption[] = [
	{
		type: PilotRequestType.FlightLevel,
		label: "Flight Level",
		icon: "/flight_level_request.svg",
	},
	{
		type: PilotRequestType.Direct,
		label: "Direct To",
		icon: "/icon_direct_request.svg",
	},
	{
		type: PilotRequestType.AbsoluteHeading,
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
	const posthog = usePostHog();
	const { aircraftId, callSign } = aircraft;

	const createRequest = (type: PilotRequestType, parameter: string): void => {
		const requestId = crypto.randomUUID();

		// For Direct, keep the parameter as string (waypoint name)
		// For other types, convert to number
		const requestParameter: number | string =
			type === PilotRequestType.Direct
				? parameter.toUpperCase()
				: Number.parseInt(parameter, 10) || 0;

		// Publish to MQTT - the message will be received back via subscriber
		// PilotRequestType enum values are the wire values (0=FL, 1=Direct, 2=AbsoluteHeading, 3=RelativeHeading)
		handlePublishPromise(
			publishPilotRequest(callSign, requestId, type, requestParameter),
		);
	};

	const handleTypeSelect = (type: PilotRequestType): void => {
		const typeLabel =
			REQUEST_TYPES.find((t) => t.type === type)?.label ?? "Unknown";
		posthog?.capture("TA_request_type_selected", {
			aircraft_id: aircraftId,
			callsign: callSign,
			request_type: type,
			request_type_label: typeLabel,
		});

		// Set up the callback that will receive the selected value from the popup
		cwpStore.setTaRequestCallback((value: string) => {
			posthog?.capture("TA_request_created", {
				aircraft_id: aircraftId,
				callsign: callSign,
				request_type: type,
				request_type_label: typeLabel,
				request_parameter: value,
			});
			createRequest(type, value);
		}, aircraftId);

		// Open the appropriate existing popup, preserving the callback
		switch (type) {
			case PilotRequestType.FlightLevel:
				cwpStore.openLevelPopupForAircraft(aircraftId, true);
				break;
			case PilotRequestType.Direct:
				cwpStore.openChangeNextFixForAircraft(aircraftId, true);
				break;
			case PilotRequestType.AbsoluteHeading:
				cwpStore.openChangeBearingForAircraft(aircraftId, true);
				break;
			default:
				Sentry.captureMessage(
					`AddRequestDialog: Unsupported request type selected: ${type}`,
				);
				break;
		}

		// Close this dialog - the existing popup will handle the rest
		onClose();
	};

	const handleSendAllTestRequests = (): void => {
		// Write directly to the store — MQTT brokers often don't echo messages
		// back to the publisher, so going through the publish → subscribe round-trip
		// would silently fail.
		for (const testRequest of TA_TEST_REQUESTS) {
			const requestId = crypto.randomUUID();
			const processed = {
				...testRequest,
				context: {
					...testRequest.context,
					request_id: requestId,
					flight_id: callSign,
				},
			};
			aircraftStore.setTeamAssistantRequest(callSign, requestId, processed);
		}
		onClose();
	};

	return (
		<div className="absolute top-0 w-max bg-neutral-800/40 border-l border-l-neutral-800 select-none backdrop-blur-[1.5px] rounded rounded-l-none flex flex-col gap-1 p-1">
			<div className="flex gap-1">
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
			<button
				type="button"
				onClick={handleSendAllTestRequests}
				className="btn btn-neutral btn-xs w-full"
				title="Send all testRequest scenarios at once for visual testing"
			>
				Send All TestRequests
			</button>
		</div>
	);
});
