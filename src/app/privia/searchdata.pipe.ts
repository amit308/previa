import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchdata'
})
export class SearchdataPipe implements PipeTransform {
  transform(value,args?): Array<any> {
    let searchText = new RegExp(args, 'ig');

    if (value) {
      return value.filter(Projects => {
        if (Projects.name) {
          return Projects.name.search(searchText)!== -1 || Projects.code.search(searchText) !== -1 
        }
      });
    }
}}
