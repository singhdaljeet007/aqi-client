import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, Subscription } from 'rxjs';
import { AqiData } from '../interfaces/aqi-data.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'aqi-chart',
  templateUrl: './aqi-chart.component.html',
  styleUrls: ['./aqi-chart.component.css']
})
export class AqiChartComponent {
  @Input('city') city: string = '';
  @Input() cityChanged: Observable<void> | undefined;

  rate: any;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  aqiDataSubscription: Subscription;
  cityAqiData: Array<AqiData> = [];
  private cityChangeSubscription: Subscription;

  constructor(private dataService: DataService) {
    this.aqiDataSubscription = this.dataService.getCityAqiDataSubject().subscribe((data) => {
      //console.log("cityAqiData from app component:",data);
      this.cityAqiData = <Array<AqiData>>data;
      if (this.city && this.city != "") {
        this.refreshMap();
      }
    });
    Highcharts.setOptions({
      time: {
        useUTC: false,
        timezone: 'Asia/Calcutta',
      }
    });
    this.dataService.getCitiesData().then((data) => {
      this.cityAqiData = <Array<AqiData>>data;
      if (this.city && this.city != "") {
        this.refreshMap();
      }
    })
    this.cityChangeSubscription = (<Observable<void>>this.cityChanged).subscribe(() => this.refreshMap());
  }

  refreshMap() {
    this.rate = this.cityAqiData.find((elem: any) => elem.city.toString().toLowerCase() == this.city.toString().toLowerCase());
    this.chardata.push(Number(this.rate.aqi));
    let classRef = this;
    this.chartOptions = {
      tooltip: {
        enabled: true,
        borderWidth: 1,
        borderColor: '#00537B',
        style: {fontSize: '10px', padding: '3px'},
        // formatter: function() { 
        //   var timeStamp = Highcharts.dateFormat('%H:%M:%S', classRef.rate.last_updated);
        //   var s = '';
  
        //   if(this.points != undefined){
        //     $.each(this.points, function(i, point) {
        //         s += '<br /><span style="color:'+point.series.color+'">'+point.series.name+': </span>'+point.y.toFixed(2);
        //     });
        //   }
        //   else if(this.y != undefined){
        //       s += '<br /><span style="color:'+this.series.color+'">'+this.series.name+': </span>'+this.y.toFixed(2);
        //   }
  
        //   return timeStamp+s;
        // } 
      },
      series: [{
        data: this.chardata,
        pointStart: Date.now(),
        pointInterval: 1000, // one second
        name: this.city +' AQI', 
        color: '#4B088A'
      },],
      chart: {
        type: "line",
        zoomType: 'x'
      },
      title: {
        text: this.city + ' AQI Chart',
      },
      xAxis: {
        ordinal: false,
        type: 'datetime',
        title: {
          text: '',
          align: 'high',
          style: {
            color: '#6D869F',
            fontSize: '10px'
          }
        },
        dateTimeLabelFormats: {
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M'
        }
      },
      yAxis: {
        title: {
          text: this.city+' AQI'
        }
      },
      legend: {
        enabled: false
      },
    }
  }

  ngOnDestroy() {
    this.aqiDataSubscription.unsubscribe();
    this.cityChangeSubscription.unsubscribe();
  }
}
