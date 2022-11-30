import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsStatusPipe } from './tests-status.pipe';
import { TechnicianSlotsCountsPipe } from './technician-slots-counts.pipe';
import { PatientPreviousTestsPipe } from './patient-previous-tests.pipe';
import { RiderSlotsCountsPipe } from './rider-slots-counts.pipe';
import { TextEncodePipe } from './text-encode.pipe';
import { AuthoritiesPipe } from './authorities.pipe';



@NgModule({
  declarations: [TestsStatusPipe, TechnicianSlotsCountsPipe, PatientPreviousTestsPipe, RiderSlotsCountsPipe, TextEncodePipe, AuthoritiesPipe],
  imports: [
    CommonModule
  ],
  exports:[TestsStatusPipe,TechnicianSlotsCountsPipe,PatientPreviousTestsPipe,RiderSlotsCountsPipe,TextEncodePipe,AuthoritiesPipe]
})
export class MainPipeModule { }
