import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, search:string): any {
    if(value.length===0 || search==='' || search.startsWith(' ')){
      return value;
    }
    const filteredSongs=[];
    for(const item of value){
      if(item.name.toLowerCase().startsWith(search) || item.artistName.toLowerCase().startsWith(search)){
filteredSongs.push(item);
      }
    }
    return filteredSongs;

  }

}
