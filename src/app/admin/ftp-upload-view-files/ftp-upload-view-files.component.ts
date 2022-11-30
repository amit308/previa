import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import {Location} from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { threadId } from 'worker_threads';
import { AnyAaaaRecord } from 'dns';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ftp-upload-view-files',
  templateUrl: './ftp-upload-view-files.component.html',
  styleUrls: ['./ftp-upload-view-files.component.scss']
})
export class FtpUploadViewFilesComponent implements OnInit {

  uploadedDate: Date
  public date: Date;
  ftpFilesData: any
  searchString = null
  fileName: any
  companyId: any;

  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  //pagination code ends here
  imageBaseUrl = environment.imageBaseUrl1

  constructor(
    private healthservice: HealthService,
    private _location: Location,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.companyId = localStorage.getItem('company_id')
    
    this.getFtp()
    // if(companyId){
      
    // }
  }


  clearDate(event) {
    event.stopPropagation();
    this.uploadedDate = null;
    this.getFtp()
  }

  changeUploadedDate() {
    this.getFtp()
  }

  getFtpData(event) {
    let value = (<HTMLInputElement>event.target).value;
    console.log(value,'value');
    this.getFtp()
    if (value) {
      this.searchString = value
      this.getFtp()

    } else {
      this.getFtp()
    }
  }

  // getUplodedFilesData() {
  //   let reqObj = {
  //     compnay_id: ''
  //   }
  //   this.healthservice.getFtpUploadedfiles(reqObj).subscribe(res => {
  //     this.ftpFilesData = res.data
  //   })
  // }


  getUplodedFilesData(formData) {
    this.spinner.show()
    this.healthservice.getFtpUploadedfiles(formData).subscribe((res) => {
      this.spinner.hide()
      this.ftpFilesData = res.data?.uploaded_files    
      this.length = res.data.total_count     
    },(err)=>{this.spinner.hide()})
  }

  getFtp() {
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)

    formData['ftpUploaddata'] = "true"
    formData['createdAt'] = this.uploadedDate
    formData['company_id']= this.companyId
    if(this.searchString != null){
      formData['created_by'] = this.searchString
    }
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getUplodedFilesData(formData)

  }

  public  sortEvent(event): void{
   
    if(this.sortvalue === event){
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    }else{
      this.sortDirection = 'ASC'
    }
    this.sortvalue = event
     
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    formData['company_id']= this.companyId
    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    formData['ftpUploaddata'] = "true"
    this.getUplodedFilesData(formData)
  }

  onPageEvent(event) {
    console.log(event, 'event');
    this.isDefault = false;
    this.pageEvent = event;
    this.getFtp()
  }


    backClicked() {
      this._location.back();
    }
  
    downloadFtpFile(ftpFile){
      const fileName = ftpFile?.file_name
      FileSaver.saveAs(`${this.imageBaseUrl}${encodeURIComponent(fileName)}`,`${fileName}`);
    }
}
