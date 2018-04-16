import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(values: any, searchParam: any): any {
    if(searchParam === undefined) return values;
    return values.filter(function(value){
      return value.title.toLowerCase().includes(searchParam.toLowerCase());
    })
  }

}
