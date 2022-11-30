import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-dailog',
  templateUrl: './company-dailog.component.html',
  styleUrls: ['./company-dailog.component.scss']
})
export class CompanyDailogComponent implements OnInit {
  companyForm:FormGroup = new FormGroup({
    // company: new FormControl(''),
    company_name: new FormControl(''),
    registration_no: new FormControl(''),
    registration_date: new FormControl(''),
    vat_no: new FormControl(''),
    pan_no: new FormControl(''),
    website: new FormControl(''),
    description:new FormControl('') 
  })
  selectedCompany: any;
  constructor( private readonly priviaService:HealthService,
    private dialogRef: MatDialogRef<CompanyDailogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.selectedCompany = data;
      console.log("selectedCompany",this.selectedCompany)
    }

  ngOnInit(): void {
    this.loadCompanyForm()
  }

  loadCompanyForm(){
    if(this.selectedCompany.action === "update"){
      this.companyForm.patchValue({
        company_name:this.selectedCompany.data.name,
        registration_no:this.selectedCompany.data.registrationNumber,
        registration_date:this.selectedCompany.data.registrationDate,
        vat_no:this.selectedCompany.data.VATNumber,
        pan_no:this.selectedCompany.data.PANNumber,
        website:this.selectedCompany.data.webSite,
        description:this.selectedCompany.data.description,
      })
    }
  }


  onsubmit(){
    const formData ={
      "name": this.companyForm.value.company_name,
      "registrationNumber": this.companyForm.value.registration_no,
      "registrationDate": this.companyForm.value.registration_date,
      "VATNumber": this.companyForm.value.vat_no,
      "PANNumber": this.companyForm.value.pan_no,
      "webSite": this.companyForm.value.website,
      "description": this.companyForm.value.description
    }
    if(this.selectedCompany.action === "add"){
    this.priviaService.addCompany(formData).subscribe((res)=>{
      console.log("res",res)
      if(res?.statusCode === 200){
       this.alertMessage(res)
      }
    })
  }else{
    this.priviaService.updateCompany(this.selectedCompany.data._id,formData).subscribe((res)=>{
      console.log("res",res)
      if(res?.statusCode === 200){
        this.alertMessage(res)
       }
      })
    }
  }

   alertMessage(res){
    Swal.fire({
      title:'WelCome!',
      text: `${res?.message}`,
      icon: 'success',
      confirmButtonText: 'ok'
     

    }).then(result=>{
       this.dialogRef.close()
    })
   }
  
  onClose(){
    this.dialogRef.close()
  }

}
