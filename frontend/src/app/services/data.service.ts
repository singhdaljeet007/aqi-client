import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
export const WS_ENDPOINT = environment.WS_ENDPOINT;
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cityData: any=[];

  constructor(private httpClient: HttpClient) {
   }


   getCitiesData(): Observable<any> {
    return this.httpClient.get<any>(WS_ENDPOINT)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  processError(err:any) {
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
  // setupSocketConnection() {
  //   this.socket = io(environment.WS_ENDPOINT,{});
  //   console.log(environment.WS_ENDPOINT);
  //   this.socket.emit([{city:"Mumbai",aqi:"150.23145"},{city:"Chennai",aqi:"162.4512"}]);
  //   this.socket.on((data: Array<any>) => {
  //     console.log(data);
  //     data.forEach(({city,aqi}) => {
  //       console.log(`The AQI of ${city} is ${aqi}`);
  //     });
  //   });
  // }



  getCityData():any{
    this.cityData=[{city:"Mumbai",aqi:"178.12321"},{city:"Delhi",aqi:"220.783124"},{city:"Bangalore",aqi:"90.4601234"},{city:"Chennai",aqi:"48.325105"}];
    return this.cityData;
  }
}
