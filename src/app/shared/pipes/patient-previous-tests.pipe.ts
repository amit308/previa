import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patientPreviousTests'
})
export class PatientPreviousTestsPipe implements PipeTransform {

  transform(value: any[]): any[] {
    const tests = value
    const prepareTests = []

    if (tests && tests?.length > 0) {
      tests.forEach(test => {
        if (test.isTestPackage == true) {
          const tempPackage = prepareTests.filter(pt => pt?.package?._id == test?.package?._id)?.[0]
          if (tempPackage) {
            prepareTests.forEach((prepareTest, index) => {
              if (prepareTest?.package?._id == tempPackage?.package?._id) {
                prepareTests[index].packageTests.push({ testName: test?.test?.name, sid: test?.sid, status: test?.status, value: test?.value, comment: test?.comment, technicianComments: test?.technicianComments , sampleDate:test?.sampleDate,sampleTime:test?.sampleTime })
              }
            })

          } else {
            test['packageTests'] = [{ testName: test?.test?.name, sid: test?.sid, value: test?.value, status: test?.status, comment: test?.comment, technicianComments: test?.technicianComments ,sampleDate:test?.sampleDate,sampleTime:test?.sampleTime}]
            prepareTests.push(test)
          }

        } else {
          test['packageTests'] = []
          prepareTests.push(test)
        }
      })
    }
    return prepareTests;
  }

}
