import type { Duration } from "../proto/google/protobuf/duration";
import type {
	AircraftClass,
	NewAircraftTypeMessage,
	VehicleCategory,
	WakeTurbulenceCategory,
} from "../proto/ProtobufAirTrafficSimulator";

export default class AircraftType {
	vehicleTypeId: string;

	preferredGroundSpeed: number;

	maximumGroundSpeed: number;

	minimumTakeOffDistance: number;

	wingSpan: number;

	length: number;

	wakeTurbulenceCategory: WakeTurbulenceCategory;

	minStartupTime: Duration | undefined;

	aircraftClass: AircraftClass;

	height: number;

	vehicleCategory: VehicleCategory;

	constructor({
		vehicleTypeId,
		preferredGroundSpeed,
		maximumGroundSpeed,
		minimumTakeOffDistance,
		wingSpan,
		length,
		wakeTurbulenceCategory,
		minStartupTime,
		aircraftClass,
		height,
		vehicleCategory,
	}: {
		vehicleTypeId: string;
		preferredGroundSpeed: number;
		maximumGroundSpeed: number;
		minimumTakeOffDistance: number;
		wingSpan: number;
		length: number;
		wakeTurbulenceCategory: WakeTurbulenceCategory;
		minStartupTime?: Duration;
		aircraftClass: AircraftClass;
		height: number;
		vehicleCategory: VehicleCategory;
	}) {
		this.vehicleTypeId = vehicleTypeId;
		this.preferredGroundSpeed = preferredGroundSpeed;
		this.maximumGroundSpeed = maximumGroundSpeed;
		this.minimumTakeOffDistance = minimumTakeOffDistance;
		this.wingSpan = wingSpan;
		this.length = length;
		this.wakeTurbulenceCategory = wakeTurbulenceCategory;
		this.minStartupTime = minStartupTime;
		this.aircraftClass = aircraftClass;
		this.height = height;
		this.vehicleCategory = vehicleCategory;
	}

	static fromProto(
		newAircraftTypeMessage: NewAircraftTypeMessage,
	): AircraftType {
		return new AircraftType({
			vehicleTypeId: newAircraftTypeMessage.vehicleTypeId,
			preferredGroundSpeed: newAircraftTypeMessage.preferredGroundSpeed,
			maximumGroundSpeed: newAircraftTypeMessage.maximumGroundSpeed,
			minimumTakeOffDistance: newAircraftTypeMessage.minimumTakeOffDistance,
			wingSpan: newAircraftTypeMessage.wingSpan,
			length: newAircraftTypeMessage.length,
			wakeTurbulenceCategory: newAircraftTypeMessage.wakeTurbulenceCategory,
			minStartupTime: newAircraftTypeMessage.minStartUpTime,
			aircraftClass: newAircraftTypeMessage.aircraftClass,
			height: newAircraftTypeMessage.height,
			vehicleCategory: newAircraftTypeMessage.vehicleCategory,
		});
	}
}
