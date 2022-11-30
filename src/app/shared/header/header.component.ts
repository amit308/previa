import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastService } from 'src/app/service/broadcast.service';
import { HealthService } from 'src/app/service/health.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  urls = [];
  labs = [];
  patients = [];
  tests = [];
  rider = [];
  admin = [];
  
  user: any;
  toggle:Boolean = false;
  subdivisionName:any;
  userDetails:any;
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private router:Router,private broadcastservice:BroadcastService , private healthService:HealthService ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user_details'));
    this.userDetails = user;
    this.user = JSON.parse(localStorage.getItem('user_details'))
    this.broadcastservice.closeSidebar.subscribe(res=>{
      if(this.toggle === true)
      this.clearToggle()
    })

    this.fetchUserInfo()

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
        {
          name: 'privia/schemeMaster',
          value: 'scheme Master',
          icon: 'fa fa-superpowers',
        },
        { name: 'privia/price', value: 'price', icon: 'fa fa-money' },
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
          
          { name: 'admin/doctors', value: 'Doctor', icon: 'fa fa-user-md' }

        );
    } else if (user?.role === 'front-office') {
      this.urls.push(
       
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
        
        { name: 'admin/vaccine', value: 'Vaccine', icon: 'fa fa-asterisk' },
        {
          name: 'admin/technicianList',
          value: 'DD-Technician ',
          icon: 'fa fa-asterisk',
        },
        { name: 'roles-menus/roles', value: 'Roles', icon: 'fa fa-asterisk' },
        { name: 'roles-menus/menus', value: 'Menus', icon: 'fa fa-asterisk' },
    
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

  fetchUserInfo(){
    this.healthService.getUserById().subscribe(res =>{
      this.subdivisionName = res?.subdivisionInfo?.name     
       
    })
  }
  logOut(){
    localStorage.removeItem('user_token')
    this.broadcastservice.loginData.emit(false)
    this.router.navigateByUrl('/session/signIn')
    localStorage.removeItem('user_details')
    localStorage.removeItem('role')
    localStorage.removeItem('cvo')
  }

  menuToggle(){
    this.toggle = true;
    this.messageEvent.emit();
  }

  clearToggle(){
    this.toggle = false;
    this.messageEvent.emit();
  }

}
