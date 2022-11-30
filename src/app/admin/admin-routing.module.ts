import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { TestResultComponent } from '../privia/test-result/test-result.component';
import { BranchComponent } from "./branch/branch.component";
import { AddSubdivisionComponent } from "./dailog-componrnts/add-subdivision/add-subdivision.component";
import { DoctorListComponent } from "./doctor-master/doctor-list/doctor-list.component";
import { DoctorMasterComponent } from "./doctor-master/doctor-master.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { FrontOfficeComponent } from "./front-office/front-office.component";
import { HospitalComponent } from "./hospital/hospital.component";
import { LabInchargeComponent } from "./lab-incharge/lab-incharge.component";
import { LabTechnicianComponent } from "./lab-technician/lab-technician.component";
import { LabComponent } from "./lab/lab.component";
import { LaboratoryComponent } from "./laboratory/laboratory.component";
import { LocationComponent } from "./location/location.component";
import { ManagementComponent } from "./management/management.component";
import { ManagerComponent } from "./manager/manager.component";
import { PatientComponent } from "./patient/patient.component";
import { QuestionComponent } from "./question/question.component";
import { CollectionComponent } from "./collection/collection.component";
import { TestPackagesComponent } from "./test-packages/test-packages.component";
import { RoleGuardGuard } from "../shared/role-guard.guard";
import { TestResultComponent } from "../privia/test-result/test-result.component";
import { TestMasterComponent } from "../privia/test-master/test-master.component";
import { TestMasterListComponent } from "../privia/test-master-list/test-master-list.component";
import { TestResultMasterComponent } from "../privia/test-result-master/test-result-master.component";
import { PatientsComponent } from "../privia/patients/patients.component";
import { TechnicianComponent } from "./technician/technician.component";
import { TechnicianListComponent } from "./technician-list/technician-list.component";
import { TechnicianPendingCompletedComponent } from "./technician-pending-completed/technician-pending-completed.component";
import { RiderListComponent } from "./rider-list/rider-list.component";
import { AddRiderComponent } from "./add-rider/add-rider.component";
import { RiderAssignComponent } from "./rider-assign/rider-assign.component";
import { BatchCountsComponent } from "./batch-counts/batch-counts.component";
import { VaccineComponent } from "./vaccine/vaccine.component";
import { FtpUploadComponent } from "./ftp-upload/ftp-upload.component";
import { ReferralPatientsComponent } from "./referral-patients/referral-patients.component";
import { OrganizationAdminComponent } from "./organization-admin/organization-admin.component";
import { FtpUploadViewFilesComponent } from "./ftp-upload-view-files/ftp-upload-view-files.component";
import { PromotionPageComponent } from "./promotion-page/promotion-page.component";
import { HeaderFooterComponent } from "./header-footer/header-footer.component";
import { OrganizationApiComponent } from "./organization-api/organization-api.component";
import { InvalidBulkUploadComponent } from "./invalid-bulk-upload/invalid-bulk-upload.component";
import { UserRolesGuard } from "../shared/authGurds/user-roles.guard";
import { LabassignComponent } from "./labassign/labassign.component";
import { FinancemanagerComponent } from "./financemanager/financemanager.component";
import { AddfinancemanagerComponent } from "./addfinancemanager/addfinancemanager.component";
import { TestMasterListB2bComponent } from "../privia/test-master-list-b2b/test-master-list-b2b.component";
import { PendingQuoteComponent } from "./pending-quote/pending-quote.component";
// import { reciveed } from "./recived-quote/recived-quote.component";
import { RecivedQuoteComponent } from "./recived-quote/recived-quote.component";
import { AcceptedQuoteComponent } from "./accepted-quote/accepted-quote.component";
import { RajectedQuoteComponent } from "./rajected-quote/rajected-quote.component";
import { SubmitQuoteComponent } from "./submit-quote/submit-quote.component";




// import { ListComponent } from '../inventory/list/list.component';
// import { AddComponent } from '../inventory/add/add.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "hospital",
        component: HospitalComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Hospital",
          urls: [
            {
              title: "Hospital",
              url: "/hospital",
            },
            { title: "Hospital " },
          ],
          permission: {
            only: ["HOSPITAL_VIEW"],
          },
        },
      },

      {
        path: "add-subdivision",
        component: AddSubdivisionComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Subdivision",
          urls: [
            {
              title: "Subdivision",
              url: "/add-subdivision",
            },
            { title: "Subdivision " },
          ],
          permission: {
            only: [
              "HOSPITAL_VIEW",
              "LOCATION_VIEW",
              "BRANCH_VIEW",
              "LABORATORY_VIEW",
              "DOCTORS_VIEW",
            ],
          },
        },
      },
      {
        path: "location",
        component: LocationComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "location",
          urls: [
            {
              title: "location",
              url: "/location",
            },
            { title: "location " },
          ],
          permission: {
            only: ["LOCATION_VIEW"],
          },
        },
      },
      {
        path: "frontOffice",
        component: FrontOfficeComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "frontOffice",
          urls: [
            {
              title: "frontOffice",
              url: "/frontOffice",
            },
            { title: "frontOffice" },
          ],
          permission: {
            only: ["FRONT_OFFICE_VIEW"],
          },
        },
      },
      {
        path: "lab",
        component: LabComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Lab",
          urls: [
            {
              title: "Lab",
              url: "/lab",
            },
            { title: "Lab" },
          ],
          permission: {
            only: ["LAB_USER_VIEW"],
          },
        },
      },
      {
        path: "labIncharge",
        component: LabInchargeComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "lab In-Charge",
          urls: [
            {
              title: "lab In-Charge",
              url: "/labIncharge",
            },
            { title: "lab In-Charge" },
          ],
          permission: {
            only: ["LAB_INCHARGE_VIEW"],
          },
        },
      },
      {
        path: "labTechnician",
        component: LabTechnicianComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "labTechnician",
          urls: [
            {
              title: "labTechnician",
              url: "/labTechnician",
            },
            { title: "labTechnician" },
          ],
          permission: {
            only: ["LAB_INCHARGE_VIEW"],
          },
        },
      },
      {
        path: "management",
        component: ManagementComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "management",
          urls: [
            {
              title: "management",
              url: "/management",
            },
            { title: "management" },
          ],
          permission: {
            only: ["MANAGEMENT_VIEW"],
          },
        },
      },
      {
        path: "manager",
        component: ManagerComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "manager",
          urls: [
            {
              title: "manager",
              url: "/manager",
            },
            { title: "manager" },
          ],
          permission: {
            only: ["MANAGER_VIEW"],
          },
        },
      },
      {
        path: "branch",
        component: BranchComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "branch",
          urls: [
            {
              title: "branch",
              url: "/branch",
            },
            { title: "branch" },
          ],
          permission: {
            only: ["BRANCH_VIEW"],
          },
        },
      },
      {
        path: "doctor-master",
        component: DoctorMasterComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "doctor-master",
          urls: [
            {
              title: "doctor-master",
              url: "/doctor-master",
            },
            { title: "doctor-master" },
          ],
          permission: {
            only: ["DOCTORS_VIEW"],
          },
        },
      },
      {
        path: "doctors",
        component: DoctorListComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "doctors",
          urls: [
            {
              title: "doctors",
              url: "/doctors",
            },
            { title: "doctors" },
          ],
          permission: {
            only: ["DOCTORS_VIEW"],
          },
        },
      },
      {
        path: "doctor",
        component: DoctorsComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "doctor",
          urls: [
            {
              title: "doctor",
              url: "/doctor",
            },
            { title: "doctor" },
          ],
          permission: {
            only: ["DOCTORS_VIEW"],
          },
        },
      },
      {
        path: "patient",
        component: PatientComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Patient",
          urls: [
            {
              title: "Patient",
              url: "/patient",
            },
            { title: "Patient" },
          ],
          permission: {
            only: ["PATIENT_VIEW", "PATIENT_ADD"],
          },
        },
      },
      {
        path: "patientList",
        component: PatientsComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "PatientList",
          urls: [
            {
              title: "PatientList",
              url: "/patientList",
            },
            { title: "PatientList" },
          ],
          permission: {
            only: ["PATIENT_VIEW", "PATIENT_ADD"],
          },
        },
      },
      {
        path: "laboratory",
        component: LaboratoryComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Laboratory",
          urls: [
            {
              title: "Laboratory",
              url: "/laboratory",
            },
            { title: "Laboratory" },
          ],
          permission: {
            only: ["LABORATORY_VIEW"],
          },
        },
      },
      {
        path: "question",
        component: QuestionComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "QUESTIONNAIRE",
          urls: [
            {
              title: "QUESTIONNAIRE",
              url: "/question",
            },
            { title: "QUESTIONNAIRE" },
          ],
          permission: {
            only: ["QUESTIONNAIRE"],
          },
        },
      },
      {
        path: "test-result",
        component: TestResultComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Test-Result",
          urls: [
            {
              title: "Test-Result",
              url: "/test-result",
            },
            { title: "Test-Result" },
          ],
          permission: {
            only: ["TEST_RESULT_VIEW"],
          },
        },
      },
      {
        path: "testMaster",
        component: TestMasterComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "TestMaster",
          urls: [
            {
              title: "TestMaster",
              url: "/testMaster",
            },
            { title: "TestMaster" },
          ],
          permission: {
            only: ["TEST_MASTER_VIEW"],
          },
        },
      },
      {
        path: "testMasterList",
        component: TestMasterListComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "TestMasterList",
          urls: [
            {
              title: "TestMasterList",
              url: "/testMasterList",
            },
            { title: "TestMasterList" },
          ],
          permission: {
            only: ["TEST_MASTER_VIEW"],
          },
        },
      },
      {
        path: "testResultMaster",
        component: TestResultMasterComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "TestResultMaster",
          urls: [
            {
              title: "TestResultMaster",
              url: "/testResultMaster",
            },
            { title: "TestResultMaster" },
          ],
          permission: {
            only: ["TEST_RESULT_MASTER_ADD"],
          },
        },
      },
      {
        path: "test-master-list-b2b",
        component: TestMasterListB2bComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "test-master-list-b2b",
          urls: [
            {
              title: "test-master-list-b2b",
              url: "/test-master-list-b2b",
            },
            { title: "test-master-list-b2b" },
          ],
          permission: {
            only: ["TEST_MASTER_VIEW"],
          },
        },
      },
      {
        path: "collection",
        component: CollectionComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Collection",
          urls: [
            {
              title: "Collection",
              url: "/collection",
            },
            { title: "Collection" },
          ],
          permission: {
            only: ["COLLECTION_VIEW"],
          },
        },
      },

      {
        path: "testPackages",
        component: TestPackagesComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "TestPackages",
          urls: [
            {
              title: "TestPackages",
              url: "/testPackages",
            },
            { title: "TestPackages" },
          ],
          permission: {
            only: ["TEST_PACKAGES_VIEW"],
          },
        },
      },
      {
        path: "technician",
        component: TechnicianComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "DD-Technician",
          urls: [
            {
              title: "DD-Technician",
              url: "/technician",
            },
            { title: "DD-Technician" },
          ],
          permission: {
            only: ["DD_TECHNICIAN_VIEW"],
          },
        },
      },
      // try again
      {
        path: "pending",
        component: PendingQuoteComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "pending-quote",
          urls: [
            {
              title: "pending-quote",
              url: "/pending-quote",
            },
            { title: "pending-quot" },
          ],
          permission: {
            only: ["PENDING-QUOTE"],
          },
        },
      },
      // 
      {
        path: "technicianList",
        component: TechnicianListComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "DD-TechnicianList",
          urls: [
            {
              title: "DD-TechnicianList",
              url: "/technicianList",
            },
            { title: "DD-TechnicianList" },
          ],
          permission: {
            only: ["DD_TECHNICIAN_VIEW"],
          },
        },
      },
      {
        path: "technicianPending",
        component: TechnicianPendingCompletedComponent,
        // canActivate: [RoleGuardGuard], data: { adminRole: 'admin', orgRole: 'org-admin', foRole: 'front-office' }
      },
      {
        path: "labassign",
        component: LabassignComponent,
        // canActivate: [RoleGuardGuard], data: { adminRole: 'admin', orgRole: 'org-admin', foRole: 'front-office' }
      },
      {
        path: "financemanager",
        component: FinancemanagerComponent,
        // canActivate: [RoleGuardGuard], data: { adminRole: 'admin', orgRole: 'org-admin', foRole: 'front-office' }
      },
      {
        path: "addfinancemanager",
        component: AddfinancemanagerComponent,
        // canActivate: [RoleGuardGuard], data: { adminRole: 'admin', orgRole: 'org-admin', foRole: 'front-office' }
      },

      {
        path: "rider-list",
        component: RiderListComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Rider List",
          urls: [
            {
              title: "Rider List",
              url: "/rider-list",
            },
            { title: "Rider List" },
          ],
          permission: {
            only: ["RIDER_VIEW"],
          },
        },
      },
      {
        path: "add-rider",
        component: AddRiderComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Add Rider",
          urls: [
            {
              title: "Add Rider",
              url: "/add-rider",
            },
            { title: "Add Rider" },
          ],
          permission: {
            only: ["RIDER_VIEW"],
          },
        },
      },
      {
        path: "rider-assign",
        component: RiderAssignComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Add Rider",
          urls: [
            {
              title: "Add Rider",
              url: "/rider-assign",
            },
            { title: "Add Rider" },
          ],
          permission: {
            only: ["RIDER_ASSIGN"],
          },
        },
      },
      {
        path: "batch-counts",
        component: BatchCountsComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Batch Counts",
          urls: [
            {
              title: "Batch Counts",
              url: "/batch-counts",
            },
            { title: "Batch Counts" },
          ],
          permission: {
            only: ["BATCH_COUNTS_VIEW"],
          },
        },
      },
      {
        path: "vaccine",
        component: VaccineComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Vaccine",
          urls: [
            {
              title: "Vaccine",
              url: "/vaccine",
            },
            { title: "Vaccine" },
          ],
          permission: {
            only: ["VACCINATION_VIEW"],
          },
        },
      },
      {
        path: "ftp-upload",
        component: FtpUploadComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "FTP Upload",
          urls: [
            {
              title: "FTP Upload",
              url: "/ftp-upload",
            },
            { title: "FTP Upload" },
          ],
          permission: {
            only: ["FTP_VIEW"],
          },
        },
      },
// {
      // pending quote
    //   path: "pending-quote",
    //   component: PendingQuoteComponent,
    //   canActivate: [UserRolesGuard],
    //   data: {
    //     title: "PENDING QUOTE",
    //     urls: [
    //       {
    //         title: "FTP Upload",
    //         url: "/pending-quote",
    //       },
    //       { title: "PENDING QUOTE" },
    //     ],
    //     permission: {
    //       only: ["QUOTE"],
    //     },
    //   },
    // },

      // 
      {
        path: "referral-patients",
        component: ReferralPatientsComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Referral Patients",
          urls: [
            {
              title: "Referral Patients",
              url: "/referral-patients",
            },
            { title: "Referral Patients" },
          ],
          permission: {
            only: ["REFERRAL_PATIENTS_VIEW"],
          },
        },
      },
      {
        path: "organization-admin",
        component: OrganizationAdminComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Organization Admin",
          urls: [
            {
              title: "Organization Admin",
              url: "/organization-admin",
            },
            { title: "Organization Admin" },
          ],
          permission: {
            only: ["ORGANIZATION_ADMIN_VIEW"],
          },
        },
      },
      {
        path: "ftp-upload-view-files",
        component: FtpUploadViewFilesComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "ftp-upload-view-files",
          urls: [
            {
              title: "ftp-upload-view-files",
              url: "/ftp-upload-view-files",
            },
            { title: "ftp-upload-view-files" },
          ],
          permission: {
            only: ["FTP_VIEW"],
          },
        },
      },
      {
        path: "promotion-page",
        component: PromotionPageComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Promotion",
          urls: [
            {
              title: "Promotion",
              url: "/promotion-page",
            },
            { title: "Promotion" },
          ],
          permission: {
            only: ["PROMOTION_VIEW"],
          },
        },
      },
      {
        path: "header-footer",
        component: HeaderFooterComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Promotion Header Footer",
          urls: [
            {
              title: "Promotion Header Footer",
              url: "/header-footer",
            },
            { title: "Promotion Header Footer" },
          ],
          permission: {
            only: ["PROMOTION_HEADER_FOOTER_VIEW"],
          },
        },
      },
      // dropdowns
      {
        path: "pending-quote",
        component: PendingQuoteComponent,
        canActivate: [UserRolesGuard],
        data: {
          title: "Pending Quote",
          urls: [
            {
              title: "Pending Quote",
              url: "/pending-quote",
            },
            { title: "Pending Quote" },
          ],
          permission: {
            only: ["PROMOTION_HEADER_FOOTER_VIEW"],
          },
        },
      },
      // 
      {
        path: "recived-quote",
        component:RecivedQuoteComponent ,
        canActivate: [UserRolesGuard],
        data: {
          title: "recived Quote",
          urls: [
            {
              title: "recived Quote",
              url: "/recived-quote",
            },
            { title: "recived Quote" },
          ],
          permission: {
            only: ["PROMOTION_HEADER_FOOTER_VIEW"],
          },
        },
      },
      //
      { 
      
      path: "Submit-quote",
      component: SubmitQuoteComponent ,
      canActivate: [UserRolesGuard],
      data: {
        title: "Submit Quote",
        urls: [
          {
            title: "Submit Quote",
            url: "/Submit-quote",
          },
          { title: "Submit Quote" },
        ],
        permission: {
          only: ["PROMOTION_HEADER_FOOTER_VIEW"],
        },
      },
    },
      // 
      {
        path: "Accepted-quote",
        component:AcceptedQuoteComponent ,
        canActivate: [UserRolesGuard],
        data: {
          title: "Accepted Quote",
          urls: [
            {
              title: "Accepted Quote",
              url: "/Accepted-quote",
            },
            { title: "Accepted Quote" },
          ],
          permission: {
            only: ["PROMOTION_HEADER_FOOTER_VIEW"],
          },
        },
      },
      // 

      {
        path: "Rajected-quote",
        component:RajectedQuoteComponent ,
        canActivate: [UserRolesGuard],
        data: {
          title: "Rajected Quote",
          urls: [
            {
              title: "Rajected Quote",
              url: "/Rajected-quote",
            },
            { title: "Rajected Quote" },
          ],
          permission: {
            only: ["PROMOTION_HEADER_FOOTER_VIEW"],
          },
        },
      },

      // 
      {
        path: "organization-api",
        component: OrganizationApiComponent,
        // canActivate: [RoleGuardGuard], data: { adminRole: 'admin', orgRole: 'org-admin', foRole: 'front-office' }
      },
      {
        path: "invalid-bulk-upload",
        component: InvalidBulkUploadComponent,
        // canActivate: [RoleGuardGuard], data: { adminRole: 'admin', orgRole: 'org-admin', foRole: 'front-office' }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
