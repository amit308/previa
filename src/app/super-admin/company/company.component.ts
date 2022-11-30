import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { CompanyDailogComponent } from '../comonents/company-dailog/company-dailog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  selectedCompany: any;
  action: string;
  companyDetails: any;

  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  //pagination code ends here

  constructor(private dialog: MatDialog,private HealthService:HealthService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getComapny()
  }

//Api Integration Starts from here
onPageEvent(event) {
  this.isDefault = false;
  this.pageEvent = event;
  this.getComapny()
}

getComapny(){
  let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
  if(this.sortvalue){
    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
  }
  this.getComapnyDetails(formData)

}

getComapnyDetails(formData){
  this.HealthService.getCompany(formData).subscribe((res)=>{
    console.log("res",res)
    this.companyDetails  = res.data.companies
    this.length = res.data.total_count
  })
}
public  sortEvent(event): void{
  console.log("event",event,this.sortDirection)
 
  if(this.sortvalue === event){
    this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
  }else{
    this.sortDirection = 'ASC'
  }
  console.log("sirtdirction",this.sortDirection)
  this.sortvalue = event
   
  let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
  
  formData["sortBy"] = this.sortvalue
  formData["sortOrder"] = this.sortDirection
  this.getComapnyDetails(formData)
}
  public editCompany(Company): void {
    this.selectedCompany = Company;
    this.action="update";
    this.addUpdateCompany();
  }

  public addCompany():void{
    this.action="add";
    this.addUpdateCompany();
  }
  /* Add Country */
  public addUpdateCompany(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "550px"),
      (dialogConfig.data = {
        action: this.action,
        data: this.selectedCompany,
      });
    const dialogRef = this.dialog.open(
      CompanyDailogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      this.getComapny()
      console.log("Dialog output:", data);
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }
   deleteCompany(item){
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.HealthService.deleteCompany(item._id).subscribe(res=>{
          console.log("deleteres",res)
          this.getComapny()
          Swal.fire(
            'Deleted!',
            'Comapny Has Been Deleted successfully.',
            'success'
          )
        })
      }})
  }


}
