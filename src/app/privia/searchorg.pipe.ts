import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchorg'
})
export class SearchorgPipe implements PipeTransform {

  transform(value,args?): Array<any> {
    let searchText1 = new RegExp(args, 'ig');

    if (value) {
      return value.filter(Projects => {
        if (Projects.subdivisionInfo?.name) {
          return Projects.subdivisionInfo?.name.search(searchText1)!== -1 ;
        }
      });
    }
}}