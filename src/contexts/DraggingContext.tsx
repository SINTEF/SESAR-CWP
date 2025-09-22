import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

export interface DraggingContextType {
	isDragging: boolean;
	startDragging: () => void;
	stopDragging: () => void;
	// isDragging is a boolean and sometimes the value has changed and we want to
	// check the new state before re-rendering the React component.
	isStillDragging: () => boolean;
}

const DraggingContext = createContext<DraggingContextType | undefined>(
	undefined,
);

export const useDragging = (): DraggingContextType => {
	const context = useContext(DraggingContext);
	if (!context) {
		throw new Error("useDragging must be used within a DraggingProvider");
	}
	return context;
};

interface DraggingProviderProps {
	children: ReactNode;
}

export const DraggingProvider: React.FC<DraggingProviderProps> = ({
	children,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [startDragTimeout, setStartDragTimeout] = useState<number | null>(null);
	const [stopDragTimeout, setStopDragTimeout] = useState<number | null>(null);

	const startDragging = useCallback(() => {
		// Clear any pending stop timeout
		if (stopDragTimeout) {
			clearTimeout(stopDragTimeout);
			setStopDragTimeout(null);
		}

		// Only start the drag timer if we're not already dragging and haven't started the timer
		if (!isDragging && !startDragTimeout) {
			const timeout = window.setTimeout(() => {
				setIsDragging(true);
				setStartDragTimeout(null);
			}, 200); // 200ms delay to distinguish from clicks
			setStartDragTimeout(timeout);
		}
	}, [isDragging, startDragTimeout, stopDragTimeout]);

	const stopDragging = useCallback(() => {
		// Clear any pending start timeout (in case of quick release)
		if (startDragTimeout) {
			clearTimeout(startDragTimeout);
			setStartDragTimeout(null);
		}

		// Only set stop timeout if not already pending
		if (!stopDragTimeout) {
			// Small delay to prevent flicker when transitioning between draggable elements
			const timeout = window.setTimeout(() => {
				setIsDragging(false);
				setStopDragTimeout(null);
			}, 16);
			setStopDragTimeout(timeout);
		}
	}, [startDragTimeout, stopDragTimeout]);

	const isStillDragging = () => isDragging;

	const value: DraggingContextType = {
		isDragging,
		startDragging,
		stopDragging,
		isStillDragging,
	};

	return (
		<DraggingContext.Provider value={value}>
			{children}
		</DraggingContext.Provider>
	);
};
