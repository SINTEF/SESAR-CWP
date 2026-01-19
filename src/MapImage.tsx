import * as Sentry from "@sentry/react";
import React from "react";
import { useMap } from "react-map-gl/maplibre";

type MapImageProps = {
	url: string;
	name: string;
	sdf?: boolean;
};

export function MapImage({ url, name, sdf = true }: MapImageProps) {
	const { current: map } = useMap();

	React.useEffect(() => {
		if (!map || map.hasImage(name)) {
			return;
		}

		map
			.loadImage(url)
			.then((response) => {
				if (!map.hasImage(name)) {
					map.addImage(name, response.data, { sdf });
				}
			})
			.catch((error) => {
				// biome-ignore lint/suspicious/noConsole: fine
				console.error(`Could not load image ${name} from ${url}:`, error);
				Sentry.captureException(error);
			});
	}, [map, url, name, sdf]);

	return null;
}
