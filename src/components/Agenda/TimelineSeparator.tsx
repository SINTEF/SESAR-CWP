import { memo } from "react";

type SeparatorProps = {
	bottomPx: number;
	time: string;
};

/**
 * A horizontal separator line on the timeline with a time label.
 */
const TimelineSeparator = memo(function TimelineSeparator({
	bottomPx,
	time,
}: SeparatorProps) {
	return (
		<div
			className="absolute left-0 right-0 border-t border-base-content/20 pointer-events-none transition-[bottom] duration-300 ease-out"
			style={{ bottom: bottomPx }}
		>
			<span
				className="absolute left-1 text-[8px] bg-base-300 px-0.5 text-base-content/60 select-none"
				style={{ transform: "translateY(-50%)" }}
			>
				{time}
			</span>
		</div>
	);
});

export default TimelineSeparator;
