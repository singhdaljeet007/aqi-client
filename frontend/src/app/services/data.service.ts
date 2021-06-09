import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { io } from 'socket.io-client';
export const WS_ENDPOINT = environment.WS_ENDPOINT;
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";
import { AqiData } from '../interfaces/aqi-data.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cityData: any = [];
  private socket: WebSocketSubject<any>
  private messagesSubject = new Subject<any>();
  private changeCitySubject = new Subject<any>();
  private cityAqiData: Array<any> = [];
  constructor() {
    this.socket = this.getNewWebSocket();
  }

  getCitiesData() {
    return new Promise(async (resolve, reject) => {
      await this.socket.pipe(
        tap({
          error: error => console.log('socket error', error),
          complete: () => console.log('socket Connection Closed')
        }
        )).subscribe(async data => {
          // console.log("new cityAqiData from ws:", data);
            let cityData = this.cityAqiData.map(item => {
              let item2 = data.find((i2:any) => i2.city.toString().toLowerCase() === item.city.toString().toLowerCase());
              return item2 ? { ...item, ...item2 } : item;
            }); 
          let arr3 = data.filter((item1:any) => !cityData.some(item2 => item1.city.toString().toLowerCase() === item2.city.toString().toLowerCase()));
          let mergedArr = [ ...cityData, ...arr3 ]
          this.cityAqiData = await mergedArr.map((elem: any) => { return this.setLastUpdated(elem) })
          await this.refreshData();
          resolve(this.cityAqiData);
        })
    })
  }

  setLastUpdated(elem: any) {
    elem['last_updated'] = new Date().getTime();
    return elem;
  }

  private getNewWebSocket() {
    return webSocket(WS_ENDPOINT);
  }

  getCityAqiDataSubject() {
    return this.messagesSubject.asObservable();
  }

  getChangeCitySubject(){
      return this.changeCitySubject.asObservable();
  }
  updateCityChangeSubject(){
    this.changeCitySubject.next();
  }

  refreshData() {
    this.messagesSubject.next(this.cityAqiData);
  }
  sendMessage(msg: any) {
    this.socket.next(msg);
  }
  close() {
    this.socket.complete();
  }
  getCityData(): any {
    this.cityData = [{ city: "Mumbai", aqi: "178.12321" }, { city: "Delhi", aqi: "220.783124" }, { city: "Bangalore", aqi: "90.4601234" }, { city: "Chennai", aqi: "48.325105" }];
    return this.cityData;
  }
}
