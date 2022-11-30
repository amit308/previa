import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testsStatus'
})
export class TestsStatusPipe implements PipeTransform {

  transform(value: any): any {
    let pendingCount = 0
    let completedCount = 0
    value.forEach(test => {
      if (test.status == "pending" || test.status == "collected" || test.status == 'rider_assigned' || test.status == "rider_collected" || test.status == "received" ) {
        pendingCount += 1
      }
      if (test.status == "completed" || test.status == "authorized" || test.status == "printed" || test.status == "dispatched") {
        completedCount += 1
      }
    })
    return pendingCount > 0 ? 'pending' : completedCount > 0 ? 'completed' : 'no tests'
  }

}
