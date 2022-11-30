import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'pid',
    'name',
    'emailAddress',
    'mobileNumber',
    'gender',
    'age',
    'address',
    'Actions',
  ];
  dataSource: any;
  selectedPatientsDate: any = { startDate: null, endDate: null };
  // pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault = true;
  sortDirection: string;
  sortvalue: any;
  patientTestStatus = 'all';
  // pagination code ends here

  @ViewChild(MatPaginator) paginator: MatPaginator;
  action: string;
  patients: any;
  patientDetails: any;
  selectedPatientsType = 'all';
  selectedForm: FormGroup;
  startDate: any;
  endDate: any;
  checkAllPatients: Boolean = false;
  checkedLabPatients: any = [];
  labListData: any = [];
  user: any;
  selectedLab: any;
  disabled = null;
  // patientTestStatus = '';
  searchValue = '';
  searchReferrerValue = '';
  templeteForm: FormGroup;
  userdetails: any;
  selectedOrganization: any;
  subDivisions: [];
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
  };

  selectedTransaction: any = {};
  paymentLinkType = 'sms';
  categories$: any = [];
  selectedCategory: any;
  referedPhoneNumbers: any = [];
  ngAfterViewInit() {}

  constructor(
    public dialog: MatDialog,
    private healthService: HealthService,
    private readonly adminService: AdminService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.selectedForm = this.fb.group({
      selectedPatientsType: [''],
    });
    this.user = JSON.parse(localStorage.getItem('user_details'));
    this.getSubDivisions('hospital');
    this.selectedPatientsDate.startDate = moment()
      .subtract(1, 'days')
      .startOf('day');
    this.selectedPatientsDate.endDate = moment()
      .subtract(0, 'days')
      .startOf('day');
  }

  ngOnInit(): void {
    this.templeteForm = this.fb.group({
      header_type: [''],
      template_type: [''],
      promotionPage: [true],
    });
    // this.getPatients();
    this.loadSubLabDetails();
    this.getAllCategories();

    this.userdetails = JSON.parse(localStorage.getItem('user_details'));
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
    this.healthService.getPatientsList(formData).subscribe((res) => {
      console.log("=====getPatientsList", res);
      
      this.spinner.hide();
      this.patientDetails = res.data.patients;
      this.length = res.data.total_count;
    });
  }

  changePatientsType() {
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    this.spinner.show();
    if (this.patientTestStatus !== 'all') {
      const formData: any = PaginationUtility.getGridFilters(
        this.isDefault,
        this.pageEvent
      );
      formData.testsStatus = this.patientTestStatus;
      if (this.sortvalue) {
        formData.sortBy = this.sortvalue;
        formData.sortOrder = this.sortDirection;
      }
      if (this.selectedPatientsDate?.startDate) {
        formData.startDate = moment(
          this.selectedPatientsDate?.startDate
        ).format('YYYY-MM-DD');
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
      this.healthService
        .getPatientsTestsCountsList(formData)
        .subscribe((res) => {
          console.log("---getPatientsTestsCountsList----res",res);
          
          this.spinner.hide();
          this.patientDetails = res.data.patientTests;
          this.length = res.data.total_count;
        });
    }
    if (this.patientTestStatus === 'all') {
      this.getPatients();
    }
  }

  public sortEvent(event): void {
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    if (this.sortvalue === event) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    } else {
      this.sortDirection = 'ASC';
    }
    this.sortvalue = event;
    const formData: any = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );

    formData.sortBy = this.sortvalue;
    formData.sortOrder = this.sortDirection;
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
    if (this.patientTestStatus === 'all' || !this.patientTestStatus) {
      this.getpatientsDetails(formData);
    } else {
      this.changePatientsType();
    }
  }

  add_patient() {
    this.action = 'add';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    (dialogConfig.width = '500px'),
      (dialogConfig.data = {
        action: this.action,
      });
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {});
  }
  getSubDivisions(value) {
    const role = value;
    const formData: any = {};
    (formData.companyId = this.user.company), (formData.category = role);
    this.getLaboratoryDetails(formData);
  }

  getLaboratoryDetails(formData) {
    this.adminService.getSubdivision(formData).subscribe((res) => {
      this.subDivisions = res.data.subDivisions;
      // console.log( this.subDivisions,'res');
    });
  }
  addBulkPatients() {
    this.action = 'addbulk';
    const dialogConfig = new MatDialogConfig();

    (dialogConfig.width = '450px'),
      (dialogConfig.data = {
        action: this.action,
      });
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.getPatients();
    });
  }
  editPatients(patient) {
    localStorage.setItem('pid', patient.pid);
    // localStorage.setItem('address', patient.address)
    this.router.navigateByUrl('/admin/patient');
  }
  changePatientsDate() {
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    if (
      this.selectedPatientsDate &&
      (this.patientTestStatus === 'all' || !this.patientTestStatus)
    ) {
      const formData: any = PaginationUtility.getGridFilters(
        this.isDefault,
        this.pageEvent
      );

      if (this.sortvalue) {
        formData.sortBy = this.sortvalue;
        formData.sortOrder = this.sortDirection;
      }
      if (this.selectedPatientsDate?.startDate) {
        formData.startDate = moment(
          this.selectedPatientsDate?.startDate
        ).format('YYYY-MM-DD');
      }
      if (this.selectedPatientsDate.endDate) {
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
      this.getpatientsDetails(formData);
    } else {
      this.changePatientsType();
    }
  }

  clearDate() {
    this.selectedPatientsDate = null;
    if (this.patientTestStatus === 'all' || !this.patientTestStatus) {
      this.getPatients();
    } else {
      this.changePatientsType();
    }
  }

  selectAllPatientsToLab(event, patientDetails) {
    this.patientDetails = this.patientDetails.map((patient) => {
      patient.isChecked = event.target.checked;
      return patient;
    });
    this.checkedLabPatients = this.patientDetails.filter((patientInfo) => {
      return patientInfo?.isChecked === true;
    });
  }
  selectPatientToLab(event, patientInfo) {
    this.patientDetails = this.patientDetails.map((patient) => {
      if (patient.pid === patientInfo.pid) {
        this.checkedLabPatients.map((checkPatient) => {
          if (checkPatient.pid === patientInfo.pid) {
            patient.isChecked = event.target.checked;
          }
          return checkPatient;
        });
        patient.isChecked = event.target.checked;
      }
      return patient;
    });
    this.checkedLabPatients = this.patientDetails.filter((patientInfo) => {
      return patientInfo?.isChecked === true;
    });
    console.log(this.patientDetails, this.checkedLabPatients);
  }

  assignToLab(dialogContent) {
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }

  openDownloadReportModel(dialogContent) {
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }

  downloadReport() {
    if (this.templeteForm.invalid) {
      return;
    }
    const patientsData = this.checkedLabPatients;
    for (const patient of patientsData) {
      for (const patientTest of patient.tests) {
        const reqObj = {
          testId: patientTest._id,
          patientId: patient._id,
          templateId: this.templeteForm.value.template_type,
          isHeader: this.templeteForm.value.header_type,
          promotionPage: this.templeteForm.value.promotionPage,
          isReferralPatient: false,
          subdivision_id: this.userdetails?.subdivision_id,
        };

        this.healthService.downloadReport(reqObj).subscribe((res) => {
          saveAs(res.data, patient.name + '_' + patientTest.name + '.pdf');
          this.checkAllPatients = null;
          this.checkedLabPatients = [];
        });
      }
    }
    Swal.fire({
      title: 'Downloaded SuccessFully',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    this.dialog.closeAll();
    this.patientDetails = this.patientDetails.map((item) => {
      item.isChecked = false;
      return item;
    });
  }
  public onClose(): void {
    this.dialog.closeAll();
  }
  select_lab(event) {
    this.selectedLab = event.target.value;
  }

  submitAssign() {
    const params = {
      subDivision_id: this.selectedLab,
      patients: this.checkedLabPatients,
    };
    this.spinner.show();
    this.healthService.labAssign(params).subscribe((res) => {
      this.spinner.hide();
      this.checkAllPatients = null;
      this.checkedLabPatients = [];
      Swal.fire('Assigned SuccessFully');
      this.getPatients();
      this.dialog.closeAll();
    });
  }

  loadSubLabDetails() {
    const obj = {
      category: 'lab',
    };

    this.adminService
      .getSublabDetails(this.user?.company, obj)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          this.labListData = res.data.subDivisions;
          console.log(this.labListData, 'subLabData');
        }
      });
  }

  searchPatients() {
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    if (this.patientTestStatus === 'all') {
      this.getPatients();
    } else {
      this.changePatientsType();
    }
    return;
    if (this.searchValue.length > 2) {
      if (this.patientTestStatus) {
        this.getPatients();
      }
      // else {
      //   this.changePatientsType();
      // }
    }
    if (this.searchValue.length === 0) {
      if (this.patientTestStatus) {
        this.changePatientsType();
      }
      // else {
      //   this.changePatientsType();
      // }
    }
  }
  searchByReferrer() {
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    if (this.searchReferrerValue.length > 2) {
      if (this.patientTestStatus === 'all' || !this.patientTestStatus) {
        this.getPatients();
      } else {
        this.changePatientsType();
      }
    }
    if (this.searchReferrerValue.length === 0) {
      if (this.patientTestStatus === 'all' || !this.patientTestStatus) {
        this.getPatients();
      } else {
        this.changePatientsType();
      }
    }
  }

  openInvoiceModel(dialogContent, transInfo) {
    this.selectedTransaction = { ...transInfo };
    if (transInfo && transInfo.reportInfoMobileNo)
      this.referedPhoneNumbers = transInfo.reportInfoMobileNo.split(',');
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }

  sendReportPatient() {
    for (
      let index = 0;
      index < this.selectedTransaction.tests.length;
      index++
    ) {
      const element = this.selectedTransaction.tests[index];
      if (element.status === 'completed') {
        const reqObj = {
          testId: element._id,
          patientId: this.selectedTransaction.patientId,
          templateId: this.templeteForm.value.template_type,
          isHeader: true,
          promotionPage: true,
          isReferralPatient: false,
          subdivision_id: this.userdetails?.subdivision_id,
          type: this.paymentLinkType,
          customerPhone: this.selectedTransaction.mobileNumber,
          customerName: this.selectedTransaction.name,
        };

        this.healthService.downloadReport(reqObj).subscribe(
          (res) => {
            console.log(res);
            if (res) {
              // saveAs(res.data, 'myreport.pdf');
            }
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    }
    this.dialog.closeAll();
    this.selectedTransaction = {};
    Swal.fire('Report Sent SuccessFully');
  }

  getAllCategories() {
    this.healthService.getAllCategories().subscribe((res) => {
      if (res && res.data) {
        this.categories$ = res.data;
      }
    });
  }
}
