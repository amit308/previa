import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  selectedLocation: any;
  action: string;
  user: any;
  userrole: string;
  locationDetails:any;

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
    this.getLocation()
  }



  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getLocation()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }


  getLocation(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getLocationDetails(formData)
  
  }

  getLocationDetails(formData){
    formData['companyId'] = this.user.company,
    formData['category'] = 'location'
    this.adminService.getSubdivision(formData).subscribe((res)=>{
      console.log("locationDetails",res)
      this.locationDetails = res.data.subDivisions
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
    this.getLocationDetails(formData)
    // this.getAgentCounselors(formData)
  }


  public editLocation(Location): void {
    this.selectedLocation = Location;
    this.action="update";
    this.userrole = "location"
    this.addUpdateLocation();
  }

  public addLocation():void{
    this.action="add";
    this.userrole = "location"
    this.addUpdateLocation();
  }
  /* Add Country */
  public addUpdateLocation(): void {
    const data ={
      action: this.action,
        role:this.userrole,
        data: this.selectedLocation,
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
    //     data: this.selectedLocation,
    //   });
    // const dialogRef = this.dialog.open(
    //   AddSubdivisionComponent,
    //   dialogConfig
    // );
    // dialogRef.afterClosed().subscribe((data) => {
    //   console.log("Dialog output:", data);
    //   this.getLocation()
    //   // if (data.action === "add") {
    //   //   if (data.data != null) {
    //   //   }
    //   // } else {
    //   // }
    // });
  }

  deleteLocation(item){
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
          console.log("deleteadmin",res)
          this.getLocation()
          Swal.fire(
            'Deleted!',
            'location Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }


}



