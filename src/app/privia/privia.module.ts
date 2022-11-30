import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriviaRoutingModule } from './privia-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppoinmentsComponent } from './appoinments/appoinments.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PatientsComponent } from './patients/patients.component';
import { MaterialModule } from '../material/material.module';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentsComponent } from './payments/add-payments/add-payments.component';
import { BranchComponent } from './branch/branch.component';
import { TestMasterComponent } from './test-master/test-master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TestResultMasterComponent } from './test-result-master/test-result-master.component';
import { SchemeMasterComponent } from './scheme-master/scheme-master.component';
import { PriceDetailsComponent } from './price-details/price-details.component';
import { TestResultComponent } from './test-result/test-result.component';
import { PehlebotomyComponent } from './pehlebotomy/pehlebotomy.component';
import { SampleRecieptDetailsComponent } from './sample-reciept-details/sample-reciept-details.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { AddTestResultComponent } from './test-result/add-test-result/add-test-result.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TestMasterListComponent } from './test-master-list/test-master-list.component';
import { ReportsUploadComponent } from './reports-upload/reports-upload.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChangePasswordComponent } from '../user-details/change-password/change-password.component';
import { TestsStatusPipe } from '../shared/pipes/tests-status.pipe';
import { MainPipeModule } from '../shared/pipes/main-pipe.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { PatientsPendingTestComponent } from './patients-pending-test/patients-pending-test.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { QuillModule } from 'ngx-quill';
import { MatMenuModule } from '@angular/material/menu';
import { ClipboardModule } from 'ngx-clipboard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SearchdataPipe } from './searchdata.pipe';
import { SearchorgPipe } from './searchorg.pipe';
import { TestMasterListB2bComponent } from './test-master-list-b2b/test-master-list-b2b.component';
import { AddTestMasterListB2bComponent } from './test-master-list-b2b/add-test-master-list-b2b/add-test-master-list-b2b.component';

@NgModule({
  declarations: [
    SearchdataPipe,
    SearchorgPipe,
    DashboardComponent,
    AppoinmentsComponent,
    DepartmentsComponent,
    PatientsComponent,
    AddDoctorComponent,
    EditAppointmentComponent,
    AddAppointmentComponent,
    AddDepartmentComponent,
    AddPatientComponent,
    PaymentsComponent,
    AddPaymentsComponent,
    BranchComponent,
    SchemeMasterComponent,
    TestResultMasterComponent,
    PriceDetailsComponent,
    PehlebotomyComponent,
    SampleRecieptDetailsComponent,
    DepartmentMasterComponent,
    TestMasterComponent,
    TestResultComponent,
    AddTestResultComponent,
    TestMasterListComponent,
    ReportsUploadComponent,
    PatientsPendingTestComponent,
    TestMasterListB2bComponent,
    AddTestMasterListB2bComponent
    
  ],
  imports: [
    
    CommonModule,
    PriviaRoutingModule,
    MainPipeModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule,
    NgbModalModule,
    NgxDocViewerModule,
    NgxDaterangepickerMd.forRoot(),
    // CKEditorModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMaterialTimepickerModule,
    ClipboardModule,
    MatDialogModule,
    AngularEditorModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ['places'],
    }),
    QuillModule.forRoot(),
    NgxJsonViewerModule,
    CKEditorModule
  ],
 
  entryComponents: [
   
    AddDoctorComponent,
    EditAppointmentComponent,
    AddDepartmentComponent,
    AddPatientComponent,
    AddPaymentsComponent,
    AddTestResultComponent,
    TestResultComponent,
    ChangePasswordComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports:[
    SearchdataPipe,
    SearchorgPipe
    ]
})
export class PriviaModule {}
