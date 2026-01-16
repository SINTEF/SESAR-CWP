import React from "react";

interface FlightLevelSelectorProps {
	value: number;
	onChange: (level: number) => void;
	topFlightLevel?: number;
	bottomFlightLevel?: number;
	/** If true, clicking the current value closes without selection */
	defaultLevel?: number;
}

function ListOfLevels(properties: {
	value: number;
	onClick: (index: number) => void;
	topFlightLevel: number | undefined;
	bottomFlightLevel: number | undefined;
}) {
	const { value, onClick, topFlightLevel, bottomFlightLevel } = properties;
	const rows = [];

	const hasLevel =
		topFlightLevel !== undefined && bottomFlightLevel !== undefined;

	for (let index = 560; index > 200; index -= 10) {
		const isWithinRange =
			hasLevel && index >= bottomFlightLevel && index <= topFlightLevel;
		const isSelected = index === value;

		rows.push(
			<button
				type="button"
				key={index}
				onClick={(): void => onClick(index)}
				className={`
					block px-0 py-1 text-xs text-center
					bg-[#1e3a5f] text-white
					hover:bg-[#4b90db]
					border-none outline-none
					${isWithinRange ? "font-bold" : ""}
				`}
				data-level={index}
			>
				{isSelected ? (
					<>
						<span>&gt;</span>&nbsp;{index}&nbsp;<span>&lt;</span>
					</>
				) : (
					index
				)}
			</button>,
		);
	}

	return <>{rows}</>;
}

/**
 * Reusable flight level selector component.
 * Displays a scrollable list of flight levels (210-560) with up/down buttons.
 */
export default function FlightLevelSelector({
	value,
	onChange,
	topFlightLevel,
	bottomFlightLevel,
	defaultLevel,
}: FlightLevelSelectorProps): React.ReactNode {
	const listRef = React.useRef<HTMLDivElement>(null);

	const sliderStep = 10;
	const flightLevelMin = 210;
	const flightLevelMax = 560;

	// Scroll to the selected level when value changes
	React.useEffect(() => {
		const container = listRef.current;
		if (!container) {
			return;
		}

		const listElement = ([...container.children] as HTMLButtonElement[]).find(
			(element) => element.dataset.level === `${value}`,
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

	const handleLevelChange = (direction: "up" | "down"): void => {
		const newValue = Math.min(
			flightLevelMax,
			Math.max(
				flightLevelMin,
				direction === "up" ? value + sliderStep : value - sliderStep,
			),
		);
		onChange(newValue);
	};

	const handleLevelClick = (level: number): void => {
		onChange(level);
	};

	return (
		<div className="flex flex-col bg-[#1e3a5f]">
			<button
				type="button"
				onClick={(): void => handleLevelChange("up")}
				className="btn btn-ghost btn-xs text-xs"
			>
				▲
			</button>
			<div
				className="h-40 overflow-y-scroll scrollbar-hide bg-[#1e3a5f] flex flex-col"
				ref={listRef}
			>
				<ListOfLevels
					value={value}
					onClick={handleLevelClick}
					topFlightLevel={topFlightLevel}
					bottomFlightLevel={bottomFlightLevel}
				/>
			</div>
			<button
				type="button"
				onClick={(): void => handleLevelChange("down")}
				className="btn btn-ghost btn-xs text-xs"
			>
				▼
			</button>
		</div>
	);
}
