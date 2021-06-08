import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { io } from 'socket.io-client';
export const WS_ENDPOINT = environment.WS_ENDPOINT;
import { Observable, throwError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EMPTY, Subject } from 'rxjs';
import { catchError, map, retry, switchAll, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private messagesSubject = new Subject();
  public messages = this.messagesSubject.pipe(map(data=>data));
  myWebSocket: WebSocketSubject<any> = webSocket(WS_ENDPOINT);
  
  constructor(private socket:WebSocketSubject<any>){
    // this.socket = this.getNewWebSocket();
    this.myWebSocket.subscribe(
      msg => console.log('message received: ' + msg),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
   );
  }

  sendMessageToServer() {
    this.myWebSocket.next({message: 'some message'});
  }
  // public connect(): void {
  
  //   if (!this.socket || this.socket.closed) {
  //     this.socket = this.getNewWebSocket();
  //     const messages = this.socket.pipe(
  //       tap({
  //         error: error => console.log(error),
  //       }), catchError(_ => EMPTY));
  //     this.messagesSubject.next(messages);
  //   }
  // }
  
  // private getNewWebSocket() {
  //   return webSocket(WS_ENDPOINT);
  // }
  // sendMessage(msg: any) {
  //   this.socket.next(msg);
  // }
  // close() {
  //   this.socket.complete(); 
  // }
}
