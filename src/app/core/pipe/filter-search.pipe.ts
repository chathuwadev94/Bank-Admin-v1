import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, options: any[]): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter( item => {
      // return item['EmployeeNo'].toLowerCase().includes(searchText);
      return JSON.stringify(item).toLowerCase().includes(searchText);
      // return (item.EmployeeNo + item.FullName.toLowerCase()).includes(searchText);

    });
  }

}
