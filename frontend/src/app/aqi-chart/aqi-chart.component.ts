import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { AqiData } from '../interfaces/aqi-data.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'aqi-chart',
  templateUrl: './aqi-chart.component.html',
  styleUrls: ['./aqi-chart.component.css']
})
export class AqiChartComponent {
  @Input('city') city:string='';
  rate: any;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  aqiDataSubscription:Subscription;
  cityAqiData:Array<AqiData>=[];

  constructor(private dataService:DataService){
    this.aqiDataSubscription = this.dataService.getCityAqiDataSubject().subscribe((data)=>{
      //console.log("cityAqiData from app component:",data);
      this.cityAqiData=<Array<AqiData>>data;
      if(this.city && this.city!=""){
        this.refreshMap();
      }
    });
    this.dataService.getCitiesData().then((data)=>{
      this.cityAqiData= <Array<AqiData>>data;
      if(this.city && this.city!=""){
        this.refreshMap();
      }
    })
  }

  refreshMap() {
      this.rate = this.cityAqiData.find((elem:any)=>elem.city.toString().toLowerCase()==this.city.toString().toLowerCase());
      this.chardata.push(Number(this.rate.aqi));
      this.chartOptions = {
        series: [{
          data: this.chardata,
        }, ],
        chart: {
          type: "line",
          zoomType: 'x'
        },
        title: {
          text: this.city+ ' AQI Chart',
        }
      }
  }

  ngOnDestroy(){
    this.aqiDataSubscription.unsubscribe();
  }
}
