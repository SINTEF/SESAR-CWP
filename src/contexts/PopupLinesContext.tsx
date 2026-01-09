import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

export interface PopupLineData {
	id: string;
	/** Longitude of the popup anchor point */
	longitude: number;
	/** Latitude of the popup anchor point */
	latitude: number;
	/** Start X offset from anchor (accounts for LINE_START_OFFSET) */
	lineStartX: number;
	/** Start Y offset from anchor (accounts for LINE_START_OFFSET) */
	lineStartY: number;
	/** Length of the line in pixels */
	lineLength: number;
	/** Angle of the line in radians */
	lineAngle: number;
	/** Color of the line */
	color: string;
	/** Whether the line should be displayed */
	visible: boolean;
	/** Z-index of the parent popup (for potential future use) */
	zIndex: number;
}

export interface PopupLinesContextType {
	lines: Map<string, PopupLineData>;
	registerLine: (id: string, data: PopupLineData) => void;
	updateLine: (id: string, data: Partial<PopupLineData>) => void;
	unregisterLine: (id: string) => void;
}

const PopupLinesContext = createContext<PopupLinesContextType | undefined>(
	undefined,
);

export const usePopupLines = (): PopupLinesContextType => {
	const context = useContext(PopupLinesContext);
	if (!context) {
		throw new Error("usePopupLines must be used within a PopupLinesProvider");
	}
	return context;
};

interface PopupLinesProviderProps {
	children: ReactNode;
}

export const PopupLinesProvider: React.FC<PopupLinesProviderProps> = ({
	children,
}) => {
	const [lines, setLines] = useState<Map<string, PopupLineData>>(new Map());

	const registerLine = useCallback((id: string, data: PopupLineData): void => {
		setLines((prev) => {
			const next = new Map(prev);
			next.set(id, data);
			return next;
		});
	}, []);

	const updateLine = useCallback(
		(id: string, data: Partial<PopupLineData>): void => {
			setLines((prev) => {
				const existing = prev.get(id);
				if (!existing) {
					return prev;
				}
				const next = new Map(prev);
				next.set(id, { ...existing, ...data });
				return next;
			});
		},
		[],
	);

	const unregisterLine = useCallback((id: string): void => {
		setLines((prev) => {
			const next = new Map(prev);
			next.delete(id);
			return next;
		});
	}, []);

	const value: PopupLinesContextType = {
		lines,
		registerLine,
		updateLine,
		unregisterLine,
	};

	return (
		<PopupLinesContext.Provider value={value}>
			{children}
		</PopupLinesContext.Provider>
	);
};
