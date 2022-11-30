import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { AddTestPackagesComponent } from '../dailog-componrnts/add-test-packages/add-test-packages.component';

@Component({
  selector: 'app-test-packages',
  templateUrl: './test-packages.component.html',
  styleUrls: ['./test-packages.component.scss']
})
export class TestPackagesComponent implements OnInit {

 
  selectedtestPackages: any;
  action: string;
  user: any;
  testPackagesDetails:any;

   //pagination and api integration starts from here
   length = 100;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 50, 100];
   pageEvent: PageEvent;
   isDefault: boolean = true;
   sortDirection: string;
   sortvalue: any;
   //pagination code ends here

  constructor(private dialog: MatDialog,private healthservice:HealthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
    this.gettestPackages()
  }

    //Api Integration Starts from here
    onPageEvent(event) {
      this.isDefault = false;
      this.pageEvent = event;
      this.gettestPackages()
      console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
    }
  
    gettestPackages(){
      let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
      
      if(this.sortvalue){
        formData["sortBy"] = this.sortvalue
        formData["sortOrder"] = this.sortDirection
      }
      this.gettestPackagesDetails(formData)
    
    }
  
    gettestPackagesDetails(formData){
      this.healthservice.getTestPackages(formData).subscribe((res)=>{
        //     console.log("testPackagesDetails",res)
            this.testPackagesDetails = res.data.packages
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
      this.gettestPackagesDetails(formData)
    }


  public edittestPackages(testPackages): void {
    this.selectedtestPackages = testPackages;
    this.action="update";
    this.addUpdatetestPackages();
  }

  public addtestPackages():void{
    this.action="add";
    this.addUpdatetestPackages();
  }
  /* Add Country */
  public addUpdatetestPackages(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        data: this.selectedtestPackages,
      });
    const dialogRef = this.dialog.open(
      AddTestPackagesComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.gettestPackages()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }

  deletetestPackages(item){
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
        this.healthservice.deleteTestPackages(item._id).subscribe((res)=>{
          console.log("deleteadmin",res)
          // alert("Branch Has Been Deleted successfully")
          this.gettestPackages()
          Swal.fire(
            'Deleted!',
            'test-Package Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }


}


