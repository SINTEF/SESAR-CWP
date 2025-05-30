import React from "react";

interface Props {
	cx?: number;
	cy?: number;
	index?: number;
	payload?: { label: string; labelIndex: number };
}

const LABEL_OFFSET = 28; // Distance label is offset up/down
const LINE_LENGTH = 24; // Length of the dashed connector line
const PADDING_X = 4; // Horizontal padding inside bg rect
const PADDING_Y = 2; // Vertical padding inside bg rect

const CustomDotWithLabel: React.FC<Props> = ({ cx, cy, payload }) => {
	if (cx == null || cy == null || !payload?.label || !payload?.labelIndex) {
		return null;
	}

	const direction = payload.labelIndex % 2 === 0 ? -1 : 1;
	const labelY = cy + direction * LABEL_OFFSET;
	const lineY = cy + direction * LINE_LENGTH;

	// Approximate width based on label length, fontSize 12px roughly 7px width per char
	const textWidth = (payload.label.length || 0) * 7;

	return (
		<g>
			{/* Dashed connector line */}
			<line
				x1={cx}
				y1={cy}
				x2={cx}
				y2={lineY}
				stroke="#ff6b6b"
				strokeDasharray="3 3"
				strokeWidth={1}
			/>
			{/* Background rectangle behind the text */}
			<rect
				x={cx - textWidth / 2 - PADDING_X}
				y={labelY - 12 / 2 - PADDING_Y} // 12 is fontSize, center vertically
				width={textWidth + PADDING_X * 2}
				height={12 + PADDING_Y * 2}
				fill="#555555"
				rx={1} // Rounded corners
				ry={1}
			/>
			{/* Label */}
			<text
				x={cx}
				y={labelY}
				fill="#ff6b6b"
				fontSize="12"
				textAnchor="middle"
				dominantBaseline="central"
			>
				{payload.label}
			</text>
			{/* Styled dot */}
			<circle
				cx={cx}
				cy={cy}
				r={3}
				fill="#ff6b6b"
				stroke="#cccccc"
				strokeWidth={1}
			/>
		</g>
	);
};

export default CustomDotWithLabel;
