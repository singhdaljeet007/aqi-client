import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AqiDashboardComponent } from './aqi-dashboard/aqi-dashboard.component';

const routes: Routes = [
  { path: '/',  component: AqiDashboardComponent, pathMatch: 'full'},
  { path: '',  component: AqiDashboardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
