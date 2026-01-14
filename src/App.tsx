import { usePostHog } from "posthog-js/react";
import Agenda from "./components/Agenda";
import AltitudeFilterPanel from "./components/AltitudeFilterPanel";
import ConnectionErrorModal from "./components/ConnectionErrorModal";
import Draggable2DView from "./components/Draggable2DView";
import DraggableAdminPanel from "./components/DraggableAdminPanel";
import DypTable from "./components/DypTable";
import ImageConfiguration from "./components/ImageConfiguration";
// biome-ignore lint/suspicious/noShadowRestrictedNames: Should change one day, but not today
import Map from "./components/Map";
import MqttIndicators from "./components/MqttIndicators";
import SepQdmOverlay from "./components/SepQdmOverlay";
import StartupModal from "./components/StartupModal";
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
			<div className="flex flex-row h-screen w-screen">
				<Map />
				<Agenda />
			</div>
			<DypTable />
			<Draggable2DView />
			<DraggableAdminPanel />
			<StartupModal />
			<AltitudeFilterPanel />
			<ImageConfiguration />
			<SepQdmOverlay />
			<ConnectionErrorModal />
			<div className="fixed bottom-0.5 right-0.5 z-50">
				<MqttIndicators />
			</div>
		</main>
	);
}
