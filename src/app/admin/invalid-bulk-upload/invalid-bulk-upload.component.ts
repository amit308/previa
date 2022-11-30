import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HealthService } from 'src/app/service/health.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-invalid-bulk-upload',
  templateUrl: './invalid-bulk-upload.component.html',
  styleUrls: ['./invalid-bulk-upload.component.scss']
})
export class InvalidBulkUploadComponent implements OnInit {
 

  bulkUploadData:any
  patientsData:any
  //pagination and api integration starts from here
 length = 100;
 pageSize = 10;
 pageSizeOptions: number[] = [5, 10, 25, 50, 100];
 pageEvent: PageEvent;
 isDefault: boolean = true;
 sortDirection: string;
 sortvalue: any;
 //pagination code ends here
  constructor(private service:HealthService) { }

  ngOnInit(): void {
    this.getInvalidBulkUploadData();
  }
  onPageEvent(event) {
   
  }

  getInvalidBulkUploadData(){

    let obj = {
      subDivisionId :null
    }
  
    this.service.getInvalidBulkUploadData(obj).subscribe((res=>{
      this.bulkUploadData = res.data.invalidRecords
     
    }))

  }

  sampleFileDownload(info,_id) {
    this.patientsData = info
    this.exportInvalidRecordsToexcels(_id);
   
  }
 
  exportInvalidRecordsToexcels(_id): void {
    
    setTimeout(() => {
      / table id is passed over here /;
      let element = document.getElementById('patient-invalid-records');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      / generate workbook and add the worksheet /;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      / save to file /;
      XLSX.writeFile(wb, `Invalid Records_${moment().format('L')}.xlsx`);
  
     
      Swal.fire(` Invalid Records Downloaded Successfully`);
    }, 3000);
  }

}
