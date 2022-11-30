import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  selectedBranch: any;
  action: string;
  user: any;
  userrole: string;
  branchDetails:any;

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
    private spinner:NgxSpinnerService,
    private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
    this.getBranch()
  }

  
  
   //Api Integration Starts from here
   onPageEvent(event) {
     
    this.isDefault = false;
    this.pageEvent = event;
    this.getBranch()
  }


  getBranch(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getBranchDetails(formData)
  
  }

  getBranchDetails(formData){
    
    formData['companyId'] = this.user.company,
    formData['category'] = 'branch'
    this.adminService.getSubdivision(formData).subscribe((res)=>{
      this.branchDetails = res.data.subDivisions
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
    this.getBranchDetails(formData)
    // this.getAgentCounselors(formData)
  }



  public editBranch(Branch): void {
    this.selectedBranch = Branch;
    this.action="update";
    this.userrole = "branch"
    this.addUpdateBranch();
  }

  public addBranch():void{
    this.action="add";
    this.userrole = "branch"
    this.addUpdateBranch();
  }
  /* Add Country */
  public addUpdateBranch(): void {
    const data ={
      action: this.action,
        role:this.userrole,
        data: this.selectedBranch,
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
    //     data: this.selectedBranch,
    //   });
    // const dialogRef = this.dialog.open(
    //   AddSubdivisionComponent,
    //   dialogConfig
    // );
    // dialogRef.afterClosed().subscribe((data) => {
    //   console.log("Dialog output:", data);
    //   this.getBranch()
    //   // if (data.action === "add") {
    //   //   if (data.data != null) {
    //   //   }
    //   // } else {
    //   // }
    // });
  }

  deleteBranch(item){
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
        this.adminService.deleteSubdivision(item._id).subscribe((res)=>{
          this.spinner.hide()
          this.getBranch()
          Swal.fire(
            'Deleted!',
            'Your Branch has been deleted.',
            'success'
          )
        } ,(err)=>{this.spinner.hide()})
      }})


  }


}




