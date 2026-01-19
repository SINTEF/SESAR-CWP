import { Layer } from "react-map-gl/maplibre";

/**
 * An invisible anchor layer used for z-ordering of dynamic layers.
 *
 * Due to a limitation in react-map-gl where dynamically toggled layers
 * don't maintain their order, we use empty "anchor" layers as reference points.
 * Dynamic layers can use the `beforeId` prop pointing to these anchors
 * to ensure consistent ordering.
 *
 * @see https://github.com/visgl/react-map-gl/issues/939
 */
export default function EmptyLayer({ id }: { id: string }) {
	return (
		<Layer
			id={id}
			type="background"
			layout={{ visibility: "none" }}
			paint={{}}
		/>
	);
}
