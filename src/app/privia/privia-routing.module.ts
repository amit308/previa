import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppoinmentsComponent } from "./appoinments/appoinments.component";
import { BranchComponent } from "./branch/branch.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DepartmentsComponent } from "./departments/departments.component";
import { PatientsComponent } from "./patients/patients.component";
import { PaymentsComponent } from "./payments/payments.component";
import { TestMasterComponent } from "./test-master/test-master.component";
import { TestResultMasterComponent } from "./test-result-master/test-result-master.component";
import { SchemeMasterComponent } from "./scheme-master/scheme-master.component";
import { PriceDetailsComponent } from "./price-details/price-details.component";
import { TestResultComponent } from "./test-result/test-result.component";
import { PehlebotomyComponent } from "./pehlebotomy/pehlebotomy.component";
import { SampleRecieptDetailsComponent } from "./sample-reciept-details/sample-reciept-details.component";
import { DepartmentMasterComponent } from "./department-master/department-master.component";
import { TestMasterListComponent } from "./test-master-list/test-master-list.component";
import { ReportsUploadComponent } from "./reports-upload/reports-upload.component";
import { TechnicianAssignComponent } from "../admin/technician-assign/technician-assign.component";
import { ChangePasswordComponent } from "../user-details/change-password/change-password.component";
import { PatientsPendingTestComponent } from "./patients-pending-test/patients-pending-test.component";
import { TestMasterListB2bComponent } from "./test-master-list-b2b/test-master-list-b2b.component";
const routes: Routes = [
  {
    path: "",
    children: [
      // {path:'',redirectTo:'/dashboard',pathMatch:'full'},
      { path: "dashboard", component: DashboardComponent },
      { path: "appoinments", component: AppoinmentsComponent },
      { path: "departments", component: DepartmentsComponent },
      { path: "patients", component: PatientsComponent },
      { path: "payments", component: PaymentsComponent },
      { path: "branch", component: BranchComponent },
      // {path:'company', component:CompanyComponent},
      { path: "testMaster", component: TestMasterComponent },
      { path: "testMasterList", component: TestMasterListComponent },
      { path: "testresultMaster", component: TestResultMasterComponent },
      { path: "schemeMaster", component: SchemeMasterComponent },
      { path: "price", component: PriceDetailsComponent },
      { path: "test-result", component: TestResultComponent },
      { path: "pehle-botomy", component: PehlebotomyComponent },
      { path: "reciept", component: SampleRecieptDetailsComponent },
      { path: "depart-master", component: DepartmentMasterComponent },
      { path: "documents-upload", component: ReportsUploadComponent },
      { path: "technicianAssign", component: TechnicianAssignComponent },
      { path: "Changepassword", component: ChangePasswordComponent },
      {
        path: "patients-pending-test",
        component: PatientsPendingTestComponent,
      },
      { path: "test-master-list-b2b", component: TestMasterListB2bComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriviaRoutingModule {}
