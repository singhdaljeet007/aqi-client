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
  aqiData: Array<AqiData> =[];
  displayedColumns: string[] = ['city', 'aqi', 'last_updated'];
  dataSource = new MatTableDataSource();
  aqiDataSubscription:Subscription;

  constructor(private dataService:DataService){
    this.aqiDataSubscription = this.dataService.getCityAqiDataSubject().subscribe((data)=>{
      //console.log("cityAqiData from app component:",data);
      this.dataSource.data=this.aqiData;
    })
  }
  
  async ngOnInit() {
    this.dataService.getCitiesData().then((data)=>{
      this.aqiData = <Array<AqiData>>data;
      this.dataSource.data=this.aqiData;
    })
  }

  ngOnDestroy(){
    this.aqiDataSubscription.unsubscribe();
  }
}
