import React from "react";

export interface BottomLeftLabelProps {
  scale?: number; // Optional scaling factor (e.g., 1 = default, 0.5 = half-size)
}

const BottomLeftLabel: React.FC<BottomLeftLabelProps> = ({ scale = 1 }) => {
  const size = 60 * scale;

  return (
    <div
      className="absolute bottom-0 left-0"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size}>
        <line
          x1="0"
          y1={size}
          x2={size}
          y2="0"
          stroke="#ccc"
          strokeWidth={1 * scale}
        />
        <text
          x={size * 0.13}
          y={size * 0.35}
          fill="#ccc"
          fontSize={12 * scale}
          fontFamily="sans-serif"
        >
          FL
        </text>
        <text
          x={size * 0.5}
          y={size * 0.85}
          fill="#ccc"
          fontSize={12 * scale}
          fontFamily="sans-serif"
        >
          TIME
        </text>
      </svg>
    </div>
  );
};

export default BottomLeftLabel;
