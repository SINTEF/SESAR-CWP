import Flatbush from "flatbush";
import type { ObservableMap } from "mobx";
import { computed, makeAutoObservable, observable } from "mobx";
import type {
	FlightMilestonePositionMessage,
	NewPointMessage,
} from "../proto/ProtobufAirTrafficSimulator";
import FixModel from "./FixModel";

export default class FixStore {
	fixes: ObservableMap<string, FixModel> = observable.map(undefined, {
		deep: false,
	});

	constructor() {
		makeAutoObservable(
			this,
			{
				fixList: computed({ keepAlive: true }),
				fixIndex: computed({ keepAlive: true }),
			},
			{ autoBind: true },
		);
	}

	handleNewPointMessage(newPoint: NewPointMessage): void {
		const fullId = newPoint.nodeId;
		const id = fullId.split("_")[1];
		const position = newPoint.position?.position;
		if (position?.oneofKind !== "position4D") {
			throw new Error("Unsupported position");
		}
		this.fixes.set(
			id,
			new FixModel({
				pointId: id,
				latitude: position.position4D.latitude,
				longitude: position.position4D.longitude,
			}),
		);
	}

	handleNewMilestoneMessage(message: FlightMilestonePositionMessage): void {
		const fixName = message.position?.objectId;
		if (!fixName) {
			throw new Error("Missing fix name");
		}
		const selectedFix = this.fixes.get(fixName);
		const aircraftId = message.flightUniqueId;
		const selectedAircraft = selectedFix?.sectorFlightList.get(aircraftId);
		// biome-ignore lint/suspicious/noConsole: needed for now
		console.log(selectedAircraft);
	}

	/** Array of all fixes for indexed access */
	get fixList(): FixModel[] {
		return Array.from(this.fixes.values());
	}

	/** Spatial index for KNN queries - points added as degenerate rectangles */
	get fixIndex(): Flatbush {
		const fixList = this.fixList;
		const index = new Flatbush(fixList.length);

		for (const fix of fixList) {
			// Add point as degenerate rectangle (min == max)
			index.add(fix.longitude, fix.latitude, fix.longitude, fix.latitude);
		}

		index.finish();
		return index;
	}

	/**
	 * Find the K nearest fixes to a given position
	 * @param longitude - Longitude of the search point
	 * @param latitude - Latitude of the search point
	 * @param maxResults - Maximum number of results to return
	 * @param excludeIds - Set of fix IDs to exclude from results
	 * @returns Array of fix names sorted by distance
	 */
	findNearestFixes(
		longitude: number,
		latitude: number,
		maxResults = 50,
		excludeIds?: Set<string>,
	): string[] {
		const fixList = this.fixList;
		if (fixList.length === 0) {
			return [];
		}

		const fixIndex = this.fixIndex;
		const neighborIndices = fixIndex.neighbors(
			longitude,
			latitude,
			maxResults + (excludeIds?.size ?? 0),
		);

		const result: string[] = [];
		for (const idx of neighborIndices) {
			const fix = fixList[idx];
			if (excludeIds?.has(fix.pointId)) {
				continue;
			}
			result.push(fix.pointId);
			if (result.length >= maxResults) {
				break;
			}
		}

		return result;
	}
}
