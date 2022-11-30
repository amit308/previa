import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {

  selectedLaboratory: any;
  action: string;
  user: any;
  userrole: string;
  laboratoryDetails:any;

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
    private router:Router) {
      this.user = JSON.parse(localStorage.getItem("user_details"))
      this.getLaboratory()
     }

  ngOnInit(): void {
   
  }

 
  
   //Api Integration Starts from here
   onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getLaboratory()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }


  getLaboratory(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getLaboratoryDetails(formData)
  
  }

  getLaboratoryDetails(formData){
    formData['companyId'] = this.user.company,
    formData['category'] = 'lab'
    this.adminService.getSubdivision(formData).subscribe((res)=>{
      console.log("hospitalDetails",res)
      this.laboratoryDetails = res.data.subDivisions
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
    this.getLaboratoryDetails(formData)
    // this.getAgentCounselors(formData)
  }



  public editLaboratory(Laboratory): void {
    this.selectedLaboratory = Laboratory;
    this.action="update";
    this.userrole = "lab"
    this.addUpdateLaboratory();
  }

  public addLaboratory():void{
    this.action="add";
    this.userrole = "lab"
    this.addUpdateLaboratory();
  }
  /* Add Country */
  public addUpdateLaboratory(): void {
    const data ={
      action: this.action,
        role:this.userrole,
        data: this.selectedLaboratory,
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
    //     data: this.selectedLaboratory,
    //   });
    // const dialogRef = this.dialog.open(
    //   AddSubdivisionComponent,
    //   dialogConfig
    // );
    // dialogRef.afterClosed().subscribe((data) => {
    //   console.log("Dialog output:", data);
    //   this.getLaboratory()
    //   // if (data.action === "add") {
    //   //   if (data.data != null) {
    //   //   }
    //   // } else {
    //   // }
    // });
  }

  deleteLaboratory(item){

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
          console.log("Laboratory",res)
          this.getLaboratory()
          Swal.fire(
            'Deleted!',
            'Laboratory Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }


}
