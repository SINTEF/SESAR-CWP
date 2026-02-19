import type { TeamAssistantRequest } from "../../model/AircraftStore";
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

/** R/T button (always shown) and DL button (only if aircraft has CPDLC). */
export function CommunicationButtons({
	hasCPDLC,
	onAccept,
	onAcceptWithDelay,
}: {
	hasCPDLC: boolean;
	onAccept: () => void;
	onAcceptWithDelay: () => void;
}) {
	return (
		<div className="flex flex-row items-center justify-center gap-1">
			<span
				className="p-0.5 cursor-pointer border border-white border-opacity-70"
				onClick={onAccept}
			>
				R/T
			</span>
			{hasCPDLC && (
				<span
					className="p-0.5 cursor-pointer border border-white border-opacity-70"
					onClick={onAcceptWithDelay}
				>
					DL
				</span>
			)}
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
