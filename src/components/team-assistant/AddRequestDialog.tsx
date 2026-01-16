import { observer } from "mobx-react-lite";
import type AircraftModel from "../../model/AircraftModel";
import {
	handlePublishPromise,
	publishPilotRequest,
} from "../../mqtt-client/publishers";
import {
	PilotRequestStatus,
	PilotRequestTypes,
} from "../../proto/ProtobufAirTrafficSimulator";
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
		label: "FL",
		icon: "/icon_flight_level_change.svg",
	},
	{
		type: PilotRequestTypes.DIRECTTO,
		label: "DCT",
		icon: "/icon_direct_request.svg",
	},
	{
		type: PilotRequestTypes.HEADING,
		label: "WX",
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
	const { aircraftId, callSign, assignedFlightId } = aircraft;

	const createRequest = (type: PilotRequestTypes, parameter: string): void => {
		const requestId = crypto.randomUUID();
		const now = new Date();

		const request = {
			flightId: assignedFlightId,
			callSign,
			requestType: type,
			requestParameter: parameter,
			status: PilotRequestStatus.PR_PENDING,
			tasks: [],
			responseDetails: "",
			time: {
				seconds: BigInt(Math.floor(now.getTime() / 1000)),
				nanos: (now.getTime() % 1000) * 1_000_000,
			},
		};

		// Publish to MQTT - the message will be received back via subscriber
		handlePublishPromise(
			publishPilotRequest(assignedFlightId, requestId, request),
		);
	};

	const handleTypeSelect = (type: PilotRequestTypes): void => {
		// Set up the callback that will receive the selected value from the popup
		cwpStore.setTaRequestCallback((value: string) => {
			createRequest(type, value);
		});

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
				break;
		}

		// Close this dialog - the existing popup will handle the rest
		onClose();
	};

	return (
		<div className="absolute left-full top-0 ml-1 z-50 bg-base-200 border border-base-content/20 rounded p-1 shadow-lg">
			<div className="flex items-center gap-1 mb-1">
				<span className="text-[10px] text-base-content/70">{callSign}</span>
				<button
					type="button"
					onClick={onClose}
					className="text-base-content/50 hover:text-base-content text-[10px] leading-none ml-auto"
				>
					✕
				</button>
			</div>
			<div className="flex gap-0.5">
				{REQUEST_TYPES.map(({ type, label, icon }) => (
					<button
						key={type}
						type="button"
						onClick={() => handleTypeSelect(type)}
						className="btn btn-xs btn-ghost p-0.5 h-auto flex flex-col gap-0"
						title={label}
					>
						<img src={icon} alt={label} className="w-4 h-4" />
						<span className="text-[8px]">{label}</span>
					</button>
				))}
			</div>
		</div>
	);
});
