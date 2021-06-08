import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// const materialModules = [
//   MatTableModule,
//   MatPaginatorModule,
//   MatSortModule
// ];

@NgModule({
  declarations:[],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    MatTableModule
  ],
})
export class SharedModule { }
