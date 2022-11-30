import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';


@Component({
  selector: 'app-batch-counts',
  templateUrl: './batch-counts.component.html',
  styleUrls: ['./batch-counts.component.scss'],
})
export class BatchCountsComponent implements OnInit {

   //pagination and api integration starts from here
   length = 100;
   pageSize = 10;
   page: number = 1;
   pageSizeOptions: number[] = [5, 10, 25, 50, 100];
   pageEvent: PageEvent;
   isDefault: boolean = true;
   sortDirection: string;
   sortvalue: any;
   // Jquery<bootstrapToggle>(): any;
   //pagination code ends here

  errormessage:any;
  errormessage1:any;
  branchDetails: any;
  user: any;
  userrole: string;
  public date: Date;
  batchDate = new Date();
  batchCounts = [];
  bulkPatients: any;
  PatientbatchbulkData: any;
  invalidRecords: any;
  invalidRecordsCount: any;
  selectedUploadBranch: any = '';
  testReportUrl = environment.testReportBaseurl;
  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public health: HealthService
  ) {
    this.spinner.hide()
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_details'));
    this.getBranchDetails();
    this.getBatch()
  }

  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getBatch()
    console.log("page", this.pageEvent?.pageIndex, this.pageEvent?.pageSize)
  }

  getBatch() {
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)

    // formData['role'] = ""
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getBatchTestsCounts(formData)

  }


  getBatchTestsCounts(formData) {
 

    this.adminService.getBatchCounts(formData,this.user?.company).subscribe((res) => {
      if (res?.statusCode == 200) {
        const temp = [];
        // res?.data?.batchTests.forEach(batchTest => {
        for (const batchTest of res?.data?.batchTests) {
          const checkBatch =
            temp?.length > 0
              ? temp.filter((tempBatch) => {
                  if (tempBatch.bid == batchTest.bid) {
                    return tempBatch;
                  }
                })
              : [];
          if (checkBatch?.length > 0) {
            const foundIndex = temp.findIndex(
              (x) => x.bid == checkBatch[0]?.bid
            );
            temp[foundIndex].smsSent += batchTest?.smsSent;
            temp[foundIndex].smsFaild += batchTest?.smsFaild;
          }
          if (checkBatch?.length == 0) {
            temp.push(batchTest);
          }
        }

        this.batchCounts = temp.reverse();
      }
    });
  }
  openSmsSent(content) {
    const dialogRef = this.dialog.open(content, {
      width: '100%',
      data: {},
    });
  }

  openSmsFailed(content) {
    const dialogRef = this.dialog.open(content, {
      width: '100%',
      data: {},
    });
  }

  openUploadPatientsModel(contentModal) {
    this.errormessage1 = " ";  
    this.errormessage = " ";      
    const dialogRef = this.dialog.open(contentModal, {
      width: '30rem',
      data: {},
    });
  }

  openInvalidpatientsmodal(contentModal, invalidRecordsCount) {
    this.invalidRecordsCount = 0;
    this.invalidRecordsCount = invalidRecordsCount;
    const dialogRef = this.dialog.open(contentModal, {
      width: '30rem',
      data: {},
    });
  }
  public onClose(): void {
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
    };
    reader.readAsBinaryString(file);
  }

  onSubmit() {    
    if(!this.bulkPatients ) {
     this.errormessage = "Please Select the Branch";
     this.errormessage1 = "Please Upload Valid Excel file";
      
       return
     }
    //  if(!this.selectedUploadBranch ) {
    //   this.errormessage = "Please Select the Branch";
    //     return
    //   }
     if(!this.bulkPatients) {
      this.errormessage1 = "Please Upload Valid Excel  File ";
      
      
        return
      }
      if(this.bulkPatients.length == 0) {
        this.errormessage1 = "Please Upload Valid Excel  File ";
          return
        }
    
    this.spinner.show();
   
    const obj = {
      patients: this.bulkPatients,
      bulkBranchId: this.user.subdivision_id,
    };

    
    this.health.addBulkPatientsAndResults(obj).subscribe((res) => {
      this.getBatch();
  
      this.spinner.hide();
      this.onClose();
      this.selectedUploadBranch = ""
      Swal.fire({
        text: `${res?.data?.data?.patientsCount} Patients Registered Successfully.`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#00c9d1',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ok',
        confirmButtonText: `Download ${res?.data?.data?.invalidRecords?.length} Invalid Patients Records`,
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.PatientbatchbulkData = res?.data?.data?.invalidRecords;

          this.downloadInvalidRecordsAfterUpload(res?.data?.data?.batchId);
        }
      });
    });
  }

  sampleFileDownload() {
    FileSaver.saveAs(
      `${this.testReportUrl}PatientsTestsResultBulkUpload.xlsx`,
      `PatientsBulkUpload.xlsx`
    );
  }

  downloadInvalidRecords(bid, invalidRecords) {
    this.spinner.show();
    this.invalidRecords = invalidRecords;
    this.exportInvalidRecordsToexcels(bid);
  }

  downloadInvalidRecordsAfterUpload(bid) {
    this.adminService.getInvalidRecordsByBatchId(bid).subscribe((res) => {
      console.log({ res });
      this.invalidRecords = res.data.invalidRecords;
      this.exportInvalidRecordsToexcels(bid);
    });
  }

  invalidRecordsUpload() {
    if (this.bulkPatients?.length != this.invalidRecordsCount) {
      Swal.fire(`invalid records must be ${this.invalidRecordsCount} records`);
      return;
    }
    this.spinner.show();
    const obj = {
      patients: this.bulkPatients,
    };
    this.adminService.uploadBatchValidRecords(obj).subscribe((res) => {
      this.getBatch();
      this.spinner.hide();
      this.onClose();
      Swal.fire({
        text: `${res?.data?.patientsCount} Patients Registered Successfully.`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#00c9d1',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ok',
        confirmButtonText: `Download ${res?.data?.invalidRecords?.length} Invalid Patients Records`,
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.invalidRecords = res?.data?.invalidRecords;
          if (res?.data?.invalidRecords?.length > 0) {
            this.exportInvalidRecordsToexcels(
              res?.data?.invalidRecords[0]?.bid
            );
          }
        }
      });
    });
  }
  exportexcels(): void {
    this.spinner.show();
    setTimeout(() => {
      / table id is passed over here /;
      let element = document.getElementById('patient-invalid-records');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      / generate workbook and add the worksheet /;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      / save to file /;
      XLSX.writeFile(wb, 'PatientsInvalidRecords.xlsx');
      this.spinner.hide();
      this.onClose();
      Swal.fire('Patients Invalid Records Downloaded SuccessFully');
    }, 5000);
  }
  exportInvalidRecordsToexcels(bid): void {
    this.spinner.show();
    setTimeout(() => {
      / table id is passed over here /;
      let element = document.getElementById('patient-download-invalid-records');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      / generate workbook and add the worksheet /;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      / save to file /;
      XLSX.writeFile(wb, `${bid}.xlsx`);
      this.spinner.hide();
      this.onClose();
      Swal.fire(`Batch (${bid}) invalid records downloaded successfully`);
    }, 3000);
  }

  getLatestBatchCounts(bid) {
    this.spinner.show();
    this.adminService.getBatchCountsByBatchId(bid).subscribe((res) => {
      this.spinner.hide();
      const batchCounts = res.data?.batchTests;
      if (batchCounts?.bid) {
        const batchIndex = this.batchCounts.findIndex(
          (obj) => obj.bid == batchCounts?.bid
        );
        this.batchCounts[batchIndex].invalidRecords =
          batchCounts.invalidRecords;
        this.batchCounts[batchIndex].smsFaild = batchCounts.smsFaild;
        this.batchCounts[batchIndex].smsSent = batchCounts.smsSent;
      }
    });
  }
  
  selectedDate(event) {
    console.log(event.target.value);
  }

  clearDate(event) {
    event.stopPropagation();
    this.date = null;
  }

  getBranchDetails() {
    let obj = {
      companyId: this.user.company,
      category: 'branch',
    };
    // this.adminService.getSubdivision(obj).subscribe((res) => {
    //   console.log('hospitalDetails', res);
    //   this.branchDetails = res.data.subDivisions;
    // });

  }


  selectBranch() {
    this.errormessage = " ";    
  }


  fileUpload(){     
    this.errormessage1 = " ";    
  }
}
