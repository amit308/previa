import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  constructor() { }

  loginData: EventEmitter<any> = new EventEmitter();
  closeSidebar: EventEmitter<any> = new EventEmitter();
  doctorMaster: EventEmitter<any> = new EventEmitter();
}
