import { observer } from "mobx-react-lite";
import { Marker } from "react-map-gl/maplibre";
import { popupLinesStore } from "../state";

/**
 * Renders all popup connector lines in a single layer.
 * This component should be placed in the Map component BEFORE the Aircrafts component,
 * so that all lines render below all popup contents.
 */
export default observer(function PopupLines() {
	return (
		<>
			{popupLinesStore.visibleLines.map((line) => (
				<Marker
					key={line.id}
					longitude={line.longitude}
					latitude={line.latitude}
					anchor="center"
					style={{ zIndex: 1 }}
				>
					<div
						className="absolute h-[1.5px] origin-left pointer-events-none"
						style={{
							top: `${line.lineStartY}px`,
							left: `${line.lineStartX}px`,
							width: `${line.lineLength}px`,
							transform: `rotate(${line.lineAngle}rad)`,
							background: line.color,
						}}
					/>
				</Marker>
			))}
		</>
	);
});
