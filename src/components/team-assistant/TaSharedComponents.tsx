import React from "react";
import type { TeamAssistantRequest } from "../../model/AircraftStore";
import type { NormalizedGoal } from "../../schemas/pilotRequestSchema";
import {
	findSuggestionForRequest,
	getRequestStatusColorClass,
	getStatusColorClass,
	isRejected,
} from "../../utils/teamAssistantHelper";

/** Traffic light status dot: green/yellow/red based on boolean/null/undefined. */
export function getStatusColor(status: boolean | null | undefined) {
	if (status === undefined || status === null) {
		return <span className="text-yellow-500">●</span>;
	}
	return status ? (
		<span className="text-green-400">●</span>
	) : (
		<span className="text-red-500">●</span>
	);
}

/** Icon + status dot + parameter text (the left part of the header). */
export function TaHeaderContent({
	requestTypeIcon,
	requestParameter,
	request,
}: {
	requestTypeIcon: string;
	requestParameter: string;
	request: TeamAssistantRequest;
}) {
	return (
		<div className="flex justify-start gap-0.5">
			<img src={requestTypeIcon} alt="Request type" className="w-4 h-4" />
			<div className="flex items-center gap-0.5 text-xs">
				<span className={getRequestStatusColorClass(request)}>●</span>
				<span className="text-[#40c4ff]">{requestParameter}</span>
			</div>
		</div>
	);
}

/** X button to dismiss a request. */
export function DismissButton({ onClick }: { onClick: () => void }) {
	return (
		<span className="cursor-pointer border border-transparent hover:border-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-3 h-3"
				onClick={onClick}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18 18 6M6 6l12 12"
				/>
			</svg>
		</span>
	);
}

/** Checkmark button to accept a request. */
export function AcceptCheckmark({ onClick }: { onClick: () => void }) {
	return (
		<span className="p-0.5 cursor-pointer border border-white border-opacity-70">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-3 h-3 inline-block cursor-pointer"
				onClick={onClick}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m4.5 12.75 6 6 9-13.5"
				/>
			</svg>
		</span>
	);
}

/** Suggestion status dot + suggestion text + optional accept checkmark. */
export function SuggestionContent({
	request,
	showAcceptCheckmark,
	onAccept,
}: {
	request: TeamAssistantRequest;
	showAcceptCheckmark: boolean;
	onAccept: () => void;
}) {
	return (
		<div className="flex items-center justify-center gap-1">
			<span className={getStatusColorClass(isRejected(request) ? 0 : 1)}>
				●
			</span>
			<span className="text-xs text-[#40c4ff]">
				{findSuggestionForRequest(request)}?
			</span>
			{showAcceptCheckmark && <AcceptCheckmark onClick={onAccept} />}
		</div>
	);
}

/** Collapse arrow (up-left) to shrink from full to small view. */
export function CollapseArrow({ onClick }: { onClick: () => void }) {
	return (
		<span className="cursor-pointer border border-transparent hover:border-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-3 h-3"
				onClick={onClick}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
				/>
			</svg>
		</span>
	);
}

/** Expand arrow (down-right) to grow from small to full view. */
export function ExpandArrow({ onClick }: { onClick: () => void }) {
	return (
		<span className="cursor-pointer border border-transparent hover:border-white text-xs">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-3 h-3"
				onClick={onClick}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
				/>
			</svg>
		</span>
	);
}

/** Level-change goal detail rows: TCT + FMP + Exit status. */
export function LevelChangeGoalRows({
	goal,
	index,
	totalGoals,
	isAP2,
	requestParameter,
}: {
	goal: NormalizedGoal;
	index: number;
	totalGoals: number;
	isAP2: boolean;
	requestParameter: number | string;
}) {
	if (!goal.results) {
		return null;
	}
	// if (!isAP2 && goal.requestedValue !== requestParameter) {
	// 	return null;
	// }

	// FMP status
	const fmpIsOk =
		goal.results.next_sector_capacity_ok && !goal.results.altitude_restriction;

	// Exit status color logic:
	// - yellow (undefined): exit_problems_are_manageable && hasConflictObject
	// - green (true): exit_problems_are_manageable && !hasConflictObject
	// - red (false): !exit_problems_are_manageable
	const hasConflictObject = goal.results.required_coordinations.some(
		(item) => typeof item === "object",
	);
	const exitStatusColor =
		goal.results.exit_problems_are_manageable && hasConflictObject
			? undefined // yellow
			: goal.results.exit_problems_are_manageable; // green or red

	return (
		(goal.requestedValue === requestParameter || isAP2) && (
			<React.Fragment key={index}>
				{/* TCT row */}
				<tr>
					<td className="text-xs" colSpan={2}>
						{getStatusColor(goal.results.traffic_complexity_manageable)}{" "}
						{"< 2 "}
						TCT {goal.requestedValue}
					</td>
				</tr>

				{/* FMP row */}
				<tr>
					<td className="pr-1" colSpan={2}>
						{getStatusColor(fmpIsOk)} FMP {goal.requestedValue}
					</td>
				</tr>
				{!fmpIsOk && (
					<>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(goal.results.next_sector_capacity_ok)}{" "}
								{goal.nextSector}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(!goal.results.altitude_restriction)} LOA
							</td>
						</tr>
					</>
				)}

				{/* Exit status rows */}
				<tr>
					<td className="text-xs" colSpan={2}>
						{getStatusColor(exitStatusColor)} {goal.nextSector} MTCD{" "}
						{goal.requestedValue}
					</td>
				</tr>
				<tr>
					<td className="text-xs" colSpan={2}>
						{getStatusColor(goal.results.is_conform_to_flight_plan)} FLP{" "}
						{goal.requestedValue}
					</td>
				</tr>

				{/* Separator between goals in AP2 mode */}
				{isAP2 && index < totalGoals - 1 && (
					<tr>
						<td colSpan={2}>
							<hr className="border-t border-white/30 mr-2 ml-0" />
						</td>
					</tr>
				)}
			</React.Fragment>
		)
	);
}

/** Heading goal detail row: TCT status based on in-sector conflicts. */
export function HeadingGoalRow({
	goal,
	index,
	totalGoals,
	isAP2,
	requestParameter,
}: {
	goal: NormalizedGoal;
	index: number;
	totalGoals: number;
	isAP2: boolean;
	requestParameter: number | string;
}) {
	const noConflicts = goal.inSectorConflicts?.length === 0;
	return (
		(goal.requestedValue === requestParameter || isAP2) && (
			<React.Fragment key={index}>
				<tr>
					<td className="text-xs" colSpan={2}>
						{getStatusColor(noConflicts)} TCT
					</td>
				</tr>
				{isAP2 && index < totalGoals - 1 && (
					<tr>
						<td colSpan={2}>
							<hr className="border-t border-white/30 mr-2 ml-0" />
						</td>
					</tr>
				)}
			</React.Fragment>
		)
	);
}
