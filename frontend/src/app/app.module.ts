import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LastUpdatedPipe } from './pipes/last-updated.pipe'
import { AqiHighlightDirective } from './directives/aqi-highlight.directive';
import { DataService } from './services/data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { WebSocketService } from './services/web-socket.service';

@NgModule({
  declarations: [
    AppComponent,
    AqiHighlightDirective,
    LastUpdatedPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HighchartsChartModule
  ],
  providers: [DataService, WebSocketService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

