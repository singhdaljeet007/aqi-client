import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AqiData } from './interfaces/aqi-data.interface';
import { DataService } from './services/data.service';

let ELEMENT_DATA:Array<AqiData>=[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'air-quality-monitoring';
  aqiData: Array<any> =[];
  displayedColumns: string[] = ['city', 'aqi', 'last_updated'];
  dataSource = new MatTableDataSource();
 
  constructor(private dataService:DataService){
  }
  
  async ngOnInit() {
    this.dataService.getCitiesData().subscribe((response)=>{
        console.log(response);
    })
    // this.dataService.setupSocketConnection();
    this.aqiData = this.dataService.getCityData();
    this.setElementData();
  }

  async setElementData(){
    await this.aqiData.forEach((elem:any) => {
        elem['last_updated'] = new Date().getTime();
        ELEMENT_DATA.push(elem);
    });
    this.dataSource.data=ELEMENT_DATA;
  }
}
