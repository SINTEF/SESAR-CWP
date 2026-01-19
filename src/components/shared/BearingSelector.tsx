import React from "react";

interface BearingSelectorProps {
	/** The currently selected bearing (1-360) */
	value: number;
	/** Called when the bearing changes */
	onChange: (bearing: number) => void;
	/** The aircraft's current bearing (for highlighting) */
	currentBearing?: number;
	/** Whether to show relative bearing columns */
	showRelativeColumns?: boolean;
}

function ListOfBearings(properties: {
	value: number;
	onClick: (bearing: number) => void;
	currentBearing: number;
}) {
	const { value, onClick, currentBearing } = properties;
	const rows = [];

	// Generate bearings from 360 down to 5 in steps of 5
	for (let bearing = 360; bearing >= 5; bearing -= 5) {
		const isSelected = bearing === value;
		const isCurrent = bearing === currentBearing;

		rows.push(
			<button
				type="button"
				key={bearing}
				onClick={(): void => onClick(bearing)}
				className={`
					block px-0 py-1 text-xs text-center
					bg-[#1e3a5f] text-white
					hover:bg-[#4b90db]
					border-none outline-none
					${isCurrent ? "font-bold" : ""}
				`}
				data-bearing={bearing}
			>
				{isSelected ? (
					<>
						<span>&gt;</span>&nbsp;{bearing.toString().padStart(3, "0")}&nbsp;
						<span>&lt;</span>
					</>
				) : (
					bearing.toString().padStart(3, "0")
				)}
			</button>,
		);
	}

	return <>{rows}</>;
}

function RelativeBearingColumn(properties: {
	values: number[];
	onClickRelative: (delta: number) => void;
}) {
	const { values, onClickRelative } = properties;
	return (
		<div className="flex flex-col justify-center gap-0.5 bg-[#2a5a8f] p-1">
			{values.map((delta) => (
				<button
					type="button"
					key={delta}
					onClick={(): void => onClickRelative(delta)}
					className="px-2 py-1 text-xs text-center bg-[#3a6a9f] text-white hover:bg-[#4b90db] border-none outline-none"
				>
					{delta > 0 ? `+${delta}` : delta}
				</button>
			))}
		</div>
	);
}

/**
 * Reusable bearing/heading selector component.
 * Displays a scrollable list of bearings (5-360) with optional relative change columns.
 */
export default function BearingSelector({
	value,
	onChange,
	currentBearing = 0,
	showRelativeColumns = true,
}: BearingSelectorProps): React.ReactNode {
	const listRef = React.useRef<HTMLDivElement>(null);

	const bearingStep = 5;
	const bearingMin = 5;
	const bearingMax = 360;

	const currentBearingRounded = Math.round(currentBearing / 5) * 5 || 360;

	// Scroll to the selected bearing when value changes
	React.useEffect(() => {
		const container = listRef.current;
		if (!container) {
			return;
		}

		const listElement = ([...container.children] as HTMLButtonElement[]).find(
			(element) => element.dataset.bearing === `${value}`,
		);

		if (listElement) {
			const containerRect = container.getBoundingClientRect();
			const elementRect = listElement.getBoundingClientRect();
			const elementTopRelativeToContainer =
				elementRect.top - containerRect.top + container.scrollTop;
			container.scrollTop =
				elementTopRelativeToContainer -
				container.clientHeight / 2 +
				listElement.offsetHeight / 2;
		}
	}, [value]);

	const handleBearingChange = (direction: "up" | "down"): void => {
		let newValue: number;
		if (direction === "up") {
			newValue = value + bearingStep;
			if (newValue > bearingMax) {
				newValue = bearingMin;
			}
		} else {
			newValue = value - bearingStep;
			if (newValue < bearingMin) {
				newValue = bearingMax;
			}
		}
		onChange(newValue);
	};

	const handleRelativeBearingClick = (delta: number): void => {
		let newBearing = (currentBearingRounded + delta) % 360;
		if (newBearing <= 0) {
			newBearing += 360;
		}
		onChange(newBearing);
	};

	// Relative bearing values for left and right columns
	const negativeDeltaValues = [-5, -10, -15, -20, -25, -30];
	const positiveDeltaValues = [5, 10, 15, 20, 25, 30];

	const centerColumn = (
		<div className="flex flex-col bg-[#1e3a5f] p-1">
			<button
				type="button"
				onClick={(): void => handleBearingChange("up")}
				className="btn btn-ghost btn-xs text-xs"
			>
				▲
			</button>
			<div
				className="h-40 overflow-y-scroll scrollbar-hide bg-[#1e3a5f] flex flex-col"
				ref={listRef}
			>
				<ListOfBearings
					value={value}
					onClick={onChange}
					currentBearing={currentBearingRounded}
				/>
			</div>
			<button
				type="button"
				onClick={(): void => handleBearingChange("down")}
				className="btn btn-ghost btn-xs text-xs"
			>
				▼
			</button>
		</div>
	);

	if (!showRelativeColumns) {
		return centerColumn;
	}

	return (
		<div className="flex flex-row gap-1 justify-center items-center">
			<RelativeBearingColumn
				values={negativeDeltaValues}
				onClickRelative={handleRelativeBearingClick}
			/>
			{centerColumn}
			<RelativeBearingColumn
				values={positiveDeltaValues}
				onClickRelative={handleRelativeBearingClick}
			/>
		</div>
	);
}
