import { PageEvent } from "@angular/material/paginator";

export class PaginationUtility {
    static getGridFilters(isDefault: boolean, pageEvent:PageEvent) {        
        if(isDefault){
            return {
             "start": 0,
             "limit": 10,
            }
        }else{
         return {
             start:(pageEvent.pageIndex * pageEvent.pageSize),
             limit:pageEvent.pageSize
         };
        }       
     }
}
