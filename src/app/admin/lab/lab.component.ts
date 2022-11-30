import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { AddLabEmployeesComponent } from '../dailog-componrnts/add-lab-employees/add-lab-employees.component';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {

  selectedLab: any;
  action: string;
  user: any;
  userrole: string;
  labDetails:any ;

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
    this.getLab()
  }

  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getLab()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }

  getLab(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData['role'] = "lab"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getLabDetails(formData)
  
  }

  getLabDetails(formData){
    this.healthservice.getAdmin(formData).subscribe((res)=>{
      console.log("labDetails",res)
      this.labDetails = res.data.users
      this.length = res.data.total_count
    })
  }



  public editLab(Lab): void {
    this.selectedLab = Lab;
    this.action="update";
    this.userrole = "lab"
    this.addUpdateLab();
  }

  public addLab():void{
    this.action="add";
    this.userrole = "lab"
    this.addUpdateLab();
  }
  /* Add Country */
  public addUpdateLab(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        role:this.userrole,
        data: this.selectedLab,
      });
    const dialogRef = this.dialog.open(
      AddLabEmployeesComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.getLab()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }

  deleteLab(item){
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
          // alert("Branch Has Been Deleted successfully")
          this.getLab()
          Swal.fire(
            'Deleted!',
            'Lab Has Been Deleted successfully.',
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
    formData['role'] = "lab"
    this.getLabDetails(formData)
  }


}


