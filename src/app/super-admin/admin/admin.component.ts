import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { AdminDailogComponent } from '../comonents/admin-dailog/admin-dailog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  selectedAdmin: any;
  action: string;
  user: any;
  admindetails: any;
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
    this.getAdmin()
  }

  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getAdmin()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }

  getAdmin(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData['role'] = "admin"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getAdminDetails(formData)
  
  }

  getAdminDetails(formData){
    this.healthservice.getAdmin(formData).subscribe((res)=>{
      console.log("admin",res)
      this.admindetails = res.data.users
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
    formData['role'] = "admin"
    this.getAdminDetails(formData)
  }


  // getAdmin(){
  //   const formdata= {
  //     start:0,
  //     limit:10,
  //     // id:this.user._id,
  //     role:"admin"
  //   }
  //   this.healthservice.getAdmin(formdata).subscribe((res)=>{
  //     console.log("admin",res)
  //     this.admindetails = res.data.users
  //   })
  // }


  public editAdmin(Admin): void {
    this.selectedAdmin = Admin;
    this.action="update";
    this.addUpdateAdmin();
  }

  public addAdmin():void{
    this.action="add";
    this.addUpdateAdmin();
  }
  /* Add Country */
  public addUpdateAdmin(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        data: this.selectedAdmin,
      });
    const dialogRef = this.dialog.open(
      AdminDailogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.getAdmin()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }

  deleteAdmin(item){
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
        this.healthservice.deleteUser(item._id).subscribe((res)=>{
          console.log("deleteadmin",res)
          this.getAdmin()
          Swal.fire(
            'Deleted!',
            'User Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }


}
