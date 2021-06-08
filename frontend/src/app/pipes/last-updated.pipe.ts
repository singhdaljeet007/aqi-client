import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastUpdated'
})
export class LastUpdatedPipe implements PipeTransform {

  transform(value: number): string {
    let currentTime = new Date().getTime();
    let diff = currentTime - value;
    if (diff < 3000) {
      return 'A Few seconds Ago';
    }
    if (diff < 60000) {
      let sec = (diff/1000).toFixed(0);
      return `${sec} seconds Ago`;
    }
    if (diff >= 60000 && diff <= 70000) {
      return 'A Minute Ago';
    }
    return this.getShortTime()
  }
  getShortTime(): string {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    let strTime = (hours ? hours : 12) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    return strTime;
  }
}
