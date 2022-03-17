/** Coordinate pair.
 * Please notice that this is NOT a mobx observable class.
 * */
export default class CoordinatePair {
  longitude = 0;

  latitude = 0;

  constructor({
    longitude,
    latitude,
  }) {
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
