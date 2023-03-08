import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import * as XLSX from 'xlsx';
import {StaticConfig} from '../../core/configs';

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnChanges, OnInit {

    @Input() gridOnChangeTime = 0;
    @Input() gridEvent: any = {};
    @Input() gridConfig: any = {};
    @ViewChildren('FilterBoxList') FilterBoxList: QueryList<any>;
    @Output() onGridActionEvent: EventEmitter<any> = new EventEmitter();
    public formattedData: any = [];
    public objectList: any = [];
    public selectedPagination: any = {};
    public paginationShow: Boolean = true;
    private filterBox: any;
    private sevReq: any = {};
    private sortCondition: any = {};
    private disabledApiCallPagi: boolean;
    private selectedDataList: any = [];
    private paginationChanged: boolean;

    constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe) {
    }

    ngOnInit() {
        this.initGrid();
    }

    onClickSaveExcel() {
        this.formattedData = [];
        let formattedJson = {};
        this.gridConfig.records.forEach(list => {
            let properties = [];
            properties = Object.keys(list.row);
            // properties = Object.keys(list.row).reverse();
            formattedJson = {};
            properties.forEach(obj => {
                // Only for XLSX json
                if (list.row[obj].dataType !== 'image') {
                    const name = JSON.parse(JSON.stringify(list.row[obj].name));
                    formattedJson[name] = list.row[obj].value;
                }
                // formattedJson['"' + list.row[obj].name.replace(/\s/g, "_") + '"'] = list.row[obj].value;
            });
            this.formattedData.push(formattedJson);
        });
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.formattedData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // /* save to file */
        XLSX.writeFile(wb, this.gridConfig.tableName + '.xlsx', {cellStyles: true});
    }

    onClickPrint() {
        this.formattedData = [];
        let formattedJson = {};
        this.gridConfig.records.forEach(list => {
            const properties = Object.keys(list.row);
            formattedJson = {};
            this.objectList = [];
            properties.forEach(obj => {
                if (list.row[obj].dataType !== 'image') {
                    this.objectList.push(list.row[obj].name);
                    formattedJson[list.row[obj].name] = list.row[obj].value;
                }
            });
            this.formattedData.push(formattedJson);
        });
        setTimeout(() => {
            const innerContents = document.getElementById('print-section').innerHTML;
            const Pagelink = 'about:blank';
            const pwa = window.open(Pagelink, 'print');
            pwa.document.open('index.asp', 'popupwindow', 'width=800,height=500,left=200,top=5,scrollbars,toolbar=0,resizable');
            pwa.document.write('<html><head><style>.print-table {\n' +
                '    border: 1px solid black;\n' +
                '  }</style></head><body onload="window.print()">' + innerContents + '</html>');
            pwa.document.close();
            pwa.window.print();
            // pwa.window.close();
        }, 0);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.gridEvent.event) {
            this.onCallGridEvent(this.gridEvent.event, this.gridEvent.data);
        }
    }

    onClickActionBtn(key, record: any) {
        this.onGridActionEvent.emit({action: key, record: record});
    }

    onChangeCheckAllRows() {
        this.readAllRecords();
        this.onGridActionEvent.emit({action: 'check', record: this.selectedDataList});
    }

    onChangeRowCheckBox(event: any, record: any) {
        this.gridConfig.checkAll = true;
        if (event.target.checked) {
            if (!this.selectedDataList.some(x => x.id === record.id)) {
                this.selectedDataList.push(record);
            }
        } else {
            this.gridConfig.checkAllRows = false;
            const recordObj: any = this.selectedDataList.find(x => x.id === record.id);
            const index: number = this.selectedDataList.indexOf(recordObj);
            if (index !== -1) {
                this.selectedDataList.splice(index, 1);
            }
        }
        this.onGridActionEvent.emit({action: 'check', record: this.selectedDataList});
    }

    onClickSortBtn(column) {
        this.sortGridRecords(column);
    }

    onClickOpenFilter(column: any) {
        this.initFilterPanel();
        column.filterPanelOpen = !column.filterPanelOpen;
    }

    onClickFilterBtn($event, column) {
        this.gridConfig.query = this.getFilterCondition();
        this.getFilterConditionnew($event,column);
        this.initSevReq();
        this.getRecords();
        this.toggleDropDown($event, column);
    }

    private getFilterConditionnew($event,column){
        const condition = {
            'key': column.key,
            'operator': column.filterConfig.defaultOperator,
            'value': column.filterConfig.value
        };
       
        this.gridConfig.searchParameters.push(condition);
    }

    onClickFilterClearBtn($event, column) {
        if (typeof column.filterConfig === 'object') {
            column.filterConfig.value = '';
        }
        this.gridConfig.query = this.getFilterCondition();
        this.initSevReq();
        this.getRecords();
        this.toggleDropDown($event, column);
    }

    onChangeFilterDropDown(value: boolean, column: any): void {
        column.filterPanelOpen = value;
    }

    onPageChange($event) {
        this.paginationChanged = true;
        this.gridConfig.checkAllRows = false;
        this.sevReq.skip = ($event.page - 1) * this.gridConfig.pagination.itemsPerPage;
        if (!this.disabledApiCallPagi) {
            this.getRecords();
        }
    }

    onChangePagination(select: any) {
        this.gridConfig.pagination.itemsPerPage = select;
        this.sevReq.limit = select;
        this.getRecords();
    }

    onClickRefresh() {
        this.refreshGrid();
    }

    onClickClear() {
        this.initGrid();
    }

    @HostListener('document:click', ['$event']) clickout(event) {
        this.filterBox = this.FilterBoxList;
        let onClickOutSide = true;
        for (let i = 0; i < this.filterBox._results.length; i++) {
            if (this.filterBox._results[i].nativeElement.contains(event.target)) {
                onClickOutSide = false;
            }
        }
        if (onClickOutSide) {
            this.initFilterPanel();
        }
    }

    private onCallGridEvent(event: string, data: any) {
        try {
            switch (event) {
                case 'add':
                    const obj: any = data || {};
                    obj.trClass = 'new-tr';
                    obj.row = this.analyzeRecordDisplayFormat(data);
                    this.gridConfig.records.unshift(obj);
                    setTimeout(() => {
                        obj.trClass = '';
                    }, 2000);
                    break;
                case 'edit':
                    this.gridConfig.checkAllRows = false;
                    for (let i = 0; i < this.gridConfig.records.length; i++) {
                        if (this.gridConfig.records[i][this.gridConfig.primaryKey] === data[this.gridConfig.primaryKey]) {

                            Object.keys(data).forEach(key => {
                                this.gridConfig.records[i][key] = data[key];
                            });
                            this.gridConfig.records[i].check = false;
                            this.gridConfig.records[i].trClass = 'edit-tr';
                            this.gridConfig.records[i].row = this.analyzeRecordDisplayFormat(this.gridConfig.records[i]);
                            setTimeout(() => {
                                if (this.gridConfig.records[i]) {
                                    this.gridConfig.records[i].trClass = '';
                                }
                            }, 2000);
                            break;
                        }
                    }
                    break;
                case 'delete':
                    for (let i = 0; i < this.gridConfig.records.length; i++) {
                        if (this.gridConfig.records[i][this.gridConfig.primaryKey] === data[this.gridConfig.primaryKey]) {
                            this.gridConfig.records.splice(i, 1);
                            break;
                        }
                    }
                    break;
                case 'search':
                        this.searchValue(data);  
                     break;   
                case 'clear':
                    this.onClickClear();
                    break;
                case 'refresh':
                    this.refreshGrid();
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }

    private searchValue(data:any){
        const condition = {
            'key': data.key,
            'operator': data.operator,
            'value': data.value
        };
       
        this.gridConfig.searchParameters.push(condition);
        this.initSevReq();
        this.getRecords();
    }

    private initGrid() {
        this.paginationChanged = false;
        this.selectedDataList = [];
        this.disabledApiCallPagi = true;
        let count = 0;
        let lastIndex;
        this.gridConfig.columns.forEach((column: any, index: number) => {
            if (column.filterConfig) {
                column.filterConfig.value = '';
                column.tdClass = '';
                count++;
                lastIndex = index;
            }
        });
        if (count > 1) {
            this.gridConfig.columns[lastIndex].filterDropDownRight = true;
        }
        this.selectedPagination = StaticConfig.PAGINATION.ITEMS_PER_PAGE;
        this.gridConfig.pagination.itemsPerPage = StaticConfig.PAGINATION.ITEMS_PER_PAGE;
        this.gridConfig.checkAllRows = false;
        this.gridConfig.pagination.bigTotalItems = 0;
        this.gridConfig.pagination.bigCurrentPage = 1;
        this.gridConfig.query = {};
        this.gridConfig.searchParameters=[];
        this.sortCondition = {};
        this.initSevReq();
        this.readAllColumns();
        this.readAllRecords();
        this.initColumnConfig();
        this.initSortConfig();
        this.getRecords();
        this.hidePagination();
    }

    hidePagination() {
        if (this.gridConfig.hidePagination == null || this.gridConfig.hidePagination === false ||
            this.gridConfig.hidePagination === undefined) {
            this.paginationShow = true;
        } else {
            this.paginationShow = false;
        }
    }

// pagination hide function------------->
    private refreshGrid() {
        this.selectedDataList = [];
        this.disabledApiCallPagi = true;
        this.initSevReq();
        this.readAllRecords();
        this.initSortConfig();
        this.getRecords();
        this.gridConfig.pagination.bigCurrentPage = 1;

    }

    private initSevReq() {
        this.sevReq = {
            'query': JSON.stringify(this.gridConfig.query),
            'projection': '',
            'orderBy': this.getOrderKey(this.gridConfig.orderBy),
            'skip': 0,
            'limit': this.gridConfig.pagination.itemsPerPage,
            'searchKeys':[],
            'values':[],
            'operators':[]
        };
        (this.gridConfig.searchParameters || []).forEach((obj: any) => {
            
            if (obj.key) {
                this.sevReq.searchKeys.push(obj.key);
                this.sevReq.values.push(obj.value);
                this.sevReq.operators.push(obj.operator);
            }
            if (obj.startDate) {
                this.sevReq.startDate = obj.startDate;
            }
            if (obj.endDate) {
                this.sevReq.endDate = obj.endDate;
            }
        });

    }


    private readAllColumns(): void {
        this.gridConfig.columns.forEach((column: any) => {
            column.tdClass = '';
        });
    }

    private readAllRecords(): void {
        this.gridConfig.records.forEach((record: any) => {
            record.check = this.gridConfig.checkAllRows;
            if (record.check) {
                if (!this.selectedDataList.some(x => x.id === record.id)) {
                    this.selectedDataList.push(record);
                }
            } else {
                const recordObj: any = this.selectedDataList.find(x => x.id === record.id);
                const index: number = this.selectedDataList.indexOf(recordObj);
                if (index !== -1) {
                    this.selectedDataList.splice(index, 1);
                }
            }
        });
    }


    private getFilterCondition(): any {
        const query = {};
        this.gridConfig.columns.forEach((column: any) => {
            column.filtered = false;
            column.tdClass = '';
            if (typeof column.filterConfig === 'object' && typeof column.filterConfig.value !== 'undefined' && column.filterConfig.value !== '') {
                const condition = {
                    'key': column.key,
                    'operator': column.filterConfig.defaultOperator,
                    'value': column.filterConfig.value
                };
                switch (column.dataType) {
                    case 'boolean': {
                        condition.value = column.filterConfig.value === 'true';
                        break;
                    }
                    case 'float': {
                        condition.value = parseFloat(column.filterConfig.value) || 0;
                        break;
                    }
                    case 'number': {
                        condition.value = parseInt(column.filterConfig.value, 10) || 0;
                        break;
                    }
                    case 'dateTime': {
                        condition.value = this.datePipe.transform(new Date(column.filterConfig.value), StaticConfig.DATE_TYPES.DATE);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                if (condition.operator !== 'like') {
                    const secondObj = {};
                    secondObj['$' + condition.operator] = condition.value;
                    query[condition.key] = secondObj;
                } else {
                    const secondObj = {};
                    secondObj['$regex'] = condition.value;
                    secondObj['$options'] = 'i';
                    query[condition.key] = secondObj;
                }
                column.filtered = true;
                column.tdClass = 'active-cell';
            }
        });
        return query;
    }

    private initColumnConfig(): void {
        this.gridConfig.columns.forEach((column: any) => {
            column.sorted = false;
            column.filtered = false;
            column.filterPanelOpen = false;
            column.sortConfig = {'key': column.key, 'value': 'none'};
            if (typeof column.filterConfig === 'object' && column.filterConfig.type === 'option') {
                column.filterConfig.value = '';
            }
            if (typeof column.filterConfig === 'object' && column.filterConfig.type === 'date') {
                column.filterConfig.value = '';
            }
        });
    }

    private initSortConfig(): void {
        let initSort;
        if (this.gridConfig.orderBy) {
            initSort = true;
        } else {
            initSort = false;
        }
        this.gridConfig.columns.forEach((column: any) => {
            if (initSort) {
                if (this.gridConfig.orderBy.key === column.key) {
                    column.sorted = true;
                    column.tdClass = '#0000FF';
                    column.sortConfig = {
                        'key': column.key,
                        'value': this.gridConfig.orderBy.value
                    };
                } else {
                    column.sorted = false;
                    column.tdClass = '';
                    column.sortConfig = {
                        'key': column.key,
                        'value': 'none'
                    };
                }
            } else {
                column.sorted = false;
                column.tdClass = '';
                column.sortConfig = {
                    'key': column.key,
                    'value': 'none'
                };
            }
        });
    }

    private clearSort(): void {
        this.gridConfig.columns.forEach((column: any) => {
            column.sorted = false;
            column.tdClass = '';
            column.sortConfig = {
                'key': column.key,
                'value': 'none'
            };
        });
    }

    private initFilterPanel(): void {
        try {
            this.gridConfig.columns.forEach((column: any) => {
                column.filterPanelOpen = false;
            });
        } catch (e) {
        }
    }

    private sortGridRecords(column: any) {
        const value = column.sortConfig.value;
        this.clearSort();
        switch (value) {
            case 'none': {
                column.sortConfig.value = 'asc';
                break;
            }
            case 'asc': {
                column.sortConfig.value = 'desc';
                break;
            }
            case 'desc': {
                column.sortConfig.value = 'asc';
                break;
            }
            default: {
                column.sortConfig.value = 'none';
                break;
            }
        }
        column.sorted = true;
        column.tdClass = '#0000FF';
        this.sortCondition = column.sortConfig;
        this.sevReq.orderBy = this.getOrderKey(column.sortConfig);
        this.getRecords();
    }

    private toggleDropDown($event: MouseEvent, column: any): void {
        $event.preventDefault();
        $event.stopPropagation();
        column.filterPanelOpen = !column.filterPanelOpen;
    }

    private getOrderKey(orderBy: any) {
        const sortObj = {};
        if (orderBy.key) {
            switch (orderBy.value) {
                case 'asc':
                    sortObj[orderBy.key] = 1;
                    break;
                case 'desc':
                    sortObj[orderBy.key] = -1;
                    break;
            }
        }
        return JSON.stringify(sortObj);
    }

    private getRecords() {
        const apiSev = this.gridConfig.apiSev || null;
        const sevFunction = this.gridConfig.sevFunction || null;
        if (apiSev && sevFunction) {
            try {
                this.gridConfig.records = [];
                this.gridConfig.waitingHttpSve = true;
                apiSev[sevFunction](this.sevReq || {}).then((data: any) => {
                    this.gridConfig.pagination.bigTotalItems = data.recordCount || 0;
                    this.gridConfig.records = data.data || [];
                    this.gridConfig.records.forEach((obj: any) => {
                        if (this.gridConfig.tableRow != null) {
                            obj.trClass = this.addRowClass(obj);
                        } else {
                            obj.trClass = '';
                        }
                        if (this.gridConfig.checkList) {
                            this.gridConfig.checkList.forEach((list) => {
                                if (obj.id === list.id) {
                                    obj.check = true;
                                    this.selectedDataList.push(obj);
                                }
                            });
                        }
                        if (this.selectedDataList.length && this.paginationChanged) {
                            this.selectedDataList.forEach((selectedObj) => {
                                if (selectedObj.id === obj.id) {
                                    obj.check = true;
                                }
                            });
                        }
                        obj.row = this.analyzeRecordDisplayFormat(obj);
                    });
                    if (this.gridConfig.checkList && this.gridConfig.checkList.length) {
                        this.onGridActionEvent.emit({action: 'check', record: this.selectedDataList});
                    }
                    this.gridConfig.waitingHttpSve = false;
                    this.disabledApiCallPagi = false;
                }).catch((error: any) => {
                    this.gridConfig.waitingHttpSve = false;
                    this.disabledApiCallPagi = false;
                });
            } catch (e) {
                this.gridConfig.waitingHttpSve = false;
                this.disabledApiCallPagi = false;
                console.log(e);
            }
        }
    }

    private analyzeRecordDisplayFormat(record) {
        const displayObject = {};
        try {
            this.gridConfig.columns.forEach((obj: any) => {
                let displayStyle = obj.dataStyle || {};
                if (obj.key) {
                    const columnsKeyArray = obj.key.split('.');
                    let displayValue = record;

                    if (columnsKeyArray.length > 1) {
                        for (const key in columnsKeyArray) {
                            displayValue = displayValue[columnsKeyArray[key]];
                        }
                    } else {
                        displayValue = record[obj.key];
                    }
                    if (obj.dataDisplayCondition) {
                        for (const key in obj.dataDisplayCondition || []) {
                            if (obj.dataDisplayCondition[key].key === displayValue) {
                                displayValue = obj.dataDisplayCondition[key].value || displayValue;
                                if (obj.dataDisplayCondition[key].style) {
                                    displayStyle = obj.dataDisplayCondition[key].style || {};
                                }
                                break;
                            }
                        }
                    }
                    displayObject[obj.key] = {
                        name: obj.name,
                        value: this.formatDataByType(displayValue, obj),
                        style: displayStyle,
                        dataType: obj.dataType || 'text'
                    };
                }
            });
        } catch (e) {
            console.log(e);
        }
        return displayObject;
    }

    private formatDataByType(value, column) {
        let formattedValue = value;
        const timeZoneOffset = new Date().getTimezoneOffset();
        try {
            switch (column.dataType) {
                case 'dateTime': {
                    if (value != null) {
                        const date = this.datePipe.transform(new Date(value), StaticConfig.DATE_TYPES.DATE);
                        if (new Date(value).getTime() !== new Date(date).getTime()) {
                            value = new Date(new Date(value).getTime() - (timeZoneOffset * 60 * 1000));
                            formattedValue = this.datePipe.transform(new Date(value), column.dataFormat || StaticConfig.DATE_TYPES.DATE);
                        } else {
                            formattedValue = this.datePipe.transform(new Date(value), column.dataFormat || StaticConfig.DATE_TYPES.DATE);
                        }
                    } else {
                        formattedValue = 'N/A';
                    }
                    break;
                }
                case 'decimal': {
                    formattedValue = this.decimalPipe.transform(25.5, column.dataFormat || '1.2-2');
                    break;
                }
                default: {
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }

        return formattedValue;
    }

    private addRowClass(record: any) {
        switch (this.gridConfig.tableRow.operator) {
            case 'eq':
                if (record[this.gridConfig.tableRow.key] === this.gridConfig.tableRow.value) {
                    return this.gridConfig.tableRow.class;
                }
                break;
            default:
                break;
        }
    }

}
