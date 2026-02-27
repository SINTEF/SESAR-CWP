import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable } from "mobx";
import type { NewAirBlockMessage } from "../proto/ProtobufAirTrafficSimulator";
import CoordinatePair from "./CoordinatePair";
import SectorModel from "./SectorModel";

export default class AirblockStore {
	airblocks: ObservableMap<string, SectorModel> = observable.map(undefined, {
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
			new SectorModel({
				sectorId: id,
				sectorArea: airblockArea,
				bottomFlightLevel: newAirBlock.bottomFlightLevel,
				topFlightLevel: newAirBlock.topFlightLevel,
			}),
		);
	}

	getAirblockFromId(airblockId: string): SectorModel | undefined {
		return this.airblocks.get(airblockId);
	}

	existsIn(airblockId: string): boolean {
		return this.airblocks.has(airblockId);
	}
}
