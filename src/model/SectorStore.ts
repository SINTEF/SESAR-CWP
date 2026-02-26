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

	get bottomFlightLevel(): number {
		return Math.min(
			...this.includedAirspaceVolumes.map((v) => v.bottomFlightLevel),
		);
	}

	get topFlightLevel(): number {
		return Math.max(
			...this.includedAirspaceVolumes.map((v) => v.topFlightLevel),
		);
	}

	get flightLevelSpan(): number {
		return this.topFlightLevel - this.bottomFlightLevel;
	}

	get flightLevelMidpoint(): number {
		return (this.bottomFlightLevel + this.topFlightLevel) / 2;
	}

	isWithinSector(
		longitude: number,
		latitude: number,
		altitude?: number,
	): boolean {
		if (
			altitude !== undefined &&
			(altitude < this.bottomFlightLevel || altitude > this.topFlightLevel)
		) {
			return false;
		}
		return booleanPointInPolygon([longitude, latitude], this.turfPolygon);
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
		return [...this.sectors.values()];
	}

	get sectorIndex(): Flatbush | undefined {
		const sectorList = this.sectorList;
		if (sectorList.length === 0) {
			return undefined;
		}
		const index = new Flatbush(sectorList.length);

		for (const sector of sectorList) {
			const [minLon, minLat, maxLon, maxLat] = sector.bounds;
			index.add(minLon, minLat, maxLon, maxLat);
		}

		index.finish();
		return index;
	}

	findSectors(
		longitude: number,
		latitude: number,
		altitude?: number,
	): Sector[] | undefined {
		if (altitude !== undefined && altitude > 1023) {
			throw new Error(
				"Altitude exceeds maximum flight level of 1023, are you sending meters while the ATC industry uses body parts?",
			);
		}
		const sectorList = this.sectorList;
		const sectorIndex = this.sectorIndex;
		if (!sectorIndex) {
			return undefined;
		}
		const sectorIds = sectorIndex.search(
			longitude,
			latitude,
			longitude,
			latitude,
			(index) => {
				const sector = sectorList[index];
				return sector.isWithinSector(longitude, latitude, altitude);
			},
		);

		return sectorIds.map((id) => sectorList[id]);
	}

	findSector(
		longitude: number,
		latitude: number,
		altitude?: number,
	): Sector | undefined {
		const sectors = this.findSectors(longitude, latitude, altitude);
		if (!sectors || sectors.length === 0) {
			return undefined;
		}
		if (sectors.length === 1) {
			return sectors[0];
		}

		let bestSector = sectors[0];
		for (let i = 1; i < sectors.length; i++) {
			const candidate = sectors[i];

			if (altitude !== undefined) {
				if (candidate.flightLevelSpan !== bestSector.flightLevelSpan) {
					if (candidate.flightLevelSpan < bestSector.flightLevelSpan) {
						bestSector = candidate;
					}
					continue;
				}

				const candidateAltitudeDelta = Math.abs(
					altitude - candidate.flightLevelMidpoint,
				);
				const bestAltitudeDelta = Math.abs(
					altitude - bestSector.flightLevelMidpoint,
				);
				if (candidateAltitudeDelta !== bestAltitudeDelta) {
					if (candidateAltitudeDelta < bestAltitudeDelta) {
						bestSector = candidate;
					}
					continue;
				}
			}

			if (candidate.areaSize !== bestSector.areaSize) {
				if (candidate.areaSize < bestSector.areaSize) {
					bestSector = candidate;
				}
				continue;
			}

			if (candidate.sectorId.localeCompare(bestSector.sectorId) < 0) {
				bestSector = candidate;
			}
		}

		return bestSector;
	}
}
