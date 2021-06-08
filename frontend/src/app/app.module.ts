import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AqiDashboardComponent } from './aqi-dashboard/aqi-dashboard.component';
import { AqiHighlightDirective } from './directives/aqi-highlight.directive';
import { LastUpdatedPipe } from './pipes/last-updated.pipe';
import { DataService } from './services/data.service';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AqiDashboardComponent,
    AqiHighlightDirective,
    LastUpdatedPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,   
    SharedModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

