import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  urls = [];
  labs = [];
  tests = [];
  patients = [];
  rider = [];
  technician = [];
  admin = [];
  panelOpenState = false;
  classes: any;
  userToken:any;
  userDetails:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user_details'));
    this.userDetails = user;
    const token = localStorage.getItem('user_token')
    this.userToken = jwt_decode(token)
  
    if (user?.role === 'super-admin') {
      this.urls.push(
        { name: 'super-admin/company', value: 'company', icon: 'fa fa-list' },
        { name: 'super-admin/admin', value: 'Admin', icon: 'fa fa-list' },
        { name: 'roles-menus/roles', value: 'Roles', icon: 'fa fa-asterisk' },
        { name: 'roles-menus/menus', value: 'Menus', icon: 'fa fa-asterisk' },
      );
    } else if (user?.role === 'labl') {
      this.urls.push(
        { name: 'privia/dashboard', value: 'Dasboard', icon: 'fa fa-th-large' },
        {
          name: 'privia/appoinments',
          value: 'Appoinments',
          icon: 'fa fa-th-list',
        },
        {
          name: 'privia/departments',
          value: 'Departments',
          icon: 'fa fa-list',
        },
        { name: 'privia/patients', value: 'Patients', icon: 'fa fa-male' },
        {
          name: 'privia/payments',
          value: 'Payments',
          icon: 'fa fa-cc-mastercard',
        },
        { name: 'privia/branch', value: 'branch', icon: 'fa fa-bandcamp' },
        // {name:"privia/testMaster",value:"test Master",icon:"fa fa-list"},
        // {name:"privia/testresultMaster",value:"test result master",icon:"fa fa-list"},
        {
          name: 'privia/schemeMaster',
          value: 'scheme Master',
          icon: 'fa fa-superpowers',
        },
        { name: 'privia/price', value: 'price', icon: 'fa fa-money' },
        // {name:"privia/test-result",value:"Test Result",icon:"fa fa-list"},
        {
          name: 'privia/pehle-botomy',
          value: 'Pehle Botomy',
          icon: 'fa fa-list',
        },
        {
          name: 'privia/reciept',
          value: 'Reciept',
          icon: 'fa fa-sticky-note-o',
        },
        { name: 'roles-menus/roles', value: 'Roles', icon: 'fa fa-asterisk' },
        { name: 'roles-menus/menus', value: 'Menus', icon: 'fa fa-asterisk' },
        // {name:"privia/depart-master",value:"Depart master",icon:"fa fa-list"},
      );
    } else if (user?.role === 'patient') {
      this.urls.push({
        name: 'patient/dashboard',
        value: 'Dashboard',
        icon: 'fa fa-th-large',
      });
    } else if (user?.role === 'doctor') {
      this.urls.push({
        name: 'admin/referral-patients',
        value: 'Referral patients',
        icon: 'fa fa-list',
      });
    } else if (user?.role === 'org-admin') {
      // if (user.subdivision != 'hospital') {
      this.labs.push(
        { name: 'admin/lab', value: 'Lab user', icon: 'fa fa-flask' },
        {
          name: 'admin/labIncharge',
          value: 'Lab Incharge',
          icon: 'fa fa-flask',
        },
        {
          name: 'admin/labTechnician',
          value: 'Lab Technician',
          icon: 'fa fa-flask',
        },
{
        name: 'admin/collection',
          value: 'Collection',
          icon: 'fa fa-asterisk'
}
      );
      
      // }
      this.patients.push(
        { name: 'admin/patient', value: 'Patient', icon: 'fa fa-male' },
        {
          name: 'admin/patientList',
          value: 'Patient List',
          icon: 'fa fa-male',
        },
        { name: 'admin/invalid-bulk-upload', value: 'Invalid Bulk Uploads', icon: 'fa fa-upload' },
        {
          name: 'privia/patients-pending-test',
          value: 'Patients Pending Tests',
          icon: 'fa fa-male',
        },
        { name: 'admin/question', value: 'Question', icon: 'fa fa-question' },
        { name: 'admin/promotion-page', value: 'Promotion Page', icon: 'fa fa-bullhorn' },
        { name: 'admin/header-footer', value: 'Header Footer', icon: 'fa fa-question' },
       
      ),
        this.tests.push(
          {
            name: 'admin/test-result',
            value: 'Test Result',
            icon: 'fa fa-asterisk',
          },
          {
            name: 'admin/testMaster',
            value: 'test Master',
            icon: 'fa fa-superpowers',
          },
          {
            name: 'admin/testMasterList',
            value: 'Test Master List',
            icon: 'fa fa-users',
          },
          {
            name: 'admin/testResultMaster',
            value: 'test result master',
            icon: 'fa fa-asterisk',
          },
          {
            name: 'admin/testPackages',
            value: 'Test Packages',
            icon: 'fa fa-asterisk',
          }
        );

      this.rider.push(
        {
          name: 'admin/rider-list',
          value: 'Rider List',
          icon: 'fa fa-asterisk',
        },
        {
          name: 'admin/rider-assign',
          value: 'Rider Assign',
          icon: 'fa fa-asterisk',
        }
      ),
        this.urls.push(
          {
            name: 'admin/management',
            value: 'Management',
            icon: 'fa fa-users',
          },
          {
            name: 'admin/batch-counts',
            value: 'Batch Tests Counts',
            icon: 'fa fa-list',
          },
          { name: 'admin/vaccine', value: 'Vaccine', icon: 'fa fa-asterisk' },
          {
            name: 'admin/ftp-upload',
            value: 'Ftp Upload',
            icon: 'fa fa-upload',
          },
          {
            name: 'admin/organization-api',
            value: 'API',
            icon: 'fa fa-upload',
          },
          {
            name: 'admin/referral-patients',
            value: 'Referral patients',
            icon: 'fa fa-list',
          },
          // {
          //   name: 'admin/collection',
          //   value: 'Collection',
          //   icon: 'fa fa-asterisk',
          // },
          {
            name: 'admin/technicianList',
            value: 'DD-Technician ',
            icon: 'fa fa-asterisk',
          },
          {
            name: 'admin/frontOffice',
            value: 'Front Office',
            icon: 'fa fa-briefcase',
          },

          { name: 'admin/doctors', value: 'Doctor', icon: 'fa fa-user-md' },
          { name: 'roles-menus/roles', value: 'Roles', icon: 'fa fa-asterisk' },
        { name: 'roles-menus/menus', value: 'Menus', icon: 'fa fa-asterisk' },
        );
    } else if (user?.role === 'admin') {
      this.labs.push(
        { name: 'admin/lab', value: 'Lab user', icon: 'fa fa-flask' },
        {
          name: 'admin/labIncharge',
          value: 'Lab Incharge',
          icon: 'fa fa-flask',
        },
        {
          name: 'admin/labTechnician',
          value: 'Lab Technician',
          icon: 'fa fa-flask',
        },

        {
          name: 'admin/collection',
          value: 'Collection',
          icon: 'fa fa-asterisk',
        }
      ),
        this.patients.push(
          { name: 'admin/patient', value: 'Patient', icon: 'fa fa-male' },
          {
            name: 'admin/patientList',
            value: 'Patient List',
            icon: 'fa fa-male',
          },
          { name: 'admin/invalid-bulk-upload', value: 'Invalid Bulk Uploads', icon: 'fa fa-upload' },
          {
            name: 'privia/patients-pending-test',
            value: 'Patients Pending Tests',
            icon: 'fa fa-male',
          },
          { name: 'admin/question', value: 'Question', icon: 'fa fa-question' },
          { name: 'admin/promotion-page', value: 'Promotion Page', icon: 'fa fa-bullhorn' },
    
          { name: 'admin/header-footer', value: 'Header Footer', icon: 'fa fa-question' }
         
        ),
        this.tests.push(
          {
            name: 'admin/test-result',
            value: 'Test Result',
            icon: 'fa fa-asterisk',
          },
          {
            name: 'admin/testMaster',
            value: 'test Master',
            icon: 'fa fa-superpowers',
          },
          {
            name: 'admin/testMasterList',
            value: 'Test Master List',
            icon: 'fa fa-users',
          },
          {
            name: 'admin/testResultMaster',
            value: 'test result master',
            icon: 'fa fa-asterisk',
          },
          {
            name: 'admin/testPackages',
            value: 'Test Packages',
            icon: 'fa fa-asterisk',
          }
        );
      // this.technician.push(
      //   {
      //     name: 'admin/technicianList',
      //     value: 'DD-Technician ',
      //     icon: 'fa fa-asterisk',
      //   },
      //   {
      //     name: 'privia/technicianAssign',
      //     value: 'DD-Technician Assign',
      //     icon: 'fa fa-asterisk',
      //   }
      // {name:"admin/technicianPending",value:"Technician-Pending/Completed ",icon:"fa fa-asterisk"},
      // ),
      this.rider.push(
        {
          name: 'admin/rider-list',
          value: 'Rider List',
          icon: 'fa fa-asterisk',
        },
        {
          name: 'admin/rider-assign',
          value: 'Rider Assign',
          icon: 'fa fa-asterisk',
        }
      ),
        // this.doctor.push(
        //   {name:"admin/doctors",value:"Doctor",icon:"fa fa-user-md"},
        //   {name:"admin/doctor-master",value:"Doctor-Master",icon:"fa fa-asterisk"},

        // ),

        this.urls.push(
          {
            name: 'admin/management',
            value: 'Management',
            icon: 'fa fa-users',
          },
          // {
          //   name: 'patient/dashboard',
          //   value: 'Dashboard',
          //   icon: 'fa fa-th-large',
          // },
          { name: 'admin/manager', value: 'Manager', icon: 'fa fa-id-badge' },
          {
            name: 'admin/batch-counts',
            value: 'Batch Tests Counts',
            icon: 'fa fa-list',
          },
          {
            name: 'admin/ftp-upload',
            value: 'Ftp Upload',
            icon: 'fa fa-upload',
          },
          {
            name: 'admin/referral-patients',
            value: 'Referral patients',
            icon: 'fa fa-list',
          },
          { name: 'admin/vaccine', value: 'Vaccine', icon: 'fa fa-asterisk' },
          {
            name: 'admin/technicianList',
            value: 'DD-Technician ',
            icon: 'fa fa-asterisk',
          },
          { name: 'roles-menus/roles', value: 'Roles', icon: 'fa fa-asterisk' },
        { name: 'roles-menus/menus', value: 'Menus', icon: 'fa fa-asterisk' },
        ),
        this.admin.push(
          {
            name: 'admin/hospital',
            value: 'Hospital',
            icon: 'fa fa-hospital-o',
          },
          {
            name: 'admin/location',
            value: 'Location',
            icon: 'fa fa-location-arrow',
          },
          { name: 'admin/branch', value: 'Branch', icon: 'fa fa-bandcamp' },
          {
            name: 'admin/frontOffice',
            value: 'Front Office',
            icon: 'fa fa-briefcase',
          },
          {
            name: 'admin/organization-admin',
            value: 'Organization Admin',
            icon: 'fa fa-briefcase',
          },
          {
            name: 'admin/laboratory',
            value: 'Laboratory',
            icon: 'fa fa-flask',
          },
          // {name:"admin/frontOffice",value:"Front Office",icon:"fa fa-briefcase"},
          // {name:"admin/lab",value:"Lab",icon:"fa fa-flask"},
          // {name:"admin/labIncharge",value:"Lab Incharge",icon:"fa fa-flask"},
          // {name:"admin/labTechnician",value:"Lab Technician",icon:"fa fa-flask"},
          { name: 'admin/doctors', value: 'Doctor', icon: 'fa fa-user-md' }

          // {name:"admin/doctor-master",value:"Doctor-Master",icon:"fa fa-asterisk"},
          // {name:"admin/management",value:"Management",icon:"fa fa-users"},
          // {name:"admin/manager",value:"Manager",icon:"fa fa-id-badge"},
          // {name:"admin/patient",value:"Patient",icon:"fa fa-male"},
          // {name:"admin/patientList",value:"Patient List",icon:"fa fa-list"},
          // {name:"admin/question",value:"Question",icon:"fa fa-question"},
          // {name:"admin/test-result",value:"Test Result",icon:"fa fa-list"},
          // {name:"admin/testMaster",value:"test Master",icon:"fa fa-superpowers"},
          // {name:"admin/testMasterList",value:"Test Master List",icon:"fa fa-users"},
          // {name:"admin/testResultMaster",value:"test result master",icon:"fa fa-asterisk"},
          // {name:"admin/testPackages",value:"Test Packages",icon:"fa fa-asterisk"},
          // {name:"privia/depart-master",value:"Depart master",icon:"fa fa-asterisk"},
          // {name:"admin/collection",value:"Collection",icon:"fa fa-asterisk"},
          // {name:"admin/technician",value:"DD-Technician",icon:"fa fa-asterisk"},
          // {name:"admin/technicianList",value:"DD-Technician ",icon:"fa fa-asterisk"},
          // {name:"settings/Changepassword",value:"Change Password",icon:"fa fa-asterisk"},
          // {name:"settings/profile",value:"Profile",icon:"fa fa-asterisk"},
          // {name:"privia/technicianAssign",value:"DD-Technician Assign",icon:"fa fa-list"},
          // {name:"admin/technicianPending",value:"Technician-Pending/Completed ",icon:"fa fa-list"},
          // {name:"admin/rider-list",value:"Rider List",icon:"fa fa-list"},
          // {name:"admin/add-rider",value:"Add Rider",icon:"fa fa-list"},
          // {name:"admin/rider-assign",value:"Rider Assign",icon:"fa fa-list"},
          // {name:"privia/patients-pending-test",value:"Patients Pending Tests",icon:"fa fa-list"},
        );
    } else if (user?.role === 'front-office') {
      this.urls.push(
        // {
        //   name: 'admin/patient',
        //   value: 'Patient Regi',
        //   icon: 'fa fa-th-large',
        // },
        // { name: 'privia/patients', value: 'Patients List', icon: 'fa fa-list' },
        {
          name: 'admin/referral-patients',
          value: 'Referral patients',
          icon: 'fa fa-list',
        },
        {
          name: 'admin/batch-counts',
          value: 'Batch Tests Counts',
          icon: 'fa fa-list',
        },
        // { name: 'admin/vaccine', value: 'Vaccine', icon: 'fa fa-asterisk' },
        {
          name: 'admin/ftp-upload',
          value: 'Ftp Upload',
          icon: 'fa fa-upload',
        },
        {
          name: 'privia/documents-upload',
          value: 'Documents Upload',
          icon: 'fa fa-upload',
        },
        // {
        //   name: 'privia/technicianAssign',
        //   value: 'DD-Technician Assign',
        //   icon: 'fa fa-list',
        // },
        { name: 'admin/vaccine', value: 'Vaccine', icon: 'fa fa-asterisk' },
        {
          name: 'admin/technicianList',
          value: 'DD-Technician ',
          icon: 'fa fa-asterisk',
        },
        { name: 'roles-menus/roles', value: 'Roles', icon: 'fa fa-asterisk' },
        { name: 'roles-menus/menus', value: 'Menus', icon: 'fa fa-asterisk' },
        // {name:"settings/Changepassword",value:"Change Password",icon:"fa fa-asterisk"},
        // {name:"settings/profile",value:"Profile",icon:"fa fa-asterisk"},
        // {name:"admin/rider-list",value:"Rider List",icon:"fa fa-list"},
        // {name:"admin/rider-assign",value:"Rider Assign",icon:"fa fa-list"},
        // {name:"settings/Changepassword",value:"Change Password",icon:"fa fa-asterisk"},
        // {name:"settings/profile",value:"Profile",icon:"fa fa-asterisk"},
        // {name:"admin/test-result",value:"Test Result",icon:"fa fa-list"},

        // {name:"admin/question",value:"Question",icon:"fa fa-th-large"},
      ),
        this.patients.push(
          { name: 'admin/patient', value: 'Patient', icon: 'fa fa-male' },
          {
            name: 'admin/patientList',
            value: 'Patient List',
            icon: 'fa fa-male',
          },
          { name: 'admin/ invalid-bulk-upload', value: 'Invalid Bulk Uploads', icon: 'fa fa-upload' },
          {
            name: 'privia/patients-pending-test',
            value: 'Patients Pending Tests',
            icon: 'fa fa-male',
          },
          { name: 'admin/question', value: 'Question', icon: 'fa fa-question' },
       
        ),
        // this.technician.push(
        //   {
        //     name: 'admin/technicianList',
        //     value: 'DD-Technician ',
        //     icon: 'fa fa-asterisk',
        //   },
        // ),
        this.rider.push(
          {
            name: 'admin/rider-list',
            value: 'Rider List',
            icon: 'fa fa-asterisk',
          },
          {
            name: 'admin/rider-assign',
            value: 'Rider Assign',
            icon: 'fa fa-asterisk',
          }
        );
    } else if (
      user?.role === 'lab' ||
      user?.role === 'lab-incharge' ||
      user?.role === 'lab-technician'
    ) {
      this.urls.push(
        { name: 'admin/test-result', value: 'Test Result', icon: 'fa fa-list' },
        { name: 'admin/collection', value: 'Collection', icon: 'fa fa-list' },
        { name: 'roles-menus/roles', value: 'Roles', icon: 'fa fa-asterisk' },
        { name: 'roles-menus/menus', value: 'Menus', icon: 'fa fa-asterisk' },
      );
    }
  }
  checkPageAccess(value: any): any {
     return this.userToken?.authorities ? this.userToken.authorities.includes(value)  ? true :false: false
  }
  
  /* checkQuoteAccess(): boolean {
    const flag = (this.user?.role == 'admin') ? true : false;
    return flag
  } */

  navigateRoute(routeName) {
    this.router.navigateByUrl(`/${routeName}`);
  }
  activeAdminParent() {
    let adminActive = this.admin.filter((el) => {
      let url = '/' + el.name;
      if (url === this.router.url) {
        return true;
      } else {
        return false;
      }
    });
    if (adminActive.length != 0) {
      this.classes = 'adminActive';
    } else {
      this.classes = '';
    }
    return this.classes;
  }
  activeLabsParent() {
    let labsActive = this.labs.filter((el) => {
      let url = '/' + el.name;
      if (url === this.router.url) {
        return true;
      } else {
        return false;
      }
    });
    if (labsActive.length != 0) {
      this.classes = 'labsActive';
    } else {
      this.classes = '';
    }
    return this.classes;
  }
  activeTestsParent() {
    let testActive = this.tests.filter((el) => {
      let url = '/' + el.name;
      if (url === this.router.url) {
        return true;
      } else {
        return false;
      }
    });
    if (testActive.length != 0) {
      this.classes = 'testsActive';
    } else {
      this.classes = '';
    }
    return this.classes;
  }
  activePatientsParent() {
    let patientsActive = this.patients.filter((el) => {
      let url = '/' + el.name;
      if (url === this.router.url) {
        return true;
      } else {
        return false;
      }
    });
    if (patientsActive.length != 0) {
      this.classes = 'patientsActive';
    } else {
      this.classes = '';
    }
    return this.classes;
  }
  activeTechnicianParent() {
    let technicialActive = this.technician.filter((el) => {
      let url = '/' + el.name;
      if (url === this.router.url) {
        return true;
      } else {
        return false;
      }
    });
    if (technicialActive.length != 0) {
      this.classes = 'technicianActive';
    } else {
      this.classes = '';
    }
    return this.classes;
  }
  activeRiderParent() {
    let riderActive = this.rider.filter((el) => {
      let url = '/' + el.name;
      if (url === this.router.url) {
        return true;
      } else {
        return false;
      }
    });
    if (riderActive.length != 0) {
      this.classes = 'riderActive';
    } else {
      this.classes = '';
    }
    return this.classes;
  }

  enableCollapseView(collapseType){
    for (let index = 0; index < this.userToken.authorities.length; index++) {
      const element = this.userToken.authorities[index];
      if(collapseType == 'admin'){
       if(['HOSPITAL_VIEW', 'LOCATION_VIEW' , 'BRANCH_VIEW','FRONT_OFFICE_VIEW', 'ORGANIZATION_ADMIN_VIEW','LABORATORY_VIEW'].includes(element)){
        return true
        break;
       }
      }
      if(collapseType == 'lab'){
        if(['LAB_USER_VIEW', 'LAB_INCHARGE_VIEW' , 'LAB_TECHNICIAN_VIEW'].includes(element)){
         return true
        }
      }
       if(collapseType == 'testMaster'){
        if(['TEST_RESULT_VIEW', 'TEST_MASTER_VIEW' , 'TEST_RESULT_MASTER_ADD','TEST_PACKAGES_VIEW'].includes(element)){
         return true
        }
       }
       if(collapseType == 'patient'){
        if(['PATIENT_ADD', 'PATIENT_VIEW' , 'PATIENTS_PENDING_TESTS_VIEW','QUESTIONNAIRE', 'PROMOTION_VIEW', 'PROMOTION_HEADER_FOOTER_VIEW'].includes(element)){
         return true
        }
       } 
       if(collapseType == 'rider'){
        if(['RIDER_VIEW','RIDER_ASSIGN'].includes(element)){
         return true
        }
       } 
       if(collapseType == 'accession'){
        if(['COLLECTION_VIEW','LABASSIGN_VIEW'].includes(element)){
         return true
        }
       } 
       if(collapseType == 'inventory'){
        if(['INVENTORY_ADD','INVENTORY_LIST','INVENTORY_LIST_ALL','INVENTORY_UPDATE','INVENTORY_DELETE'].includes(element)){
         return true
        }
       } 
    }
  }

}
