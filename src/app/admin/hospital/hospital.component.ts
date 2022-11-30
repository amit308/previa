import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { AddSubdivisionComponent } from '../dailog-componrnts/add-subdivision/add-subdivision.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  selectedHospital: any;
  action: string;
  user: any;
  userrole: string;
  hospitalDetails:any;

   //pagination and api integration starts from here
   length = 100;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 50, 100];
   pageEvent: PageEvent;
   isDefault: boolean = true;
   sortDirection: string;
   sortvalue: any;
   //pagination code ends here
   searchValue:any = ''
  constructor(private dialog: MatDialog,
    private healthservice:HealthService,
    private adminService:AdminService,
    private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
    this.getHospital()
  }

 

   //Api Integration Starts from here
   onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getHospital()
  }


  getHospital(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getHospitalDetails(formData)
  
  }

  getHospitalDetails(formData){
    
    formData['companyId'] = this.user.company,
    formData['category'] = 'hospital'
    if(this.searchValue){
      formData['search'] = this.searchValue
    }
    this.adminService.getSubdivision(formData).subscribe((res)=>{
      this.hospitalDetails = res.data.subDivisions
      this.length = res.data.total_count
    })
  }
  
  public  sortEvent(event): void{
 
   
    if(this.sortvalue === event){
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    }else{
      this.sortDirection = 'ASC'
    }

    this.sortvalue = event
     
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    this.getHospitalDetails(formData)
    // this.getAgentCounselors(formData)
  }

  public editHospital(Hospital): void {
    this.selectedHospital = Hospital;
    this.action="update";
    this.userrole = "hospital"
    this.addUpdateHospital();
  }

  public addHospital():void{
    this.action="add";
    this.userrole = "hospital"
    this.addUpdateHospital();
  }
  /* Add Country */
  public addUpdateHospital(): void {
    const data ={
      action: this.action,
        role:this.userrole,
        data: this.selectedHospital,
    }
    localStorage.setItem("subdivision",JSON.stringify(data))

    this.router.navigateByUrl('/admin/add-subdivision')
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // (dialogConfig.width = ""),
    //   (dialogConfig.data = {
    //     action: this.action,
    //     role:this.userrole,
    //     data: this.selectedHospital,
    //   });
    // const dialogRef = this.dialog.open(
    //   AddSubdivisionComponent,
    //   dialogConfig
    // );
    // dialogRef.afterClosed().subscribe((data) => {
    //   console.log("Dialog output:", data);
    //   this.getHospital()
    //   // if (data.action === "add") {
    //   //   if (data.data != null) {
    //   //   }
    //   // } else {
    //   // }
    // });
  }

  deleteHospital(item){
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
        this.adminService.deleteSubdivision(item._id).subscribe((res)=>{
          console.log("Hospital",res)
          // alert("Branch Has Been Deleted successfully")
          this.getHospital()
          Swal.fire(
            'Deleted!',
            'Hospital Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }

  searchHospital(){

     if(this.searchValue.length > 1){
         this.getHospital()
     }
     if(!this.searchValue){
       this.getHospital()
     }

  }


}


