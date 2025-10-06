import React from "react";
import { aircraftStore } from "../../state";

interface FlightLevelRequestIconProps {
	primaryColor?: string;
	className?: string;
	flightId?: string;
}
const FlightLevelRequestIcon: React.FC<FlightLevelRequestIconProps> = ({
	primaryColor = "#FFF703",
	className = "size-4",
	flightId,
}) => {
	const messageStatus = flightId
		? aircraftStore.teamAssistantRequest.get(flightId)?.status
		: undefined;
	if (messageStatus === 2) {
		primaryColor = "#FF0000"; // Red for error
	} else if (messageStatus === 1) {
		primaryColor = "#00FF00"; // Green for success
	} else if (messageStatus === 0) {
		primaryColor = "#FFFF00"; // Yellow for pending
	}

	return (
		<svg
			width="12"
			height="7"
			viewBox="0 0 12 7"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M5.19297 5.27558H7.25001V6.25H4.34241V0H5.19297V5.27558Z"
				fill={primaryColor}
			/>
			<path
				d="M2.73267 3.66157H0.850566V6.25H0V0H2.96793V0.983001H0.850566V2.68286H2.73267V3.66157Z"
				fill={primaryColor}
			/>
			<path
				d="M10.6543 1.375H9.5957L10.125 0.762695L10.6543 1.375Z"
				fill={primaryColor}
				stroke={primaryColor}
			/>
			<path
				d="M10.6543 4.875H9.5957L10.125 5.4873L10.6543 4.875Z"
				fill={primaryColor}
				stroke={primaryColor}
			/>
			<line x1="10" y1="1.25" x2="10" y2="5" stroke={primaryColor} />
		</svg>
	);
};

export default FlightLevelRequestIcon;
