import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { DoctorMasterComponent } from '../doctor-master.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  selectedDoctor: any;
  action: string;
  user: any;
  userrole: string;
  doctorDetails:any;

   //pagination and api integration starts from here
   length = 100;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 50, 100];
   pageEvent: PageEvent;
   isDefault: boolean = true;
   sortDirection: string;
   sortvalue: any;
   //pagination code ends here

  constructor(private dialog: MatDialog,
    private healthservice:HealthService,
    private adminService:AdminService,
    private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
    this.getDoctor()
  }

  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getDoctor()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }

  getDoctor(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData['role'] = "doctor"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getDoctorDetails(formData)
  
  }

  getDoctorDetails(formData){
    this.healthservice.getAdmin(formData).subscribe((res)=>{
      console.log("labInchargeDetails",res)
      this.doctorDetails = res.data.users
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
    formData['role'] = "doctor"
    this.getDoctorDetails(formData)
    // this.getAgentCounselors(formData)
  }


  public editDoctor(Doctor): void {
    this.selectedDoctor = Doctor;
    this.action="update";
    this.userrole = "doctor"
    this.addUpdateDoctor();
    
  }

  public addDoctor():void{
    this.action="add";
    this.userrole = "doctor"
    this.addUpdateDoctor();
  }
  /* Add Country */
  public addUpdateDoctor(): void {
    const data ={
      action: this.action,
        role:this.userrole,
        data: this.selectedDoctor,
    }
    localStorage.setItem("doctor",JSON.stringify(data))

    this.router.navigateByUrl('/admin/doctor-master')
  }

  deleteDoctor(item){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.healthservice.deleteUser(item._id).subscribe((res)=>{
          console.log("deleteadmin",res)
          // alert("Branch Has Been Deleted successfully")
          this.getDoctor()
          Swal.fire(
            'Deleted!',
            'Doctor Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }


}




