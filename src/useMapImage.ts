import * as Sentry from "@sentry/react";
import React from "react";
import { MapRef } from "react-map-gl/maplibre";

type UseMapImageOptions = {
	mapRef: React.RefObject<MapRef | null>;
	url: string;
	name: string;
	sdf?: boolean;
};

export function useMapImage({
	mapRef,
	url,
	name,
	sdf = true,
}: UseMapImageOptions) {
	React.useEffect(() => {
		if (mapRef.current) {
			const map = mapRef.current.getMap();

			map
				.loadImage(url)
				.then((image) => {
					if (!map.hasImage(name)) {
						map.addImage(name, image.data, { sdf });
					}
				})
				.catch((error) => {
					// biome-ignore lint/suspicious/noConsole: fine
					console.error(`Could not load image ${name} from ${url}:`, error);
					Sentry.captureException(error);
				});
		}
	}, [mapRef.current]);
}
