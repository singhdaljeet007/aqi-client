import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
export const WS_ENDPOINT = environment.WS_ENDPOINT;
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry, switchAll, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";
import { AqiData } from '../interfaces/aqi-data.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cityData: any = [];
  private socket: WebSocketSubject<any>
  private messagesSubject = new Subject<any>();
  private cityAqiData: Array<any> = [];
  constructor() {
    this.socket = this.getNewWebSocket();
    this.connect();
  }

  getCitiesData() {
    return new Promise(async (resolve, reject) => {
      await this.socket.pipe(
        tap({
          error: error => console.log('socket error', error),
          complete: () => console.log('socket Connection Closed')
        }
        )).subscribe(async data => {
          console.log("new cityAqiData from ws:", data);
          let res = await data.reduce((a: any, b: any) => {
            let a1 = this.cityAqiData.find((e: any) => e.city.toString().toLowerCase() === b.city.toString().toLowerCase()) || {};
            return a.concat(Object.assign(a1, b));
          }, []);
          this.cityAqiData = await res.map((elem: any) => { return this.setLastUpdated(elem) })
          await this.refreshData();
          resolve(this.cityAqiData);
        })
    })
  }

  setLastUpdated(elem: any) {
    elem['last_updated'] = new Date().getTime();
    return elem;
  }

  connect() {
    this.socket = this.getNewWebSocket();
  }

  private getNewWebSocket() {
    return webSocket(WS_ENDPOINT);
  }

  getCityAqiDataSubject() {
    return this.messagesSubject.asObservable();
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
