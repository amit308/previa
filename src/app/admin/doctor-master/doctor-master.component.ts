import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { ChangeDetectorRef,AfterContentChecked} from '@angular/core'
import { Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-doctor-master',
  templateUrl: './doctor-master.component.html',
  styleUrls: ['./doctor-master.component.scss']
})
export class DoctorMasterComponent implements OnInit {
  public countries = [
    {id: 1,name: 'Albania',},
    {id: 2,name: 'Belgium',},
    {id: 3,name: 'usa',},
    {id: 4,name: 'Montenegro',},
    {id: 5,name: 'Turkey',},
    {id: 6,name: 'Ukraine',},
    {id: 7,name: 'Macedonia',},
    {id: 8,name: 'Slovenia',},
    {id: 9,name: 'Georgia',},
    {id: 10,name: 'India',},
    {id: 11,name: 'Russia',},
    {id: 12,name: 'Switzerland'}
  ];
  options = [
    {name:"inactive" , value:"inactive"},
    {name:"Special Discount Applicable", value:"specialDiscountApplicable"},
    {name:"Upload Results", value:"uploadResults"},
    {name:"Stop Reporting Printing", value:"stopReportingPrinting"},
    {name:"No SMS", value:"noSMS"},
    {name:"NO Email", value:"noEmail"},
    {name:"Out Source Tests", value:"outSourceTests"},
    {name:"Ignore Credit Bill", value:"ignoreCreditLimit"},
    {name:"Month wise Commisiion", value:"monthWiseCommission"},
    {name:"Critical value SMS", value:"criticalValueSMS"},
    {name:"Preffered Doctor", value:"preferredDoctor"}
  ]

  foods: Food[] = [
    {value: 'testing', viewValue: 'Testing1'},
    {value: 'testing', viewValue: 'Testing2'},
    {value: 'testing', viewValue: 'Testing3'}
  ];
   
  doctorForm:FormGroup;
  doctorDetails: any;

  constructor(private fb:FormBuilder,
    private readonly adminService:AdminService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private ref: ChangeDetectorRef) {
    this.doctorDetails = JSON.parse(localStorage.getItem("doctor"))
    this.loadDoctorRegistrationForm()

   }

  ngOnInit(): void {
   
  }


  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

//   ngAfterContentChecked() : void {
//     this.changeDetector.detectChanges();
// }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem("doctor")
  }

  loadDoctorRegistrationForm(){
    this.doctorForm = this.fb.group({
      name: [null],
      emailAddress: [null],
      mobileNumber: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] ] ,
      qualification: [null],

      specialization: [null],
      region: [null],
      marketingExecutive: [null],
      defaultProfile: [null],
      remarks: [null],
      contactPerson: [null],
      contactNumber: [null],
      priceSchema: [null],
      packages: [null],
      DOB: [null],
      anniversaryDate: [null],
      creditLimit: [null],
      targetAmount: [null],
      advanceAmount: [null],

      country: [null],
      state: [null],
      city: [null],
      place: [null],
      street: [null],
      pin: [null],
      zone: [null],
      email: [null],
      mobile: [null],
      fax: [null],
      phone1: [null],
      phone2: [null],
      website: [null],
              
      inactive: [false],
      specialDiscountApplicable: [false],
      uploadResults: [false],
      stopReportingPrinting: [false],
      noSMS: [false],
      noEmail: [false],
      outSourceTests: [false],
      ignoreCreditLimit: [false],
      monthWiseCommission: [false],
      criticalValueSMS: [false],
      preferredDoctor: [false],
      preferredDoctorStaff: [null],

      sms: [false],
      webemail: [false],
      reset:[false]
        })
        this.loadform()
  
}
get f(){  
  return this.doctorForm.controls;  
 
}  
  loadform(){
    if(this.doctorDetails?.action === "update"){
      this.doctorForm.patchValue({
            name: this.doctorDetails.data.name,
            emailAddress: this.doctorDetails.data.emailAddress,
            mobileNumber: this.doctorDetails.data.mobileNumber,
            qualification: this.doctorDetails.data.qualification,

            specialization: this.doctorDetails.data.details.specialization,
            region: this.doctorDetails.data.details.region,
            marketingExecutive: this.doctorDetails.data.details.marketingExecutive,
            defaultProfile: this.doctorDetails.data.details.defaultProfile,
            remarks: this.doctorDetails.data.details.remarks,
            contactPerson: this.doctorDetails.data.details.contactPerson,
            contactNumber: this.doctorDetails.data.details.contactNumber,
            priceSchema: this.doctorDetails.data.details.priceSchema,
            packages: this.doctorDetails.data.details.packages,
            DOB: this.doctorDetails.data.details.DOB,
            anniversaryDate: this.doctorDetails.data.details.anniversaryDate,
            creditLimit: this.doctorDetails.data.details.creditLimit,
            targetAmount: this.doctorDetails.data.details.targetAmount,
            advanceAmount: this.doctorDetails.data.details.advanceAmount,

            country: this.doctorDetails.data.address.country,
            state: this.doctorDetails.data.address.state,
            city: this.doctorDetails.data.address.city,
            place: this.doctorDetails.data.address.place,
            street: this.doctorDetails.data.address.street,
            pin: this.doctorDetails.data.address.pin,
            zone: this.doctorDetails.data.address.zone,
            email: this.doctorDetails.data.address.email,
            mobile: this.doctorDetails.data.address.mobile,
            fax: this.doctorDetails.data.address.fax,
            phone1: this.doctorDetails.data.address.phone1,
            phone2: this.doctorDetails.data.address.phone2,
            website: this.doctorDetails.data.address.website,
                    
            inactive: this.doctorDetails.data.settings.inactive,
            specialDiscountApplicable: this.doctorDetails.data.settings.specialDiscountApplicable,
            uploadResults: this.doctorDetails.data.settings.uploadResults,
            stopReportingPrinting: this.doctorDetails.data.settings.stopReportingPrinting,
            noSMS: this.doctorDetails.data.settings.noSMS,
            noEmail: this.doctorDetails.data.settings.noEmail,
            outSourceTests: this.doctorDetails.data.settings.outSourceTests,
            ignoreCreditLimit: this.doctorDetails.data.settings.ignoreCreditLimit,
            monthWiseCommission: this.doctorDetails.data.settings.monthWiseCommission,
            criticalValueSMS: this.doctorDetails.data.settings.criticalValueSMS,
            preferredDoctor: this.doctorDetails.data.settings.preferredDoctor,
            preferredDoctorStaff: this.doctorDetails.data.settings.preferredDoctorStaff,

            sms: this.doctorDetails.data.webPass.sms,
            webemail: this.doctorDetails.data.webPass.email,
            reset:this.doctorDetails.data.webPass.reset
      })
    }
  }
  clearForm(){
    this.doctorDetails =  localStorage.removeItem("doctor")
    this.loadDoctorRegistrationForm()
  }
 public onSubmit():void{

   const formdata ={
      name: this.doctorForm.value.name,
      emailAddress: this.doctorForm.value.emailAddress,
      mobileNumber: this.doctorForm.value.mobileNumber,
      qualification:this.doctorForm.value.qualification,
      subdivision:'hospital',
      subdivision_id:'60e54b0351e351fd0bc5de83',
      details: {
      specialization: this.doctorForm.value.specialization,
      region: this.doctorForm.value.region,
      marketingExecutive: this.doctorForm.value.marketingExecutive,
      defaultProfile: this.doctorForm.value.defaultProfile,
      remarks: this.doctorForm.value.remarks,
      contactPerson: this.doctorForm.value.contactPerson,
      contactNumber: this.doctorForm.value.contactNumber,
      priceSchema: this.doctorForm.value.priceSchema,
      packages: this.doctorForm.value.packages,
      DOB: this.doctorForm.value.DOB,
      anniversaryDate: this.doctorForm.value.anniversaryDate,
      creditLimit: this.doctorForm.value.creditLimit,
      targetAmount: this.doctorForm.value.targetAmount,
      advanceAmount: this.doctorForm.value.advanceAmount,
    },
    address:{
      country: this.doctorForm.value.country,
      state: this.doctorForm.value.state,
      city: this.doctorForm.value.city,
      place: this.doctorForm.value.place,
      street: this.doctorForm.value.street,
      pin: this.doctorForm.value.pin,
      zone: this.doctorForm.value.zone,
      email: this.doctorForm.value.email,
      mobile: this.doctorForm.value.mobile,
      fax: this.doctorForm.value.fax,
      phone1: this.doctorForm.value.phone1,
      phone2: this.doctorForm.value.phone2,
      website: this.doctorForm.value.website,
    },

    settings:{  
      inactive: this.doctorForm.value.inactive,
      specialDiscountApplicable: this.doctorForm.value.specialDiscountApplicable,
      uploadResults: this.doctorForm.value.uploadResults,
      stopReportingPrinting: this.doctorForm.value.stopReportingPrinting,
      noSMS: this.doctorForm.value.noSMS,
      noEmail: this.doctorForm.value.noEmail,
      outSourceTests: this.doctorForm.value.outSourceTests,
      ignoreCreditLimit: this.doctorForm.value.ignoreCreditLimit,
      monthWiseCommission: this.doctorForm.value.monthWiseCommission,
      criticalValueSMS: this.doctorForm.value.criticalValueSMS,
      preferredDoctor: this.doctorForm.value.preferredDoctor,
      preferredDoctorStaff: [this.doctorForm.value.preferredDoctorStaff ],
    },

    webPass:{
      sms: this.doctorForm.value.sms,
      email: this.doctorForm.value.webemail,
      reset:this.doctorForm.value.reset

    }
  }
  if(this.doctorDetails?.action === "update"){
    this.spinner.show()
    this.adminService.updateDoctor(this.doctorDetails.data._id,formdata).subscribe((res)=>{
      this.spinner.hide()
      if(res.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
          this.router.navigateByUrl('/admin/doctors')
        })
      }
      localStorage.removeItem("doctor")
    },(err)=>{
      this.spinner.hide()
    })
  }else{
    this.spinner.show()
    this.adminService.addDoctorMaster(formdata).subscribe((res)=>{
      this.spinner.hide()
      if(res.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
          this.router.navigateByUrl('/admin/doctors')
        })
      }
      localStorage.removeItem("doctor")
    },(err)=>{
      this.spinner.hide()
    })
  }
 
  console.log("form",formdata)


  }



  checkIfNumber1(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/) || this.doctorForm.value.mobile?.length == 10)
      e.preventDefault();
  }

  checkIfNumber2(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/) || this.doctorForm.value.phone1?.length == 10)
      e.preventDefault();
  }

  checkIfNumber3(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/) || this.doctorForm.value.pin?.length == 6){
      e.preventDefault();
    }
  }
  checkIfNumber4(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/) || this.doctorForm.value.phone2?.length == 10){
      e.preventDefault();
    }
  }

  checkIfNumber5(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/) || this.doctorForm.value.contactNumber?.length == 10){
      e.preventDefault();
    }
  }
  checkIfNumber6(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/) || this.doctorForm.value.mobileNumber?.length == 10){
      e.preventDefault();
    }
  }


}
