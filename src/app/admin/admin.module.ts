import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { LabComponent } from './lab/lab.component';
import { LabInchargeComponent } from './lab-incharge/lab-incharge.component';
import { ManagementComponent } from './management/management.component';
import { ManagerComponent } from './manager/manager.component';
import { LabTechnicianComponent } from './lab-technician/lab-technician.component';
import { AddLabEmployeesComponent } from './dailog-componrnts/add-lab-employees/add-lab-employees.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LocationComponent } from './location/location.component';
import { AddSubdivisionComponent } from './dailog-componrnts/add-subdivision/add-subdivision.component';
import { BranchComponent } from './branch/branch.component';
import { PatientComponent } from './patient/patient.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { DoctorMasterComponent } from './doctor-master/doctor-master.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';
import { DoctorListComponent } from './doctor-master/doctor-list/doctor-list.component';
import { QuestionComponent } from './question/question.component';
import { AddOrganizationAdminComponent } from './dailog-componrnts/add-organization-admin/add-organization-admin.component';

import { AddFrontOfficeComponent } from './dailog-componrnts/add-front-office/add-front-office.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { NgxPrinterModule } from 'ngx-printer';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CollectionComponent } from './collection/collection.component';
import { TestPackagesComponent } from './test-packages/test-packages.component';
import { AddTestPackagesComponent } from './dailog-componrnts/add-test-packages/add-test-packages.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IgxTimePickerModule } from "igniteui-angular";
import { NgSelectModule } from '@ng-select/ng-select';
import { TechnicianComponent } from './technician/technician.component';
import { TechnicianListComponent } from './technician-list/technician-list.component';
import { TechnicianAssignComponent } from './technician-assign/technician-assign.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TechnicianPendingCompletedComponent } from './technician-pending-completed/technician-pending-completed.component';

import { RiderListComponent } from './rider-list/rider-list.component';
import { AddRiderComponent } from './add-rider/add-rider.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MainPipeModule } from '../shared/pipes/main-pipe.module';
import { RiderAssignComponent } from './rider-assign/rider-assign.component';
import { BatchCountsComponent } from './batch-counts/batch-counts.component';

import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VaccineComponent } from './vaccine/vaccine.component';
import { FtpUploadComponent } from './ftp-upload/ftp-upload.component';
import { ReferralPatientsComponent } from './referral-patients/referral-patients.component';
import { OrganizationAdminComponent } from './organization-admin/organization-admin.component';
import { FtpUploadViewFilesComponent } from './ftp-upload-view-files/ftp-upload-view-files.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { PromotionPageComponent } from './promotion-page/promotion-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { OrganizationApiComponent } from './organization-api/organization-api.component';
import { InvalidBulkUploadComponent } from './invalid-bulk-upload/invalid-bulk-upload.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LabassignComponent } from './labassign/labassign.component';
import { FinancemanagerComponent } from './financemanager/financemanager.component';
import { AddfinancemanagerComponent } from './addfinancemanager/addfinancemanager.component';
import { PendingQuoteComponent } from './pending-quote/pending-quote.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RecivedQuoteComponent } from './recived-quote/recived-quote.component';
import { AcceptedQuoteComponent } from './accepted-quote/accepted-quote.component';
import { RajectedQuoteComponent } from './rajected-quote/rajected-quote.component';
import { SubmitQuoteComponent } from './submit-quote/submit-quote.component';
// import {MatDialogModule} from '@angular/material/dialog';
// import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    FrontOfficeComponent,
    // ExampleDialogComponent, //DialogOverviewExampleDialog
    // MatDialogModule, 
    LabComponent,
    LabInchargeComponent,
    ManagementComponent,
    ManagerComponent,
    LabTechnicianComponent,
    AddLabEmployeesComponent,
    HospitalComponent,
    LocationComponent,
    AddSubdivisionComponent,
    BranchComponent,
    PatientComponent,
    LaboratoryComponent,
    DoctorMasterComponent,
    DoctorsComponent,
    DoctorListComponent,
    QuestionComponent,
    AddFrontOfficeComponent,
    AddOrganizationAdminComponent,
    AddQuestionComponent,
    CollectionComponent,
    TestPackagesComponent,
    AddTestPackagesComponent,
    TechnicianComponent,
    TechnicianListComponent,
    TechnicianAssignComponent,
    TechnicianPendingCompletedComponent,
    RiderListComponent,
    AddRiderComponent,
    RiderAssignComponent,
    BatchCountsComponent,
    VaccineComponent,
    FtpUploadComponent,
    ReferralPatientsComponent,
    OrganizationAdminComponent,
    FtpUploadViewFilesComponent,
    HeaderFooterComponent,
    PromotionPageComponent,
    OrganizationApiComponent,
    InvalidBulkUploadComponent,
    LabassignComponent,
    FinancemanagerComponent,
    AddfinancemanagerComponent,
    PendingQuoteComponent,
    RecivedQuoteComponent,
    AcceptedQuoteComponent,
    RajectedQuoteComponent,
    SubmitQuoteComponent,
    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MainPipeModule,
    MaterialModule, 
    NgxBarcodeModule,
    QRCodeModule,
    MatAutocompleteModule,
    NgxPrintModule,
    ReactiveFormsModule, FormsModule,
    NgxPrinterModule.forRoot({ printOpenWindow: true }),
    NgxQRCodeModule,
    CKEditorModule,
    IgxTimePickerModule,
    NgSelectModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTooltipModule,
    // MatDialogModule,
    NgxJsonViewerModule,
    NgxDaterangepickerMd.forRoot(),

  
    // UiSwitchModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB1cQD0o4gFg20ct4o7Tfd1qMGnrrHzyh0'
    // })

    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ['places']
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  entryComponents: [
    AddLabEmployeesComponent,
    DoctorMasterComponent,
    AddQuestionComponent,
    AddTestPackagesComponent,
    // DialogOverviewExampleDialog
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
