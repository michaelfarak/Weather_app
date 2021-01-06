export class Favorite {
  id: number;
  name: string;
  locationKey: string;
  currentWeather: {
    temperature: number,
    weatherText: string
  };
}
