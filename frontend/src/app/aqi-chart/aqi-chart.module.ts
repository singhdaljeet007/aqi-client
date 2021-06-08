import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AqiChartComponent } from './aqi-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    AqiChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ]
})
export class AqiChartModule { }
