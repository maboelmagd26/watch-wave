/** App-level location: what the rest of the app needs to fetch a forecast. */
export interface Location {
  id: number | string;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}
