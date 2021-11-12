import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(value: any, search:number): any {
    const filteredSongs=[];
    if(search==null){
      return value;
    }
    for(const item of value){
      if(item.categoryId===search){
        filteredSongs.push(item);
      }
    }
    return filteredSongs;

  }

}
