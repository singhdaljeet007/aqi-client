import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AqiData } from 'src/app/interfaces/aqi-data.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-aqi-dashboard',
  templateUrl: './aqi-dashboard.component.html',
  styleUrls: ['./aqi-dashboard.component.css']
})
export class AqiDashboardComponent implements OnInit {
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
