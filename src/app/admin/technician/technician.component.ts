import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.scss']
})
export class TechnicianComponent implements OnInit {
  technicianForm: FormGroup;
  title_name: string
  technicianDetails:any;
  technician_info: any = []
  submitted = false;
  constructor(
    private fb:FormBuilder, 
    private service:AdminService ,
    private  router:Router,
    private spinner:NgxSpinnerService
    ) { 
    this.technicianForm = this.fb.group({
      category: [{value:this.technicianDetails?.role,disabled:true},],
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
      mobileNumber: ['',  Validators.required],
      street: [''],
      city: [''],
      state: [''],
      // pin: ['', Validators.required],
      pin: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      country: [''],
      password: [''],
      subdivision: [''],
      department: [''],
      role: [''],
    })
    this.technicianDetails = JSON.parse(localStorage.getItem("Technician"))
    this.lodform()
  }
 
  get l() { return this.technicianForm.controls; }
 
 
  lodform(){
    if(this.technicianDetails?.action === "update"){
      this.technicianForm.patchValue({
       
        name: this.technicianDetails?.data.name,
        email: this.technicianDetails?.data.emailAddress,
        mobileNumber: this.technicianDetails?.data.mobileNumber,
        city: this.technicianDetails?.data?.address?.city,
        state: this.technicianDetails?.data?.address?.state,
        pin: this.technicianDetails?.data?.address?.pin,
        country: this.technicianDetails?.data?.address?.country,
        street: this.technicianDetails?.data?.address?.street,
       
      })
    }else{
      
    }
  }



  submitTechnician(){
    this.submitted = true;
    if (this.technicianForm.invalid) {
      return;
  }
    const formData = {
     
      name: this.technicianForm.value.name,
      emailAddress: this.technicianForm.value.email,
      mobileNumber:`${ this.technicianForm.value.mobileNumber}`,
      password: this.technicianForm.value.password,
      subdivision : this.technicianForm.value.subdivision || '',
      department: this.technicianForm.value.department || '',
      role: "dd-technician",
      address:{
        country: this.technicianForm.value.country || '',
        state: this.technicianForm.value.state || '',
        city: this.technicianForm.value.city || '',
        place: this.technicianForm.value.place || '',
        street: this.technicianForm.value.street || '',
        pin: this.technicianForm.value.pin || '',
        zone: this.technicianForm.value.zone || '',
        email: this.technicianForm.value.email || '',
        mobile: this.technicianForm.value.mobile || '',
        fax: this.technicianForm.value.fax || '',
        phone1: this.technicianForm.value.phone1 || '',
        phone2: this.technicianForm.value.phone2 || '',
        website: this.technicianForm.value.website || ''
  
      },
     
    }
    if(this.technicianDetails?.action === "add"){
      this.spinner.show()
      this.service.technicianData(formData).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          this.technicianForm.reset();
          Swal.fire(resp.message);
          this.router.navigateByUrl('/admin/technicianList')
        }
      },(err)=>{this.spinner.hide()})
  }else{
    delete  formData.password
    this.spinner.show()
    this.service.technicianUpdate(this.technicianDetails?.data?._id,formData).subscribe((resp) => {
      this.spinner.hide()
      if (resp.statusCode == 200) {
        this.router.navigateByUrl('/admin/technicianList')
        this.technicianForm.reset();
        
        Swal.fire(resp.message);
      }
    },(err)=>{this.spinner.hide()})
  }
  
  }

  ngOnInit(): void {
    this.dynamicFormValidation()
  }

  checkIfNumber(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/) || this.technicianForm.value.mobileNumber?.length == 10){
      e.preventDefault();
    }
  }

  dynamicFormValidation() {
    const pForm = this.technicianForm
    const tempArray = ["", null, undefined]
    tempArray.includes(pForm.value.mobileNumber) ? (pForm.get('mobileNumber').clearValidators(), pForm.get('mobileNumber').updateValueAndValidity()) : (pForm.get('mobileNumber').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]), pForm.get('mobileNumber').updateValueAndValidity());
    // tempArray.includes(pForm.value.pin) ? (pForm.get('pin').clearValidators(), pForm.get('pin').updateValueAndValidity()) : (pForm.get('pin').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]), pForm.get('pin').updateValueAndValidity());   
  }

}