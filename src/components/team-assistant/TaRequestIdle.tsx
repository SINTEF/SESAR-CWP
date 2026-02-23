import { observer } from "mobx-react-lite";
import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { getRequestStatusColorClass } from "../../utils/teamAssistantHelper";

/** Idle (not hovered) state: small icon + status dot + parameter. */
export default observer(function TaRequestIdle(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	width: number;
	request: TeamAssistantRequest;
	requestParameter: string;
	requestTypeIcon: string;
}) {
	const { request, requestParameter, requestTypeIcon } = properties;
	return (
		<table className="border-spacing-2 w-full max-w-full">
			<tbody>
				<tr>
					<td className="flex flex-row">
						<div className="flex items-center gap-1.5">
							<img
								src={requestTypeIcon}
								alt="Request type"
								className="w-4 h-4"
							/>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<span className={getRequestStatusColorClass(request)}>●</span>
						<span className="text-xs text-[#40c4ff]">{requestParameter}</span>
					</td>
				</tr>
			</tbody>
		</table>
	);
});
