import React from "react";
import { fixStore } from "../../state";

interface FixSelectorProps {
	/** The currently selected fix */
	selectedFix: string;
	/** Called when a fix is selected */
	onSelect: (fix: string) => void;
	/** Called when hovering over a fix (for preview lines) */
	onHover?: (fix: string | null) => void;
	/** Fixes from the aircraft's trajectory/flight plan */
	trajectoryFixes: string[];
	/** Nearby fixes (not in trajectory) */
	nearbyFixes: string[];
	/** Current search/filter text */
	searchText?: string;
	/** Called when search text changes */
	onSearchChange?: (text: string) => void;
	/** Unique ID for the datalist (for autocomplete) */
	datalistId?: string;
}

function ListOfFixes(properties: {
	fixes: string[];
	currentFix: string;
	selectedFix: string;
	onSelect: (fix: string) => void;
	onHover?: (fix: string | null) => void;
}) {
	const { fixes, currentFix, selectedFix, onSelect, onHover } = properties;

	return (
		<>
			{fixes.map((fix) => {
				const isCurrent = fix === currentFix;
				const isSelected = fix === selectedFix;

				return (
					<button
						key={fix}
						type="button"
						onClick={(): void => onSelect(fix)}
						onMouseEnter={(): void => onHover?.(fix)}
						onMouseLeave={(): void => onHover?.(null)}
						className={`
							block w-full px-1 py-1 text-xs text-center
							bg-[#1e3a5f] text-white
							hover:bg-[#4b90db]
							border-none outline-none
							${isCurrent ? "font-bold" : ""}
						`}
						data-fix={fix}
					>
						{isSelected ? (
							<>
								<span>&gt;</span>&nbsp;{fix}&nbsp;<span>&lt;</span>
							</>
						) : (
							fix
						)}
					</button>
				);
			})}
		</>
	);
}

/**
 * Reusable fix/waypoint selector component.
 * Displays a scrollable list of fixes with search functionality.
 */
export default function FixSelector({
	selectedFix,
	onSelect,
	onHover,
	trajectoryFixes,
	nearbyFixes,
	searchText = "",
	onSearchChange,
	datalistId,
}: FixSelectorProps): React.ReactNode {
	const listRef = React.useRef<HTMLDivElement>(null);
	const [canScrollUp, setCanScrollUp] = React.useState(false);
	const [canScrollDown, setCanScrollDown] = React.useState(false);
	const [showWarning, setShowWarning] = React.useState(false);

	const searchTerm = searchText.toUpperCase().trim();

	// Filter displayed fixes based on search
	const displayedTrajectoryFixes = searchTerm
		? trajectoryFixes.filter((fix) => fix.includes(searchTerm))
		: trajectoryFixes;

	const displayedNearbyFixes = searchTerm
		? nearbyFixes.filter((fix) => fix.includes(searchTerm))
		: nearbyFixes;

	const hasNoDisplayedFixes =
		displayedTrajectoryFixes.length === 0 && displayedNearbyFixes.length === 0;

	// Update scroll button states
	const updateScrollState = React.useCallback(() => {
		const container = listRef.current;
		if (!container) {
			return;
		}
		setCanScrollUp(container.scrollTop > 0);
		setCanScrollDown(
			container.scrollTop + container.clientHeight < container.scrollHeight - 1,
		);
	}, []);

	// Scroll to selected fix
	React.useEffect(() => {
		const container = listRef.current;
		if (!container || !selectedFix) {
			return;
		}

		const fixElement = ([...container.children] as HTMLElement[]).find(
			(element) => element.dataset?.fix === selectedFix,
		);

		if (fixElement) {
			const containerRect = container.getBoundingClientRect();
			const elementRect = fixElement.getBoundingClientRect();
			const elementTopRelativeToContainer =
				elementRect.top - containerRect.top + container.scrollTop;
			container.scrollTop =
				elementTopRelativeToContainer -
				container.clientHeight / 2 +
				fixElement.offsetHeight / 2;
		}
		updateScrollState();
	}, [selectedFix, updateScrollState]);

	// Update scroll state when fixes change
	React.useEffect(() => {
		updateScrollState();
	}, [trajectoryFixes, nearbyFixes, searchText, updateScrollState]);

	const scrollUp = (): void => {
		const container = listRef.current;
		if (container) {
			container.scrollBy({ top: -24, behavior: "smooth" });
			setTimeout(updateScrollState, 50);
		}
	};

	const scrollDown = (): void => {
		const container = listRef.current;
		if (container) {
			container.scrollBy({ top: 24, behavior: "smooth" });
			setTimeout(updateScrollState, 50);
		}
	};

	// Filter fix names for datalist autocomplete
	const filteredFixNames =
		searchTerm.length < 3
			? []
			: [...fixStore.fixes.keys()].filter((fixName) =>
					fixName.includes(searchTerm),
				);

	filteredFixNames.sort((a, b) => {
		const aStarts = a.startsWith(searchTerm);
		const bStarts = b.startsWith(searchTerm);
		if (aStarts && !bStarts) {
			return -1;
		}
		if (!aStarts && bStarts) {
			return 1;
		}
		return a.localeCompare(b);
	});

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		onSearchChange?.(e.target.value);
		setShowWarning(false);
	};

	return (
		<div className="flex flex-col bg-[#1e3a5f]">
			<button
				type="button"
				onClick={scrollUp}
				disabled={!canScrollUp}
				className={`btn btn-ghost btn-xs text-xs ${!canScrollUp ? "opacity-30" : ""}`}
			>
				▲
			</button>
			<div
				className="h-32 overflow-y-scroll scrollbar-hide bg-[#1e3a5f] flex flex-col"
				ref={listRef}
				onScroll={updateScrollState}
			>
				{displayedTrajectoryFixes.length > 0 && (
					<ListOfFixes
						fixes={displayedTrajectoryFixes}
						currentFix=""
						selectedFix={selectedFix}
						onSelect={onSelect}
						onHover={onHover}
					/>
				)}
				{displayedTrajectoryFixes.length > 0 &&
					displayedNearbyFixes.length > 0 && (
						<div className="text-xs text-center text-gray-400 py-1 border-t border-b border-gray-500">
							— Nearby —
						</div>
					)}
				{displayedNearbyFixes.length > 0 && (
					<ListOfFixes
						fixes={displayedNearbyFixes}
						currentFix=""
						selectedFix={selectedFix}
						onSelect={onSelect}
						onHover={onHover}
					/>
				)}
				{hasNoDisplayedFixes && (
					<div className="text-xs text-center text-gray-400 py-2">
						{searchTerm ? "" : "No fixes available"}
					</div>
				)}
			</div>
			<button
				type="button"
				onClick={scrollDown}
				disabled={!canScrollDown}
				className={`btn btn-ghost btn-xs text-xs ${!canScrollDown ? "opacity-30" : ""}`}
			>
				▼
			</button>
			{onSearchChange && (
				<div className="px-1 py-1 bg-gray-700/50">
					<input
						className={`input input-bordered input-xs bg-transparent text-white w-full ${showWarning ? "input-warning" : ""}`}
						value={searchText}
						onChange={handleSearchChange}
						placeholder="Type fix..."
						list={datalistId}
					/>
					{datalistId && (
						<datalist id={datalistId}>
							{filteredFixNames.map((fixName) => (
								<option key={fixName} value={fixName} />
							))}
						</datalist>
					)}
				</div>
			)}
		</div>
	);
}
