import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'technicianSlotsCounts'
})
export class TechnicianSlotsCountsPipe implements PipeTransform {

  transform(value: any): any {

     console.log({value})
    let pending = 0
    let completed = 0

    value.forEach(technician => {

      if (technician?.status == "AssignedToTechnician") {
        pending += 1
      }
      if (technician?.status == "CollectedByTechnician") {
        completed += 1
      }
    })
    console.log({pending,completed})
    return `(P-${pending}, C-${completed})`;
  }

}
