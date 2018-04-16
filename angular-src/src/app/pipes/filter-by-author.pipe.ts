import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAuthor'
})
export class FilterByAuthorPipe implements PipeTransform {

  transform(values: any, searchParam: any): any {
    if(searchParam === undefined) return values;
    return values.filter(function(value){
      return value.author.toLowerCase().includes(searchParam.toLowerCase());
    })
    
  }

}
