import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AqiDashboardComponent } from './aqi-dashboard.component';
import { AqiHighlightDirective } from '../directives/aqi-highlight.directive';
import { LastUpdatedPipe } from '../pipes/last-updated.pipe';

@NgModule({
  declarations: [
    AqiDashboardComponent,
    AqiHighlightDirective,
    LastUpdatedPipe
  ],
  imports: [
    CommonModule
  ]
})
export class AqiDashboardModule { }
