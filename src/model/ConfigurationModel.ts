import { makeObservable, ObservableMap, observable } from "mobx";
import type { NewAirspaceConfigurationMessage } from "../proto/ProtobufAirTrafficSimulator";
import AirspaceVolumeReference from "./AirspaceVolumeReference";
import CoordinatePair from "./CoordinatePair";

export default class ConfigurationModel {
	configurationId: string;

	edges: CoordinatePair[];

	includedAirspaces: ObservableMap<string, AirspaceVolumeReference> =
		observable.map(undefined, { deep: false });

	constructor({
		configurationId,
		edges,
		includedAirspaces,
	}: {
		configurationId: string;
		edges: CoordinatePair[];
		includedAirspaces: AirspaceVolumeReference[];
	}) {
		makeObservable(this, {
			configurationId: false, // ID is not observable
			edges: observable,
			includedAirspaces: observable,
		});
		this.configurationId = configurationId;
		this.edges = edges;
		this.includedAirspaces = new ObservableMap<string, AirspaceVolumeReference>(
			includedAirspaces.map((includedAirspace) => [
				includedAirspace.volumeId,
				includedAirspace,
			]),
		);
	}

	static fromProto(
		newConfiguration: NewAirspaceConfigurationMessage,
	): ConfigurationModel {
		const { configurationId, area, includedAirspaceVolumes } = newConfiguration;
		const edges = area.map((edge) => {
			if (edge.position.oneofKind !== "position4D") {
				throw new Error("Insupported position type");
			}
			return new CoordinatePair({
				latitude: edge.position.position4D.latitude,
				longitude: edge.position.position4D.longitude,
			});
		});
		const includedAirspaces = includedAirspaceVolumes.map(
			(includedAirspace) => {
				const { volumeId, bottomFlightLevel, topFlightLevel } =
					includedAirspace;
				return new AirspaceVolumeReference({
					volumeId,
					bottomFlightLevel,
					topFlightLevel,
				});
			},
		);

		return new ConfigurationModel({
			configurationId,
			edges,
			includedAirspaces,
		});
	}
}
