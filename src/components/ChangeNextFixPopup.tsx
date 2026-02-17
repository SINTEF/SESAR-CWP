import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import type AircraftModel from "../model/AircraftModel";
import {
	changeNextWaypointOfAircraft,
	handlePublishPromise,
} from "../mqtt-client/publishers";
import { configurationStore, cwpStore, fixStore } from "../state";

/** Sub-component that displays the list of trajectory fixes as clickable buttons */
function ListOfFixes(properties: {
	fixes: string[];
	currentFix: string;
	selectedFix: string;
	onSelect: (fix: string) => void;
	onHover: (fix: string | null) => void;
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
						onMouseEnter={(): void => onHover(fix)}
						onMouseLeave={(): void => onHover(null)}
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

export default observer(function ChangeNextFixPopup(properties: {
	aircraft: AircraftModel;
}) {
	const posthog = usePostHog();
	const {
		aircraftId,
		assignedFlightId,
		controlledBy,
		callSign,
		nextFix,
		lastKnownLongitude,
		lastKnownLatitude,
	} = properties.aircraft;

	const [selectedFix, setSelectedFix] = React.useState("");
	const [manualFix, setManualFix] = React.useState("");
	const [showWarning, setShowWarning] = React.useState(false);
	const [canScrollUp, setCanScrollUp] = React.useState(false);
	const [canScrollDown, setCanScrollDown] = React.useState(false);
	const [hoveredFix, setHoveredFix] = React.useState<string | null>(null);
	const listOfFixesRef = React.useRef<HTMLDivElement>(null);

	const shouldShow = cwpStore.aircraftsWithNextFixPopup.has(aircraftId);

	// Upcoming route fixes are computed in the model using ACTUAL milestone events
	// with timestamp fallback when no event has been received yet.
	const trajectoryFixes = properties.aircraft.upcomingRouteFixes;

	// Build exclude set for trajectory fixes (stable reference for filter function)
	const trajectoryFixSet = React.useMemo(
		() => new Set(trajectoryFixes),
		[trajectoryFixes],
	);

	// Get search term for filtering
	const searchTerm = manualFix.toUpperCase().trim();

	// Get 50 nearest fixes using KNN search, excluding trajectory fixes
	// When searching, apply string filter directly in the spatial query
	const nearbyFixes = React.useMemo(() => {
		const fixList = fixStore.fixList;
		const excludeIndices = fixStore.buildExcludeIndexSet(trajectoryFixSet);

		const filterFn = (index: number): boolean => {
			if (excludeIndices.has(index)) {
				return false;
			}
			// If there's a search term, also filter by string match
			if (searchTerm) {
				return fixList[index].pointId.includes(searchTerm);
			}
			return true;
		};

		return fixStore.findNearestFixes(
			lastKnownLongitude,
			lastKnownLatitude,
			50,
			filterFn,
		);
	}, [lastKnownLongitude, lastKnownLatitude, trajectoryFixSet, searchTerm]);

	// Update scroll button states based on scroll position
	const updateScrollState = React.useCallback(() => {
		const container = listOfFixesRef.current;
		if (!container) {
			return;
		}
		setCanScrollUp(container.scrollTop > 0);
		setCanScrollDown(
			container.scrollTop + container.clientHeight < container.scrollHeight - 1,
		);
	}, []);

	// Scroll to the selected fix when popup opens or selection changes
	React.useEffect(() => {
		const container = listOfFixesRef.current;
		if (!container || !selectedFix) {
			return;
		}

		const fixElement = ([...container.children] as HTMLButtonElement[]).find(
			(element) => element.dataset.fix === selectedFix,
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
	}, [selectedFix, shouldShow, updateScrollState]);

	// Update scroll state when fixes change
	React.useEffect(() => {
		updateScrollState();
	}, [trajectoryFixes, nearbyFixes, manualFix, updateScrollState]);

	// Reset selection when popup opens
	React.useEffect(() => {
		if (shouldShow) {
			setSelectedFix(nextFix);
		}
	}, [shouldShow, nextFix]);

	// Update preview line based on hovered fix or exact text match
	React.useEffect(() => {
		if (!shouldShow) {
			return;
		}

		// Priority: hovered fix > exact text match
		if (hoveredFix) {
			cwpStore.setNextFixPreview(aircraftId, hoveredFix);
			return;
		}

		// Check for exact text match (case-insensitive)
		const upperManualFix = manualFix.toUpperCase().trim();
		if (upperManualFix && fixStore.fixes.has(upperManualFix)) {
			cwpStore.setNextFixPreview(aircraftId, upperManualFix);
			return;
		}

		// No preview to show
		cwpStore.clearNextFixPreview();
	}, [shouldShow, hoveredFix, manualFix, aircraftId]);

	// Cleanup preview when popup closes or component unmounts
	React.useEffect(() => {
		return () => {
			cwpStore.clearNextFixPreview();
		};
	}, []);

	if (!shouldShow) {
		return null;
	}

	const close = (): void => {
		cwpStore.clearTaRequestCallback();
		cwpStore.clearNextFixPreview();
		cwpStore.closeChangeNextFixForAircraft(aircraftId);
		posthog?.capture("next_fix_popup_closed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			action: "cancelled",
		});
	};

	const applyFix = (fixName: string): void => {
		const upperFixName = fixName.toLocaleUpperCase();

		// If TA request callback is set, call it instead of normal behavior
		if (cwpStore.taRequestCallback) {
			// Still validate that the fix exists
			if (!fixStore.fixes.has(upperFixName)) {
				setShowWarning(true);
				return;
			}
			cwpStore.taRequestCallback(upperFixName);
			cwpStore.clearTaRequestCallback();
			cwpStore.clearNextFixPreview();
			cwpStore.closeChangeNextFixForAircraft(aircraftId);
			return;
		}

		const latOfFix = fixStore.fixes.get(upperFixName)?.latitude;
		const longOfFix = fixStore.fixes.get(upperFixName)?.longitude;

		// Validate that the fix exists
		if (latOfFix === undefined || longOfFix === undefined) {
			setShowWarning(true);
			return;
		}

		const pilotId =
			configurationStore.currentCWP === "All" ? "All" : controlledBy;
		handlePublishPromise(
			changeNextWaypointOfAircraft({
				pilotId,
				waypointId: upperFixName,
				flightId: assignedFlightId,
				latitude: latOfFix,
				longitude: longOfFix,
				viaLat: "",
				viaLong: "",
				viaWaypointId: "",
			}),
		);

		posthog?.capture("next_fix_changed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			previous_fix: nextFix,
			new_fix: upperFixName,
			via_fix: null,
			controlled_by: controlledBy,
			pilot_id: pilotId,
		});

		close();
	};

	const handleFixClick = (fix: string): void => {
		// In TA request mode, always apply (even if clicking current fix)
		if (cwpStore.taRequestCallback) {
			applyFix(fix);
			return;
		}
		if (fix === nextFix) {
			// If clicking on the current fix (no change), just close the popup
			close();
		} else {
			// Otherwise, apply immediately
			applyFix(fix);
		}
	};

	const handleApply = (): void => {
		// Prefer manual input over list selection
		const fixToApply = manualFix.trim() || selectedFix;
		if (fixToApply) {
			applyFix(fixToApply);
		}
	};

	const scrollUp = (): void => {
		const container = listOfFixesRef.current;
		if (container) {
			container.scrollBy({ top: -24, behavior: "smooth" });
			setTimeout(updateScrollState, 50);
		}
	};

	const scrollDown = (): void => {
		const container = listOfFixesRef.current;
		if (container) {
			container.scrollBy({ top: 24, behavior: "smooth" });
			setTimeout(updateScrollState, 50);
		}
	};

	// Filter fix names for the datalist autocomplete based on manual input
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

	// Filter displayed trajectory fixes based on the text input
	// (nearby fixes are already filtered in the spatial query)
	const displayedTrajectoryFixes = searchTerm
		? trajectoryFixes.filter((fix) => fix.includes(searchTerm))
		: trajectoryFixes;
	const displayedNearbyFixes = nearbyFixes;
	const hasNoDisplayedFixes =
		displayedTrajectoryFixes.length === 0 && displayedNearbyFixes.length === 0;

	const isTaRequestMode = !!cwpStore.taRequestCallback;

	return (
		<div
			className={`w-24 bg-[#1e3a5f] p-0 shadow-lg ${isTaRequestMode ? "border-2 border-yellow-400" : ""}`}
			style={{ borderRadius: 0 }}
		>
			{isTaRequestMode && (
				<div className="text-center text-[10px] py-0.5 bg-yellow-500 text-black font-medium">
					TA Request
				</div>
			)}
			<div className="text-center font-bold text-xs py-1 bg-black text-white">
				{callSign}
			</div>
			<div className="text-center text-xs py-1 bg-gray-700/50">Next Fix</div>
			<div className="flex flex-col">
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
					ref={listOfFixesRef}
					onScroll={updateScrollState}
				>
					{displayedTrajectoryFixes.length > 0 && (
						<ListOfFixes
							fixes={displayedTrajectoryFixes}
							currentFix={nextFix}
							selectedFix={selectedFix}
							onSelect={handleFixClick}
							onHover={setHoveredFix}
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
							currentFix={nextFix}
							selectedFix={selectedFix}
							onSelect={handleFixClick}
							onHover={setHoveredFix}
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
			</div>
			<div className="px-1 py-1 bg-gray-700/50">
				<input
					className={`input input-bordered input-xs bg-transparent text-white w-full ${showWarning ? "input-warning" : ""}`}
					value={manualFix}
					onChange={(e): void => {
						setManualFix(e.target.value);
						setShowWarning(false);
					}}
					placeholder="Type fix..."
					list={`fix-names-${aircraftId}`}
				/>
				<datalist id={`fix-names-${aircraftId}`}>
					{filteredFixNames.map((fixName) => (
						<option key={fixName} value={fixName} />
					))}
				</datalist>
			</div>
			{showWarning && (
				<div className="text-xs text-center text-warning py-1">
					Fix not found
				</div>
			)}
			<div className="flex gap-0.5 mt-1">
				<button
					type="button"
					onClick={close}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={handleApply}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Apply
				</button>
			</div>
		</div>
	);
});
