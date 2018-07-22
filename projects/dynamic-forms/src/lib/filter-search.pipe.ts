import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
@Injectable()
export class FilterSearchPipe implements PipeTransform {
  transform(items: {key: string, label: string}[], args: any[]): any {

    let search: string = <string>(<any>args);
    if (!search)
      search = "";

    if (!items)
      return items;

    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(
      item => item.label.toLowerCase().indexOf(search) !== -1
    );

  }
}
