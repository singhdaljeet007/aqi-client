import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AqiData } from './interfaces/aqi-data.interface';
import { DataService } from './services/data.service';

let ELEMENT_DATA:Array<AqiData>=[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'air-quality-monitoring';
  aqiData: Array<any> =[];
  displayedColumns: string[] = ['city', 'aqi', 'last_updated'];
  dataSource = new MatTableDataSource();
  aqiDataSubscription:Subscription;

  constructor(private dataService:DataService){
    this.aqiDataSubscription = this.dataService.getCityAqiDataSubject().subscribe((data)=>{
      console.log("cityAqiData from app component:",data);
    })
  }
  
  async ngOnInit() {
    this.dataService.getCitiesData().then((data)=>{
      console.log("cityAqiData from appcomponent ngOnInit:",data);
    })
    // this.dataService.setupSocketConnection();
    this.aqiData = this.dataService.getCityData();
    this.setElementData();
  }

  async setElementData(){
    await this.aqiData.forEach((elem:any) => {
        elem['last_updated'] = new Date().getTime();
        ELEMENT_DATA.push(elem);
    });
    this.dataSource.data=ELEMENT_DATA;
  }

  ngOnDestroy(){
    this.aqiDataSubscription.unsubscribe();
  }
}
