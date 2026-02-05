import { observer } from "mobx-react-lite";
// import { usePostHog } from "posthog-js/react";
// import { useDragging } from "../../contexts/DraggingContext";
import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { roleConfigurationStore } from "../../state";
import { getRequestStatusColorClass } from "../../utils/teamAssistantHelper";
/**
 * Get the status color class based on goal results.
 * Derives status from exitProblemsAreManageable and trafficComplexityManageable.
 * Both true = success (green), any false = error (red), undefined = gray
 */

export default observer(function TaPopupSmall(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	width: number;
	request: TeamAssistantRequest;
	requestParameter: string;
	requestTypeIcon: string;
}) {
	const { request, requestParameter, requestTypeIcon } = properties;
	const _currentSector = roleConfigurationStore.currentControlledSector;
	const iconSrc = requestTypeIcon;
	const displayParameter = requestParameter;
	return (
		<table className="border-spacing-2 w-full max-w-full">
			<tbody>
				<tr>
					<td className="flex flex-row">
						<div className="flex items-center gap-1.5">
							<img src={iconSrc} alt="Request type" className="w-4 h-4" />
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<span className={getRequestStatusColorClass(request)}>●</span>
						<span className="text-xs text-[#40c4ff]">{displayParameter}</span>
					</td>
				</tr>
				<tr></tr>
				<tr>
					<td></td>
				</tr>
			</tbody>
		</table>
	);
});
