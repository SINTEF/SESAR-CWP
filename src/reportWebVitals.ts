import * as Sentry from "@sentry/react";
import type { Metric } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void): void => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import("web-vitals")
			.then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
				onCLS(onPerfEntry);
				onINP(onPerfEntry);
				onFCP(onPerfEntry);
				onLCP(onPerfEntry);
				onTTFB(onPerfEntry);
			})
			.catch((error) => {
				// biome-ignore lint/suspicious/noConsole: needed for now
				console.error(error);
				Sentry.captureException(error);
			});
	}
};

export default reportWebVitals;
