import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import { AdminService } from 'src/app/service/admin.service';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  transactionsLength = 100;
  transactionsPageSize = 10;
  transactionsPageSizeOptions: number[] = [5, 10, 25, 50, 100];
  paymentsLength = 100;
  paymentSize = 10;
  paymentsizeOptions: number[] = [5, 10, 25, 50, 100];

  startDate = Date;
  Subdivision_id: any;
  errormessage = '';
  filteredOrganizations: any = [];
  organizations: any;
  bulkPatients: any;
  errormessage1 = ' ';
  patientsOrgData: any;
  invalidRecordsData: any;
  invalidid: any;
  testReportUrl = environment.testReportBaseurl;
  userdetails: any;
  subdivisionInfo: any;
  bulkUploadForm: FormGroup;
  selectedPatientsType = 'all';
  selectedForm: FormGroup;
  selectedPatientsDate: any = { startDate: null, endDate: null };
  checkAllPatients: Boolean = false;
  checkedLabPatients: any = [];
  labListData: any = [];
  user: any;
  selectedLab: any;
  disabled = null;
  patientTestStatus = 'AwaitingSampleTechnician';
  searchValue = '';
  patientDetails: any = [];
  dataSource: any;
  pageEvent: PageEvent;
  labPageEvent: PageEvent;
  paymentsPageEvent: PageEvent;
  isDefault = true;
  isLabDefault = true;
  isPaymentsDefault = true;
  sortDirection: string;
  sortvalue: any;
  transactions: any = [];
  searchTransaction = '';
  searchPayment='';
  imageBaseUrl = environment.invoiceImageUrl;
  selectedTransaction: any;
  selectedInvoiceDate: any = { startDate: null, endDate: null };
  selectedPaymentDate:any={startDate:null,endDate:null};
  paymentLinkType = 'sms';

  paymentTransactions$ = [];
  paymentTransactionCount = 100;
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

  paymentDetailsLog: any = {};

  transactionLog$: any = [];
  paymentType=null;
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private healthService: HealthService,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.userdetails = JSON.parse(localStorage.getItem('user_details'));
    this.selectedInvoiceDate.startDate = moment()
      .subtract(1, 'days')
      .startOf('day');
    this.selectedInvoiceDate.endDate = moment()
      .subtract(0, 'days')
      .startOf('day');
    this.selectedPatientsDate.startDate = moment()
      .subtract(1, 'days')
      .startOf('day');
    this.selectedPatientsDate.endDate = moment()
      .subtract(0, 'days')
      .startOf('day');
      this.selectedPaymentDate.startDate = moment()
      .subtract(1, 'days')
      .startOf('day');
    this.selectedPaymentDate.endDate = moment()
      .subtract(0, 'days')
      .startOf('day');
  }

  ngOnInit(): void {
    this.healthService.getUserById().subscribe((res) => {
      this.subdivisionInfo = res?.subdivisionInfo;

      this.loadBulkUploadForm();
    });
    this.getOrganizationData();
    this.changePatientsType();
    this.loadSubLabDetails();
    this.getTransactions();
    this.getPaymentTransactions();
  }
  loadBulkUploadForm() {
    this.Subdivision_id = this.subdivisionInfo?._id
      ? this.subdivisionInfo._id
      : '';
    this.bulkUploadForm = this.fb.group({
      subdivisionID: [
        this.subdivisionInfo?._id ? this.subdivisionInfo._id : '',
      ],
    });
  }
  upload(contentModal) {
    this.errormessage1 = '';
    const dialogRef = this.dialog.open(contentModal, {
      width: '30rem',
      data: {},
    });
  }
  clear() {
    this.dialog.closeAll();
  }

  onFileChanges(ev) {
    this.bulkPatients = [];
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const patients = Object.values(jsonData);
      const temp = patients.reduce((all: any, item) => all.concat(item), []);
      this.bulkPatients = temp;
      if (this.bulkPatients) {
        this.errormessage1 = '';
      }
    };
    reader.readAsBinaryString(file);
  }
  getOrganizationData() {
    const obj = {
      companyId: this.userdetails.company,
    };

    this.healthService.getOrganizationData(obj).subscribe((res) => {
      this.organizations = res.data.subDivisions;
      this.filteredOrganizations = this.organizations;
    });
  }

  selectedOrganization(id) {
    this.Subdivision_id = id;
    if (this.Subdivision_id) {
      this.errormessage = '';
    }
  }

  onSelectionChanged(value) {
    if (value) {
      this.filteredOrganizations = this.organizations.filter((org) => {
        if ([org.name].includes(value)) {
          return org;
        }

        // if (org.name.toLowerCase() == value.toLowerCase()) {
        //   return org;
        // }
      });
    }
    this.filteredOrganizations = this.organizations;
  }

  onSubmitUpload() {
    if (!this.bulkPatients) {
      this.errormessage = 'Please Select the Organization';
      this.errormessage1 = 'Please Upload Valid Excel file';

      return;
    }
    if (!this.Subdivision_id) {
      this.errormessage = 'Please Select the Organization';
      return;
    }
    if (!this.bulkPatients) {
      this.errormessage1 = 'Please Upload Valid Excel file ';

      return;
    }
    if (this.bulkPatients.length === 0) {
      this.errormessage1 = 'No Patient Found In Excel ';
      return;
    }

    this.spinner.show();

    const obj = {
      patients: this.bulkPatients,
      subdivision_id: this.Subdivision_id,
    };

    this.healthService.addBulkPatientsOrganization(obj).subscribe((res) => {
      this.patientsOrgData = res.data.patients;
      this.invalidRecordsData = res.data.invalidRecords;
      this.invalidid = this.invalidRecordsData[0]?._id;
      this.spinner.hide();
      this.onClose();
      this.Subdivision_id = '';
      Swal.fire({
        text: `(${this.patientsOrgData?.length}) Patients Registered Successfully.`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Okay',
        confirmButtonText: `Download (${this.invalidRecordsData?.length}) Invalid Patients Records`,
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.invalidid
            ? this.exportInvalidRecordsToexcels(this.invalidid)
            : null;
        }
      });
    });
  }

  public onClose(): void {
    this.dialog.closeAll();
  }

  sampleFileDownload() {
    FileSaver.saveAs(
      `${this.testReportUrl}PatientsBulkUpload.xlsx`,
      `PatientsBulkUpload.xlsx`
    );
  }

  exportInvalidRecordsToexcels(invalidid) {
    setTimeout(() => {
      / table id is passed over here /;
      const element = document.getElementById('patient-invalid-records');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      / generate workbook and add the worksheet /;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      / save to file /;
      XLSX.writeFile(wb, `Invalid Records_${moment().format('L')}.xlsx`);

      Swal.fire(` Invalid Records Downloaded Successfully `);
    }, 3000);
  }
  changePatientsDate() {
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    if (this.selectedPatientsDate) {
      this.getPatients();
    } else {
      this.changePatientsType();
    }
  }

  changePatientsType() {
    this.spinner.show();
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    this.getPatients();
  }

  getPatients() {
    const formData: any = PaginationUtility.getGridFilters(
      this.isLabDefault,
      this.labPageEvent
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
    formData.testsStatus = this.patientTestStatus;
    formData.isLabAssignPatients = true;
    this.healthService.getPatientsTestsCountsList(formData).subscribe((res) => {
      this.spinner.hide();
      this.patientDetails = res.data.patientTests;
      this.length = res.data.total_count;
    });
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
      if (patient.sid === patientInfo.sid) {
        this.checkedLabPatients.map((checkPatient) => {
          if (checkPatient.sid === patientInfo.sid) {
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
  }

  assignToLab(dialogContent) {
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }
  select_lab(event) {
    this.selectedLab = event.target.value;
  }

  submitAssign() {
    const params = {
      subDivision_id: this.subdivisionInfo._id,
      patients: this.checkedLabPatients,
    };

    this.spinner.show();
    this.healthService.labAssign(params).subscribe((res) => {
      this.spinner.hide();
      this.checkAllPatients = null;
      this.checkedLabPatients = [];
      Swal.fire('Assigned SuccessFully');
      this.changePatientsType();
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
        }
      });
  }

  clearDate() {
    this.selectedPatientsDate = null;
    this.changePatientsType();
  }
  clearInvoiceDate() {
    this.selectedInvoiceDate = null;
    this.getTransactions();
  }
  clearPaymentDate(){
    this.selectedPaymentDate=null;
  }
  getTransactions() {
    const formData: any = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );

    if (this.searchTransaction) {
      formData.search = this.searchTransaction;
    }
    if (this.selectedInvoiceDate?.startDate) {
      formData.startDate = moment(this.selectedInvoiceDate?.startDate).format(
        'YYYY-MM-DD'
      );
    }
    if (this.selectedInvoiceDate.endDate) {
      formData.endDate = moment(this.selectedInvoiceDate?.endDate).format(
        'YYYY-MM-DD'
      );
    }
    this.healthService
      .transactions(formData)
      .subscribe((transactionsRes: any) => {
        this.transactions = transactionsRes?.data?.transactions || [];
        this.transactionsLength = transactionsRes?.data?.total_count;
      });
  }
  downloadInvoice(transInfo) {
    this.spinner.show();
    this.healthService
      .downloadInvoice({ invoiceId: transInfo?.invoiceId, isSendToMail: false })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          FileSaver.saveAs(
            `${this.imageBaseUrl}${res.data.path}`,
            `${res.data.path}`
          );
          Swal.fire('Invoice downloaded successFully');
        },
        (err) => {
          Swal.fire('Failed to download');
        }
      );
  }
  openInvoiceModel(dialogContent, transInfo) {
    this.selectedTransaction = transInfo;
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }

  sendInvoice() {
    this.spinner.show();
    const transInfo = this.selectedTransaction;

    this.healthService
      .downloadInvoice({
        invoiceId: transInfo?.invoiceId,
        isSendToMail: true,
        emailAddress: transInfo.patient?.emailAddress,
        type: this.paymentLinkType,
        customerPhone: transInfo.patient?.mobileNumber,
        customerName: transInfo.patient?.name,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          Swal.fire('Sent successFully!');
          this.dialog.closeAll();
        },
        (err) => {
          this.dialog.closeAll();

          this.spinner.hide();
          Swal.fire('Failed to send');
        }
      );
  }

  onTransactionsPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getTransactions();
  }
  onLabAssignPageEvent(event) {
    this.isLabDefault = false;
    this.labPageEvent = event;
    this.getPatients();
  }
  onPaymentsPageEvent(event) {
    this.isPaymentsDefault = false;
    this.paymentsPageEvent = event;
    this.getPaymentTransactions();
  }
  onSearchTransaction() {
    if (this.searchTransaction.length > 2) {
      this.getTransactions();
    }
    if (this.searchTransaction.length === 0) {
      this.getTransactions();
    }
  }
  changeInvoiceDate() {
    if (this.selectedInvoiceDate) {
      this.getTransactions();
    } else {
      this.getTransactions();
    }
  }

  checkEmailValidation() {
    //  const emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    //  if(this.selectedTransaction.patient.emailAddress.matches(emailRegex)){
    //    console.log('valid');
    //  }
  }

  createPaymentLink() {
    this.spinner.show();
    const transInfo = this.selectedTransaction;
    const params = {
      invoiceId: transInfo.invoiceId,
      orderAmount: transInfo.dueAmount,
      orderNote: 'Medical Test Bill',
      customerName: transInfo.patient.name,
      customerPhone: transInfo.patient.mobileNumber,
      customerEmail: transInfo.patient.emailAddress,
      linkType: this.paymentLinkType,
    };

    this.healthService.createPaymentLink(params).subscribe(
      (res: any) => {
        this.spinner.hide();
        Swal.fire('Sent successFully!');
        this.dialog.closeAll();
      },
      (err) => {
        this.dialog.closeAll();

        this.spinner.hide();
        Swal.fire('Failed to send');
      }
    );
  }

  getPaymentTransactions() {
    const formData: any = PaginationUtility.getGridFilters(
      this.isPaymentsDefault,
      this.paymentsPageEvent
    );
    if (this.searchPayment) {
      formData.searchString = this.searchPayment;
    }
    if (this.selectedPaymentDate?.startDate) {
      formData.startDate = moment(this.selectedPaymentDate?.startDate).format(
        'YYYY-MM-DD'
      );
    }
    if (this.selectedPaymentDate.endDate) {
      formData.endDate = moment(this.selectedPaymentDate?.endDate).format(
        'YYYY-MM-DD'
      );
    }
    if(this.paymentType){
      formData.paymentType=this.paymentType;
    }
    console.log(formData);
    this.healthService
      .getPaymentTransactions(formData)
      .subscribe((resp: any) => {
        if (resp && resp.statusCode === 200) {
          this.paymentTransactionCount = resp.data.total_count;
          this.paymentTransactions$ = resp.data.transactions;
        } else {
          this.paymentTransactionCount = 0;
          this.paymentTransactions$ = [];
        }
      });
  }
  changePayment(event){
    let value=event.target.value;
    this.paymentType=value
    if(value){
      this.getPaymentTransactions();
    }
 }
  changePaymentDate(){
    this.getPaymentTransactions();
  }
  enterValue(){
    if(this.searchPayment.length>2){
this.getPaymentTransactions();
    }
    if (!this.searchPayment) {
      this.getPaymentTransactions();
    }
  }

  openPaymentDetailsModel(dialogContent, transInfo) {
    this.paymentDetailsLog = transInfo;
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }

  openTransactionLog(dialogContent, transInfo) {
    this.transactionLog$ = transInfo;
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }
}
