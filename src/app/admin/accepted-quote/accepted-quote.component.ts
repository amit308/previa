import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HealthService } from 'src/app/service/health.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import {MatDialog, MatDialogConfig} from "@angular/material/ma";
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-accepted-quote',
  templateUrl: './accepted-quote.component.html',
  styleUrls: ['./accepted-quote.component.scss']
})
export class AcceptedQuoteComponent implements OnInit {

  isDefault = true;
  pageEvent: PageEvent;
  checkAllPatients: Boolean = false;
  checkedLabPatients: any = [];
  patientTestStatus = 'all';
  sortvalue: any;
  sortDirection: string;
  searchValue = '';
  searchReferrerValue = '';
  patientDetails: any;
  length = 100;
  selectedPatientsDate: any = { startDate: null, endDate: null };
  selectedCategory: any;
  startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  pendingPatients = [];
  patientsArray: FormArray;
  patientForm: FormGroup;
  technicianInfo: any;
  disabled: Boolean = true;

  constructor(
    private healthService: HealthService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    public dialog: MatDialog

    // private dialog: MatDialog


  ) { }
  
  ngOnInit(): void {
    // this.getpatientsDetails(FormData);
      this.loadPatientForm();
    this.getPatientTests();
  }

  loadPatientForm() {
    this.patientForm = this.fb.group({
      patientsArray: this.fb.array([]),
    });
  }
  

  getpatientsDetail1s(){
    console.log("----testing");
    
    this.healthService.getPatientsList(FormData).subscribe((res=>{
      // console.log("=====getpending data", res);
      

    }))
  }
  onPageEvent(event) {
    this.spinner.show();
    this.isDefault = false;
    this.pageEvent = event;
    this.checkAllPatients = null;
    this.checkedLabPatients = [];

    if (this.patientTestStatus !== 'all' && this.patientTestStatus) {
      const formData: any = PaginationUtility.getGridFilters(
        this.isDefault,
        this.pageEvent
      );
      formData.role = 'front-office';
      formData.testsStatus = this.patientTestStatus;
      if (this.sortvalue) {
        formData.sortBy = this.sortvalue;
        formData.sortOrder = this.sortDirection;
      }
      if (this.searchValue) {
        formData.searchString = this.searchValue;
      }
      if (this.searchReferrerValue) {
        formData.searchReferrer = this.searchReferrerValue;
      }
      this.healthService
        .getPatientsTestsCountsList(formData)
        .subscribe((res) => {
          this.spinner.hide();
          this.patientDetails = res.data.patientTests;
          console.log("======",this.patientDetails);
          
          this.length = res.data.total_count;
        });
    }
    if (this.patientTestStatus === 'all' || !this.patientTestStatus) {
      this.getPatients();
    }
  }
  getPatients() {
    const formData: any = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );

    if (this.sortvalue) {
      formData.sortBy = this.sortvalue;
      formData.sortOrder = this.sortDirection;
    }
    if (this.selectedPatientsDate?.startDate) {
      formData.startDate = moment(this.selectedPatientsDate?.startDate).format(
        'YYYY-MM-DD'
      );
    }
    if (this.selectedPatientsDate?.endDate) {
      formData.endDate = moment(this.selectedPatientsDate?.endDate).format(
        'YYYY-MM-DD'
      );
    }
    if (this.searchValue) {
      formData.searchString = this.searchValue;
    }
    if (this.searchReferrerValue) {
      formData.searchReferrer = this.searchReferrerValue;
    }

    if (this.selectedCategory) {
      formData.category = this.selectedCategory;
    }

    this.getpatientsDetails(formData);
  }

  getpatientsDetails(formData) {
    this.spinner.show();
    formData.start = 0;
    formData.limit = 10;
    this.healthService.getPatientsList(formData).subscribe((res) => {
      // console.log("=====getPatientsList", res);
      
      this.spinner.hide();
      this.patientDetails = res.data.patients;
      this.length = res.data.total_count;
    });
  }

  getPatientTests(){
    const obj = {
      status: 'AwaitingSample',
      sampleDate: this.startDate,
    };
    this.healthService.getCollections(obj).subscribe((data) => {
      console.log("=====pendingdata", data);
      
      this.pendingPatients = data?.data?.patientTests || [];

      const temp = [];
      this.pendingPatients.forEach((test) => {
        const filterPatient = temp.filter((tempTest) => {
          return tempTest?.patientId === test?.patientId;
        });
        if (filterPatient.length === 0) {
          const obj = {
            patient: test?.patient,
            patientId: test?.patientId,
            tests: [test],
          };
          temp.push(obj);
        }
        if (filterPatient.length > 0) {
          temp.forEach((tempTest, index) => {
            if (tempTest?.patientId === test?.patientId) {
              temp[index].tests.push(test);
            }
          });
        }
      });
      this.pendingPatients = temp;

      this.patientsArray = this.patientForm.get('patientsArray') as FormArray;
      console.log("==patientsArray====",this.patientsArray);
      

      for (const pendingPatient of this.pendingPatients) {
        const temptests = [];

        pendingPatient.isCheck = false;
        for (const patientTest of pendingPatient.tests) {
          patientTest.isCheck = true;
          patientTest.instructions = patientTest?.instructions;
          temptests.push(this.fb.group(patientTest));
        }
        this.patientsArray?.push(
          this.fb.group({
            _id: [pendingPatient?.patient?._id],
            name: [pendingPatient?.patient?.name],
            pid: [pendingPatient?.patient?.pid],
            address: [pendingPatient?.patient?.address],
            isCheck: [pendingPatient.isCheck],
            patientTestsArray : this.fb?.array(temptests),
          })
        );
      }

      console.log(this.patientsArray);
    });
  }
  // 
  
  // 
  SendQuote(content)
  {
    const dialogRef = this.dialog.open(content, {
      width: '40%',
      data: {},
    });

  }

  
  select_Technician(event) {
    this.technicianInfo = event.target.value;
    console.log(event.target.value);
    this.disabled = false;
  }

  removeTest(index) {
    this.patientsArray = this.patientForm.get('patientsArray') as FormArray;
    this.patientsArray.removeAt(index);
  }
  
}