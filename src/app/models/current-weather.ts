export interface CurrentWeather {

  weatherText: string;
  temperature: {
    celsius: number,
    fahrenheit: number
  };
  isDayTime: boolean;
}
