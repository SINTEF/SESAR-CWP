import { observer } from "mobx-react-lite";
import { Marker } from "react-map-gl/maplibre";
import { configurationStore } from "../state";

const CenterTextOverlay = observer(function CenterTextOverlay() {
	const currentConfiguration = configurationStore.configurations.get(
		configurationStore.currentConfigurationId,
	);

	if (!currentConfiguration) {
		return null;
	}

	const { volumeIdsLabel, minFlightLevel, maxFlightLevel } =
		currentConfiguration;

	// Don't render if there are no volumes
	if (!volumeIdsLabel) {
		return null;
	}

	return (
		<Marker longitude={6.85} latitude={44} anchor="center">
			<div className="pointer-events-none text-left text-xl font-bold text-[#666]">
				<span>{volumeIdsLabel}</span>
				<br />
				<span className="border-b-2 border-[#666]">FL{maxFlightLevel}</span>
				<br />
				FL{minFlightLevel}
			</div>
		</Marker>
	);
});

export default CenterTextOverlay;
