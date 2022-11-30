import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { AddOrganizationAdminComponent } from '../dailog-componrnts/add-organization-admin/add-organization-admin.component';

@Component({
  selector: 'app-organization-admin',
  templateUrl: './organization-admin.component.html',
  styleUrls: ['./organization-admin.component.scss']
})
export class OrganizationAdminComponent implements OnInit {
  selectedOrganization: any;
  action: string;
  user: any;
  userrole: string;
  frontOfficeDetails:any;

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
    private dialog: MatDialog,private healthservice:HealthService ,  
     private authService:AuthService,
     private spinner: NgxSpinnerService,
     ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
    this.getOrgAdmin()
  }

  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getOrgAdmin()
  }

  getOrgAdmin(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    formData['role'] = "org-admin"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    // debugger;

    this.GetOrganizationAdmins(formData)
  
  }

  GetOrganizationAdmins(formData){
    this.healthservice.getAdmin(formData).subscribe((res)=>{
      this.frontOfficeDetails = res.data.users
      this.length = res.data.total_count
    })
  }

  public editOrgAdmin(FrontOffice): void {
    this.selectedOrganization = FrontOffice;
    this.action="update";
    this.userrole = "organization-admin"
    this.addUpdateOrganization();
  }

  public addOrganization():void{
    this.action="add";
    this.userrole = "organization-admin"
    this.addUpdateOrganization();
  }
  /* Add Country */
  public addUpdateOrganization(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        role:this.userrole,
        data: this.selectedOrganization,
      });
    const dialogRef = this.dialog.open(
      AddOrganizationAdminComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      this.getOrgAdmin()
    });
  }

  deleteOrgAdmin(item){
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
        this.spinner.show()
        this.healthservice.deleteUser(item._id).subscribe((res)=>{
          this.spinner.hide()
          this.getOrgAdmin()
          Swal.fire(
            'Deleted!',
            'Organization Admin Has Been Deleted successfully.',
            'success'
          )
        },
        (err)=>{
          this.spinner.hide()
        }
        )
      }})

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
    formData['role'] = "org-admin"
    this.GetOrganizationAdmins(formData)
    // this.getAgentCounselors(formData)
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

