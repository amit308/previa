import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'riderSlotsCounts'
})
export class RiderSlotsCountsPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  
  transform(value: any): any {

   let pending = 0
   let completed = 0

   value.forEach(rider => {
    
     if (rider?.status == "SampleAssignedToRider") {
       pending += 1
     }
     if (rider?.status == "CollectedByRider") {
       pending += 1
     }
     if (rider?.status == "DeliveredByRider") {
       completed += 1
     }
   })
   console.log({pending,completed})
   return `(P-${pending}, C-${completed})`;
 }

}

