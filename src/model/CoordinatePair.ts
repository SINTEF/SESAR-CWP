/** Coordinate pair.
 * Please notice that this is NOT a mobx observable class.
 * */
export default class CoordinatePair {
	longitude = 0;

	latitude = 0;

	altitude? = 0;

	constructor({
		longitude,
		latitude,
		altitude,
	}: {
		longitude: number;
		latitude: number;
		altitude?: number;
	}) {
		this.longitude = longitude;
		this.latitude = latitude;
		this.altitude = altitude;
	}
}
