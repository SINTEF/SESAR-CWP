/** Delay in ms applied when accepting via datalink (DL button). */
export const DATALINK_DELAY_MS = 1000;

/** R/T button (always shown) and DL button (only if aircraft has CPDLC) for TA rows. */
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

/** R/T + DL (conditional) + Cancel buttons for aircraft control popups. */
export function PopupCommunicationButtons({
	hasCPDLC,
	onSubmit,
	onClose,
}: {
	hasCPDLC: boolean;
	onSubmit: () => void;
	onClose: () => void;
}) {
	const handleDatalinkSubmit = () => {
		setTimeout(onSubmit, DATALINK_DELAY_MS);
	};
	return (
		<div className="flex flex-col gap-0.5 mt-1">
			<div className="flex gap-0.5">
				<button
					type="button"
					onClick={onSubmit}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					R/T
				</button>
				{hasCPDLC && (
					<button
						type="button"
						onClick={handleDatalinkSubmit}
						className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
					>
						DL
					</button>
				)}
			</div>
			<button
				type="button"
				onClick={onClose}
				className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
			>
				Cancel
			</button>
		</div>
	);
}
