import type { Timestamp } from "../proto/google/protobuf/timestamp";

export default function convertTimestamp(timestamp: Timestamp): number {
	return Number(timestamp.seconds) + timestamp.nanos * 1e-9;
}
