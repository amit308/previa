import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { AddLabEmployeesComponent } from '../dailog-componrnts/add-lab-employees/add-lab-employees.component';

@Component({
  selector: 'app-lab-technician',
  templateUrl: './lab-technician.component.html',
  styleUrls: ['./lab-technician.component.scss']
})
export class LabTechnicianComponent implements OnInit {

  
  selectedLabTechnician: any;
  action: string;
  user: any;
  userrole: string;
  labTechnicianDetails:any;

   //pagination and api integration starts from here
   length = 100;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 50, 100];
   pageEvent: PageEvent;
   isDefault: boolean = true;
   sortDirection: string;
   sortvalue: any;
   //pagination code ends here

  constructor(
    private dialog: MatDialog,
    private healthservice:HealthService,
    private authService:AuthService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
    this.getLabTechnician()
  }

  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getLabTechnician()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }

  getLabTechnician(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData['role'] = "lab-technician"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getLabTechnicianDetails(formData)
  
  }

  getLabTechnicianDetails(formData){
    this.healthservice.getAdmin(formData).subscribe((res)=>{
      console.log("LabTechnicianDetails",res)
      this.labTechnicianDetails = res.data.users
      this.length = res.data.total_count
    })
  }




  public editLabTechnician(LabTechnician): void {
    this.selectedLabTechnician = LabTechnician;
    this.action="update";
    this.userrole = "lab-technician"
    this.addUpdateLabTechnician();
  }

  public addLabTechnician():void{
    this.action="add";
    this.userrole = "lab-technician"
    this.addUpdateLabTechnician();
  }
  /* Add Country */
  public addUpdateLabTechnician(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        role:this.userrole,
        data: this.selectedLabTechnician,
      });
    const dialogRef = this.dialog.open(
      AddLabEmployeesComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.getLabTechnician()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }

  deleteLabTechnician(item){
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
          this.getLabTechnician()
          Swal.fire(
            'Deleted!',
            'Lab Technician Has Been Deleted successfully.',
            'success'
          )
        })
      }})

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
    formData['role'] = "lab-technician"
    this.getLabTechnicianDetails(formData)
  }
  resendPassword(data){
    Swal.fire({
      title: 'Are you sure want send password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        this.authService.reSendPassword({userId:data._id}).subscribe((res :any) =>{
          this.spinner.hide()
          Swal.fire(res.message)
        },
        (err)=>{
         this.spinner.hide()
        }
        )
      }})
   
  }

}

