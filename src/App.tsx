import "./App.css";

import * as React from "react";

// import { throttle } from 'throttle-debounce';
import AircraftListElement from "./components/AircraftListElement";
import AltitudeFilterPanel from "./components/AltitudeFilterPanel";
// import BottomNavbar from "./components/BottomNavbar";
import ControllerModal from "./components/ControllerModal";
// import HugeNextText from "./components/HugeNextText";
import Draggable2DView from "./components/Draggable2DView";
// biome-ignore lint/suspicious/noShadowRestrictedNames: Should change one day, but not today
import Map from "./components/Map";
import SectorFlightList from "./components/SectorFlightList";
// import Time from "./components/Time";
import VoiceCommandFeedback from "./components/VoiceCommandFeedback";
import ImageConfiguration from "./components/ImageConfiguration";
import DypTable from "./components/DypTable";

// Might be reused for DIALOG
// const onLayoutChange = throttle(166, (): void => {
//   // Dispatch a resize event to the whole application
//   // Mapbox/Maplibre listen to it
//   window.dispatchEvent(new Event('resize'));
// });

export default function App(/* properties */): JSX.Element {
	return (
		<>
			<main>
				<Map />
				<DypTable />
				<Draggable2DView />
				{/* <SectorFlightList /> */}
				{/* <AircraftListElement /> */}
				<ControllerModal />
				<AltitudeFilterPanel />
				<ImageConfiguration />
			</main>
			{/* <BottomNavbar /> */}
			<VoiceCommandFeedback />
		</>
	);
}
