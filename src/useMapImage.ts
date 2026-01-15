import * as Sentry from "@sentry/react";
import type { Map as MaplibreMap } from "maplibre-gl";
import React from "react";

type UseMapImageOptions = {
	map: MaplibreMap | null;
	url: string;
	name: string;
	sdf?: boolean;
};

export function useMapImage({
	map,
	url,
	name,
	sdf = true,
}: UseMapImageOptions) {
	React.useEffect(() => {
		if (!map) {
			return;
		}

		// If map is already loaded, add the image immediately
		// Otherwise, wait for the load event
		const addImage = () => {
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
		};

		if (map.loaded()) {
			addImage();
			return;
		}

		map.once("load", addImage);
		return () => {
			map.off("load", addImage);
		};
	}, [map, url, name, sdf]);
}
