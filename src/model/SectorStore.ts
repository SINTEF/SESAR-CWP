import { area } from "@turf/area";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { polygon as turfPolygon } from "@turf/helpers";
import Flatbush from "flatbush";
import type { Feature, Polygon } from "geojson";
import type { ObservableMap } from "mobx";
import { computed, makeAutoObservable, observable } from "mobx";
import type { NewSectorMessage } from "../proto/ProtobufAirTrafficSimulator";
import AirspaceVolumeReference from "./AirspaceVolumeReference";
import CoordinatePair from "./CoordinatePair";

export class Sector {
	sectorId: string;
	description: string;
	includedAirspaceVolumes: AirspaceVolumeReference[];
	area: CoordinatePair[];

	constructor({
		sectorId,
		description,
		includedAirspaceVolumes,
		area,
	}: {
		sectorId: string;
		description: string;
		includedAirspaceVolumes: AirspaceVolumeReference[];
		area: CoordinatePair[];
	}) {
		makeAutoObservable(
			this,
			{
				sectorId: false,
				bounds: computed({ keepAlive: true }),
				turfPolygon: computed({ keepAlive: true }),
			},
			{ autoBind: true },
		);
		this.sectorId = sectorId;
		this.description = description;
		this.includedAirspaceVolumes = includedAirspaceVolumes;
		this.area = area;
	}

	get bounds(): [number, number, number, number] {
		if (this.area.length === 0) {
			return [0, 0, 0, 0];
		}

		const lats = this.area.map((p) => p.latitude);
		const lons = this.area.map((p) => p.longitude);

		return [
			Math.min(...lons),
			Math.min(...lats),
			Math.max(...lons),
			Math.max(...lats),
		];
	}

	get turfPolygon(): Feature<Polygon> {
		const coordinates = this.area.map((coord) => [
			coord.longitude,
			coord.latitude,
		]);
		// Close the polygon by adding the first point at the end
		const boundsGeometry = turfPolygon([[...coordinates, coordinates[0]]]);
		return boundsGeometry;
	}

	get areaSize(): number {
		return area(this.turfPolygon);
	}
}

export default class SectorStore {
	sectors: ObservableMap<string, Sector> = observable.map(undefined, {
		deep: false,
	});

	constructor() {
		makeAutoObservable(
			this,
			{
				sectorList: computed({ keepAlive: true }),
				sectorIndex: computed({ keepAlive: true }),
			},
			{ autoBind: true },
		);
	}

	handleNewSector(newSector: NewSectorMessage): void {
		const { sectorId, description, includedAirspaceVolumes, area } = newSector;

		const sectorArea = area.map((position) => {
			if (position.position.oneofKind !== "position4D") {
				throw new Error("Unsupported position type");
			}
			return new CoordinatePair({
				latitude: position.position.position4D.latitude,
				longitude: position.position.position4D.longitude,
			});
		});

		const volumes = includedAirspaceVolumes.map(
			(volume) =>
				new AirspaceVolumeReference({
					volumeId: volume.volumeId,
					bottomFlightLevel: volume.bottomFlightLevel,
					topFlightLevel: volume.topFlightLevel,
				}),
		);

		const existingSector = this.sectors.get(sectorId);
		if (existingSector) {
			existingSector.description = description;
			existingSector.includedAirspaceVolumes = volumes;
			existingSector.area = sectorArea;
		} else {
			this.sectors.set(
				sectorId,
				new Sector({
					sectorId,
					description,
					includedAirspaceVolumes: volumes,
					area: sectorArea,
				}),
			);
		}
	}

	getSector(sectorId: string): Sector | undefined {
		return this.sectors.get(sectorId);
	}

	hasSector(sectorId: string): boolean {
		return this.sectors.has(sectorId);
	}

	get sectorList(): Sector[] {
		return Array.from(this.sectors.values());
	}

	get sectorIndex(): Flatbush {
		const sectorList = this.sectorList;
		const index = new Flatbush(Math.max(sectorList.length, 10));

		for (const sector of sectorList) {
			const [minLon, minLat, maxLon, maxLat] = sector.bounds;
			index.add(minLon, minLat, maxLon, maxLat);
		}

		index.finish();
		return index;
	}

	findSector(longitude: number, latitude: number): Sector | undefined {
		const sectorList = this.sectorList;
		const sectorIndex = this.sectorIndex;
		const sectorIds = sectorIndex.search(
			longitude,
			latitude,
			longitude,
			latitude,
			(index) => {
				const sector = sectorList[index];
				return booleanPointInPolygon([longitude, latitude], sector.turfPolygon);
			},
		);

		// return the polygon with the smallest area if multiple sectors contain the point
		// this is probably not ideal, but it will do for now
		if (sectorIds.length > 1) {
			let smallestSectorId = sectorIds[0];
			let smallestArea = sectorList[smallestSectorId].areaSize;
			for (const id of sectorIds) {
				const areaSize = sectorList[id].areaSize;
				if (areaSize < smallestArea) {
					smallestArea = areaSize;
					smallestSectorId = id;
				}
			}
			return sectorList[smallestSectorId];
		}

		return sectorIds.length === 1 ? sectorList[sectorIds[0]] : undefined;
	}
}
