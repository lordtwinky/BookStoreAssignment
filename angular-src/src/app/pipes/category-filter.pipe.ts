import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(values: any, searchParam: any): any {
    if(searchParam === undefined) return values;
    return values.filter(function(value){
      return value.category.includes(searchParam);
    })
    
  }

}
