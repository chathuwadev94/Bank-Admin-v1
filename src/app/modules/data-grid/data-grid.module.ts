import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DataGridComponent } from './data-grid.component';
import { PrintViewComponent } from './print-view/print-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [DataGridComponent, PrintViewComponent],
  exports: [DataGridComponent]
})
export class DataGridModule { }
