import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AqiData } from './interfaces/aqi-data.interface';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'air-quality-monitoring';
  displayedColumns: string[] = ['city', 'aqi', 'last_updated'];
  dataSource = new MatTableDataSource();
  aqiDataSubscription:Subscription;

  constructor(private dataService:DataService){
    this.aqiDataSubscription = this.dataService.getCityAqiDataSubject().subscribe((data)=>{
      //console.log("cityAqiData from app component:",data);
      this.dataSource.data=<Array<AqiData>>data
    })
  }
  
  async ngOnInit() {
    this.dataService.getCitiesData().then((data)=>{
      this.dataSource.data= <Array<AqiData>>data;
    })
  }

  ngOnDestroy(){
    this.aqiDataSubscription.unsubscribe();
  }
}
