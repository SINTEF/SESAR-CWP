import "maplibre-gl/dist/maplibre-gl.css";
import "allotment/dist/style.css";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-mono";
import "./index.css";
import "./mqtt-client";
import "./frontendSimulationLogic";

import { PostHogProvider } from "posthog-js/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DraggingProvider } from "./contexts/DraggingContext";
import { interceptPostHogEvent } from "./posthog-interceptor";
import reportWebVitals from "./reportWebVitals";
import * as state from "./state";

// Removed StrictMode to be able to make SectorConfigutations Draggable
// (will see if this causes problems) <React.StrictMode>
const root = ReactDOM.createRoot(
	document.querySelector("#root") ?? document.body,
);

// Main app content
const appContent = (
	<DraggingProvider>
		<App />
	</DraggingProvider>
);

// Only wrap with PostHogProvider if we have a valid API key
root.render(
	import.meta.env.VITE_PUBLIC_POSTHOG_KEY ? (
		<PostHogProvider
			apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
			options={{
				api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
				defaults: "2025-05-24",
				capture_exceptions: true, // This enables capturing exceptions using Error Tracking
				debug: false, // Disabled to reduce console noise
				disable_session_recording: false, // Ensure session recording is enabled
				autocapture: true, // Capture all user interactions automatically
				capture_dead_clicks: true,
				session_recording: {
					captureCanvas: {
						recordCanvas: true,
						canvasFps: 1, // Capture at 1 frame per second to reduce performance impact
						canvasQuality: "0.5", // 0.4 by default
					},
				},
				person_profiles: "always", // Ensure person profiles are always created
				// Intercept all events before they're sent to PostHog
				before_send: interceptPostHogEvent,
			}}
		>
			{appContent}
		</PostHogProvider>
	) : (
		appContent
	),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// @ts-expect-error - This is a global variable
window.debugState = state;
