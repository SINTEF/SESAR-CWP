import { usePostHog } from "posthog-js/react";
import AltitudeFilterPanel from "./components/AltitudeFilterPanel";
import ControllerModal from "./components/ControllerModal";
import Draggable2DView from "./components/Draggable2DView";
import DypTable from "./components/DypTable";
import ImageConfiguration from "./components/ImageConfiguration";
// biome-ignore lint/suspicious/noShadowRestrictedNames: Should change one day, but not today
import Map from "./components/Map";
import MqttIndicators from "./components/MqttIndicators";
import SepQdmOverlay from "./components/SepQdmOverlay";
import clientId from "./mqtt-client/clientId";

// Might be reused for DIALOG
// const onLayoutChange = throttle(166, (): void => {
//   // Dispatch a resize event to the whole application
//   // Mapbox/Maplibre listen to it
//   window.dispatchEvent(new Event('resize'));
// });

export default function App(/* properties */) {
	const posthog = usePostHog();
	posthog.group("clientId", clientId);

	return (
		<main>
			<Map />
			<DypTable />
			<Draggable2DView />
			<ControllerModal />
			<AltitudeFilterPanel />
			<ImageConfiguration />
			<SepQdmOverlay />
			<div className="fixed top-3 left-2 z-50">
				<MqttIndicators />
			</div>
		</main>
	);
}
