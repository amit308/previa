import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';

@Component({
  selector: 'app-referral-patients',
  templateUrl: './referral-patients.component.html',
  styleUrls: ['./referral-patients.component.scss']
})
export class ReferralPatientsComponent implements OnInit {
  isShown=false
   
  referralPatientsData: any
  userDetails: any

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

  constructor(
    private healthService: HealthService,
    private spinner:NgxSpinnerService
  ) { this.spinner.hide() }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    // this.loadReferralPatients()
    this.getReferral()
  }


  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getReferral()
    console.log("page", this.pageEvent?.pageIndex, this.pageEvent?.pageSize)
  }

  getReferral() {
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)

    // formData['role'] = ""
    // formData['id'] = this.userDetails?._id
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.loadReferralPatients(formData)

  }


  loadReferralPatients(formData){   
  
    // this.userDetails?._id

    this.healthService.getReferralPatients(formData,this.userDetails?._id).subscribe(res=>{
      this.referralPatientsData = res.data?.patientTests
      console.log(this.referralPatientsData,'data');
      
    })
  }

}
