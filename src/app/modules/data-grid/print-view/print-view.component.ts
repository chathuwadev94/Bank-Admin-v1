import {Component, Input, OnInit} from '@angular/core';
import {GlobalVariable} from '../../../core/com-classes';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.css']
})
export class PrintViewComponent implements OnInit {

  @Input() gridConfig: any = {};
  @Input() objectList: any = [];
  @Input() formattedData: any = [];

  constructor(public gVariable: GlobalVariable) { }

  ngOnInit() {
  }

}
