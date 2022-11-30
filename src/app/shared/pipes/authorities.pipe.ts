import { Pipe, PipeTransform } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Pipe({
  name: 'authorities'
})
export class AuthoritiesPipe implements PipeTransform {
  
  transform(value: any): any {
    console.log({value});
    
    const token = localStorage.getItem('user_token')
    const data:any = jwt_decode(token)
     return data?.authorities ? data.authorities.includes(value)  ? true :false: false
  }

}
