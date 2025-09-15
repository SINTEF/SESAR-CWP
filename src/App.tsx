import AltitudeFilterPanel from "./components/AltitudeFilterPanel";
import ControllerModal from "./components/ControllerModal";
import Draggable2DView from "./components/Draggable2DView";
import DypTable from "./components/DypTable";
import ImageConfiguration from "./components/ImageConfiguration";
// biome-ignore lint/suspicious/noShadowRestrictedNames: Should change one day, but not today
import Map from "./components/Map";
import MqttIndicators from "./components/MqttIndicators";

// Might be reused for DIALOG
// const onLayoutChange = throttle(166, (): void => {
//   // Dispatch a resize event to the whole application
//   // Mapbox/Maplibre listen to it
//   window.dispatchEvent(new Event('resize'));
// });

export default function App(/* properties */) {
	return (
		<>
			<main>
				<Map />
				<DypTable />
				<Draggable2DView />
				<ControllerModal />
				<AltitudeFilterPanel />
				<ImageConfiguration />
			</main>
			<div className="fixed top-3 left-2 z-50">
				<MqttIndicators />
			</div>
		</>
	);
}
