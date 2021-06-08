import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AqiChartComponent } from './aqi-chart/aqi-chart.component';
import { AqiDashboardComponent } from './aqi-dashboard/aqi-dashboard.component';
import { AqiHighlightDirective } from './directives/aqi-highlight.directive';
import { LastUpdatedPipe } from './pipes/last-updated.pipe';
import { DataService } from './services/data.service';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AqiDashboardComponent,
    AqiChartComponent,
    AqiHighlightDirective,
    LastUpdatedPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,   
    SharedModule,
    HighchartsChartModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

