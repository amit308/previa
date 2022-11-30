import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';



@Pipe({
  name: 'textEncode'
})

export class TextEncodePipe implements PipeTransform {
  imageBaseUrl1 = environment.imageBaseUrl1
  transform(value:any): any {
    return this.imageBaseUrl1 + encodeURIComponent(value);
  }

}
