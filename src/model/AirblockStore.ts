import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable } from "mobx";
import type { NewAirBlockMessage } from "../proto/ProtobufAirTrafficSimulator";
import CoordinatePair from "./CoordinatePair";

class AirblockModel {
	readonly airblockId: string;

	readonly bottomFlightLevel: number;

	readonly topFlightLevel: number;

	readonly area: readonly CoordinatePair[];

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
		Object.freeze(this);
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
}
