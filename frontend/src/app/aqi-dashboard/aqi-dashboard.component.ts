import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { AqiData } from 'src/app/interfaces/aqi-data.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-aqi-dashboard',
  templateUrl: './aqi-dashboard.component.html',
  styleUrls: ['./aqi-dashboard.component.css']
})
export class AqiDashboardComponent {
  title = 'air-quality-monitoring';
  displayedColumns: string[] = ['city', 'aqi', 'last_updated','action'];
  dataSource = new MatTableDataSource();
  aqiDataSubscription:Subscription;
  selectedCity:string='';
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private dataService:DataService){
    this.aqiDataSubscription = this.dataService.getCityAqiDataSubject().subscribe((data)=>{
      //console.log("cityAqiData from app component:",data);
      this.dataSource.data=<Array<AqiData>>data;
    });
    this.dataService.getCitiesData().then((data)=>{
      this.dataSource.data= <Array<AqiData>>data;
      this.selectedCity = (<Array<AqiData>>data)[0].city;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.dataSource.sort = <MatSort>this.sort;
  }
  ngOnDestroy(){
    this.aqiDataSubscription.unsubscribe();
  }
  selectCity(city:string){
    this.selectedCity = city;
    this.dataService.updateCityChangeSubject();
  }
}
