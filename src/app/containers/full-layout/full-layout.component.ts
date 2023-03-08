import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
    collapedSideBar: boolean;

    constructor() {}

    ngOnInit() {}

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
