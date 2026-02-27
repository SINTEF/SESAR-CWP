import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { polygon as turfPolygon } from "@turf/helpers";
import type { Feature, Polygon } from "geojson";
import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable } from "mobx";
import type { NewAirBlockMessage } from "../proto/ProtobufAirTrafficSimulator";
import CoordinatePair from "./CoordinatePair";

type FlightLevelBounds = {
	bottomFlightLevel: number;
	topFlightLevel: number;
};

class AirblockModel {
	readonly airblockId: string;

	readonly bottomFlightLevel: number;

	readonly topFlightLevel: number;

	readonly area: readonly CoordinatePair[];

	readonly turfPolygon: Feature<Polygon>;

	constructor({
		airblockId,
		bottomFlightLevel,
		topFlightLevel,
		area,
	}: {
		airblockId: string;
		bottomFlightLevel: number;
		topFlightLevel: number;
		area: CoordinatePair[];
	}) {
		this.airblockId = airblockId;
		this.bottomFlightLevel = bottomFlightLevel;
		this.topFlightLevel = topFlightLevel;
		this.area = Object.freeze([...area]);
		const coordinates = this.area.map((coord) => [
			coord.longitude,
			coord.latitude,
		]);
		this.turfPolygon = turfPolygon([[...coordinates, coordinates[0]]]);
		Object.freeze(this);
	}

	containsPoint(
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

	containsPointWithinBounds(
		longitude: number,
		latitude: number,
		altitude: number | undefined,
		flightLevelBounds: FlightLevelBounds,
	): boolean {
		if (
			altitude !== undefined &&
			(altitude < flightLevelBounds.bottomFlightLevel ||
				altitude > flightLevelBounds.topFlightLevel)
		) {
			return false;
		}

		return booleanPointInPolygon([longitude, latitude], this.turfPolygon);
	}
}

export default class AirblockStore {
	airblocks: ObservableMap<string, AirblockModel> = observable.map(undefined, {
		deep: false,
	});

	constructor() {
		makeAutoObservable(
			this,
			{
				getAirblockFromId: false,
				existsIn: false,
			},
			{ autoBind: true },
		);
	}

	handleNewAirBlock(newAirBlock: NewAirBlockMessage): void {
		const id = newAirBlock.airBlockId;

		if (this.airblocks.has(id)) {
			return;
		}

		const airblockArea = newAirBlock.area.map((area) => {
			if (area.position.oneofKind !== "position4D") {
				throw new Error("Unsupported position type");
			}
			return new CoordinatePair({
				latitude: area.position.position4D.latitude,
				longitude: area.position.position4D.longitude,
			});
		});

		if (airblockArea.length === 0) {
			throw new Error("Area is empty");
		}

		this.airblocks.set(
			id,
			new AirblockModel({
				airblockId: id,
				area: airblockArea,
				bottomFlightLevel: newAirBlock.bottomFlightLevel,
				topFlightLevel: newAirBlock.topFlightLevel,
			}),
		);
	}

	getAirblockFromId(airblockId: string): AirblockModel | undefined {
		return this.airblocks.get(airblockId);
	}

	existsIn(airblockId: string): boolean {
		return this.airblocks.has(airblockId);
	}

	isPointInAirblock(
		airblockId: string,
		longitude: number,
		latitude: number,
		altitude?: number,
	): boolean {
		const airblock = this.getAirblockFromId(airblockId);
		if (!airblock) {
			return false;
		}

		return airblock.containsPoint(longitude, latitude, altitude);
	}

	isPointInAirblockWithinBounds(
		airblockId: string,
		longitude: number,
		latitude: number,
		altitude: number | undefined,
		flightLevelBounds: FlightLevelBounds,
	): boolean {
		const airblock = this.getAirblockFromId(airblockId);
		if (!airblock) {
			return false;
		}

		return airblock.containsPointWithinBounds(
			longitude,
			latitude,
			altitude,
			flightLevelBounds,
		);
	}
}
