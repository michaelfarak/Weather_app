import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform (value: number, unit: string) {
    if (value && !isNaN(value)){

      if (unit === 'C'){
        const temperature = (value - 32) * (5 / 9) ;
        return temperature.toFixed(1);
      }
      if (unit === 'F'){
        const temperature = (value * (9 / 5)) + 32 ;
        return temperature.toFixed(1);
      }
    }
    return;
  }

}
