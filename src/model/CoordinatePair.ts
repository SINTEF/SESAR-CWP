/** Coordinate pair.
 * Please notice that this is NOT a mobx observable class.
 * */
export default class CoordinatePair {
  longitude = 0;

  latitude = 0;

  constructor({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) {
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
