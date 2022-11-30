import { digest } from '@angular/compiler/src/i18n/digest';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dailog',
  templateUrl: './admin-dailog.component.html',
  styleUrls: ['./admin-dailog.component.scss']
})
export class AdminDailogComponent implements OnInit {
  AdminFormGroup:FormGroup
  selectedAdmin: any;
  companyDetails: any;
  constructor(private fb:FormBuilder,
    private readonly HealthService:HealthService,
    private adminService:AdminService,
    private dialogRef: MatDialogRef<AdminDailogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.selectedAdmin = data;
    this.AdminFormGroup = this.fb.group({
       name:[""],
       emailAddress:[""],
       mobileNumber:[""],
       password:[""],
       company:[""]

    })
  }

  ngOnInit(): void {
    this.getComapny()
    this.loadcompanyform()
  }

  loadcompanyform(){
    if(this.selectedAdmin.action === "update"){
      this.AdminFormGroup.patchValue({
        name : this.selectedAdmin.data.name,
       emailAddress: this.selectedAdmin.data.emailAddress,
       mobileNumber: this.selectedAdmin.data.mobileNumber,
       company:this.selectedAdmin.data.company
      })
    }
  }

  public getComapny(): void{
    const data ={}
    this.HealthService.getCompany(data).subscribe((res)=>{
      console.log("res",res)
      this.companyDetails  = res.data.companies
    })
  }

  get o(){ return this.AdminFormGroup.controls}
  addAdmin(){
    console.log("form",this.AdminFormGroup.value)
    const formData = {
      "name": this.AdminFormGroup.value.name,
      "emailAddress": this.AdminFormGroup.value.emailAddress,
      "mobileNumber": this.AdminFormGroup.value.mobileNumber.toString(),
      "password": this.AdminFormGroup.value.password,
      "company": this.AdminFormGroup.value.company
    }
    this.HealthService.addAdmin(formData).subscribe((res)=>{
      console.log("admin",res)
      if(res?.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
           this.dialogRef.close()
        })
      }
    })
    
  }
  updateAdmin(){
    const formData = {
      "name": this.AdminFormGroup.value.name,
      "emailAddress": this.AdminFormGroup.value.emailAddress,
      "mobileNumber": this.AdminFormGroup.value.mobileNumber.toString(),
      // "password": this.AdminFormGroup.value.password,
      "company": this.AdminFormGroup.value.company,
      // "role": "admin"
    }
    this.HealthService.updateAdmin(this.selectedAdmin.data._id,formData).subscribe((res)=>{
      console.log("FrontOffice",res)
      if(res.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
          this.dialogRef.close()
        })
      }
      
    })
  }
  onClose(){
    this.dialogRef.close()
  }

}
