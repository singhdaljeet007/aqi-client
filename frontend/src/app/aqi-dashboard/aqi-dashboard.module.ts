import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AqiDashboardComponent } from './aqi-dashboard.component';
import { AqiHighlightDirective } from '../directives/aqi-highlight.directive';
import { LastUpdatedPipe } from '../pipes/last-updated.pipe';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    AqiDashboardComponent,
    AqiHighlightDirective,
    LastUpdatedPipe
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,    
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AqiDashboardModule { }
