import { validateVerticalPosition } from '@angular/cdk/overlay';
import { formatPercent } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { switchAll } from 'rxjs/operators';

import { AuthService } from 'src/app/service/auth.service';
import { BroadcastService } from 'src/app/service/broadcast.service';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  registerForm: FormGroup;
  vaccineRegisterForm: FormGroup;
  errorMsg = '';
  return: string;
  user: string;
  showVerify: Boolean = false;
  showVerifyotp: Boolean = false;
  signupVerifyOtpForm: FormGroup;
  signinVerifyOtpForm: FormGroup;
  date_of_birth: any;
  isSubmit: Boolean = false;

  issubmitted = false;
  submitted = false;
  orgOTP: string;
  dialog: any;
  hideMobile: Boolean = false;
  userRole: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private broadcastservice: BroadcastService,
    private fb: FormBuilder,
    private cdref: ChangeDetectorRef,
    private spinner:NgxSpinnerService 
  ) {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    if (userDetails) {
      const ROLE = userDetails?.role;
      const routingUrl =
        ROLE == 'admin'
          ? '/admin/hospital'
          : ROLE == 'super-admin'
          ? 'super-admin/company'
          : ROLE == 'org-admin'
          ? '/admin/patient'
          : ROLE == 'labl'
          ? '/privia/dashboard'
          : ROLE == 'front-office'
          ? '/admin/patient'
          : ['lab', 'lab-incharge', 'lab-technician'].includes(ROLE)
          ? '/admin/test-result'
          : '';
      this.router.navigateByUrl(routingUrl);
    }
    this.vaccineRegisterForm = this.fb.group({
      userName: ['', Validators.required],
      email_Address: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      mobileNumber: ['', Validators.required],
      aadhaar: ['', Validators.required],
      organization: [''],
      address: ['', Validators.required],
      date_of_birth: [''],
      gender: ['', Validators.required],
      dose: ['', Validators.required],
      vaccineName: ['', Validators.required],
      noOfPersons: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.authService.user.emit("user")
    this.signupVerifyOtp();
    this.signinVerifyOtp();
    this.registerForm = new FormGroup({
      mobileNo: new FormControl(''),
      email: new FormControl('' , [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      // otp: new FormControl('', Validators.required),
    });

  
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(true),
      // otp: new FormControl('', Validators.required)
    });
  }

  get l() {
    return this.vaccineRegisterForm.controls;
  }
  get sin() {
    return this.registerForm.controls;
  }
  get sinr() {
    return this.vaccineRegisterForm.controls;
  }

  clearForm() {
    this.vaccineRegisterForm.reset({
      userName: [''],
      email_Address: [''],
      mobileNumber: [''],
      aadhaar: [''],
      organization: [''],
      address: [''],
      date_of_birth: [''],
      gender: [''],
      dose: [''],
      noOfPersons: [''],
      vaccineName: [''],
    });
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    // this.autoSignIn();
    // })
  }

  ngOnDestroy() {
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }

  signin() {
    this.isSubmit = true;
    this.signinForm.get('username').setValidators([Validators.required]);
    this.signinForm.get('username').updateValueAndValidity();
    this.signinForm.get('password').setValidators([Validators.required]);
    this.signinForm.get('password').updateValueAndValidity();
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }
    localStorage.clear()
    const signinData = this.signinForm.value;

    const formData = {
      emailAddress: this.signinForm.value.username,
      password: this.signinForm.value.password,
    };

    this.progressBar.mode = 'indeterminate';
    this.spinner.show()
    this.authService.signIn(formData).subscribe((res) => {
      if (res.statusCode == 200) {
        if(res.data.user.role === 'dd-technician' || res.data.user.role === 'rider'){
          this.spinner.hide()
           Swal.fire({
            text: 'Invalid Credentials',
            icon: 'warning',
            confirmButtonText: 'ok'
          })
          return
        }
        localStorage.setItem('user_token', res.data.access_token);
        localStorage.setItem('user_details', JSON.stringify(res.data.user));
        if (res.data.user.role === 'admin') {
          this.router.navigateByUrl('/admin/management');
        } else if (res.data.user.role === 'super-admin') {
          this.router.navigateByUrl('/super-admin/company');
        } else if (res.data.user.role === 'labl') {
          this.router.navigateByUrl('/privia/dashboard');
        } else if (res.data.user.role === 'front-office') {
          this.router.navigateByUrl('/admin/patient'); 
        } else if (
          res.data.user.role === 'lab' ||
          res.data.user.role === 'lab-incharge' ||
          res.data.user.role === 'lab-technician'
        ) {
          this.router.navigateByUrl('/admin/test-result');
        }
        else if(res.data.user.role === 'doctor'){
          this.router.navigateByUrl('/admin/referral-patients');
         }
        else if(res.data.user.role === 'org-admin'){
          this.router.navigateByUrl('/admin/patient');
         }
         else if(res.data.user.role === 'patient'){
          this.router.navigateByUrl('/patient/dashboard');
         }
        this.broadcastservice.loginData.emit(true);
      } else {
        this.spinner.hide()
        alert('Mismatch Username And Password ');
      }
    });
    // else{

    //   this.submitButton.disabled = false;
    //   this.progressBar.mode = 'determinate';
    //   // this.errorMsg = err.message;
    //   // console.log(err);
    // }
  }

  checkIfNumber(e) {
    e = e || window.event;
    var charCode = typeof e.which == 'undefined' ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (
      !charStr.match(/^[0-9]+$/) ||
      this.vaccineRegisterForm.value.mobileNumber?.length == 10
    ){
      e.preventDefault();

    }else{
      if(this.registerForm.value.mobileNo && !this.registerForm.value.email){
        this.registerForm.get('email').clearValidators();
        this.registerForm.get('email').updateValueAndValidity();
      }
    }

  }

  checkIfNumberAadhar(e) {
    e = e || window.event;
    var charCode = typeof e.which == 'undefined' ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (
      !charStr.match(/^[0-9]+$/) ||
      this.vaccineRegisterForm.value.aadhaar?.length == 12
    )
      e.preventDefault();
  }

  onChangeMobileNumber(event){
     console.log('mobile', event.target.value)
     if(event.target.value  && !this.registerForm.value.email){
      this.registerForm.get('email').clearValidators();
      this.registerForm.get('email').updateValueAndValidity();
     }
     if(this.registerForm.value.email && !this.registerForm.value.mobileNo){
      this.registerForm.get('mobileNo').clearValidators();
      this.registerForm.get('mobileNo').updateValueAndValidity();
     }
  }
  onChangeEmail(event){
    const value = event.target.value
    if(event.target.value  && !this.registerForm.value.mobileNo){
      this.registerForm.get('mobileNo').clearValidators();
      this.registerForm.get('mobileNo').updateValueAndValidity();
     }
  }

  // submit signup
  submitSignup() {
    this.issubmitted = true;
    if(!this.registerForm.value.mobileNo && !this.registerForm.value.email){
      this.registerForm.get('email').setValidators( [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]);
      this.registerForm.get('email').updateValueAndValidity();
    }
    if(this.registerForm.value.email){
      this.registerForm.get('email').setValidators( [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]);
      this.registerForm.get('email').updateValueAndValidity();
    }
    if(this.registerForm.value.mobileNo){
      this.registerForm.get('mobileNo').setValidators([Validators.required , Validators.minLength(10),Validators.maxLength(10)]);
      this.registerForm.get('mobileNo').updateValueAndValidity();
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
   localStorage.clear()
    let obj = {
      emailAddress: this.registerForm.value.email,
      mobileNumber: this.registerForm.value.mobileNo,
      subdivision_id: ''
    };
    console.log(obj,'obj');    
    this.authService.signUp(obj).subscribe((res) => {
      if (res.statusCode == 200) {

        this.showVerify = true;
        localStorage.setItem('cvo', res?.data?.id);
        Swal.fire(`${res.message}`);
      }
    });
  }

  signupVerifyOtp() {
    this.signupVerifyOtpForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  // signup otp verification
  checkOTP() {
    this.orgOTP = localStorage.getItem('cvo');

    const verifyObj = {
      id: this.orgOTP,
      otp: this.signupVerifyOtpForm.value.otp,
    };

    this.authService.verifyOtp(verifyObj).subscribe((res) => {
      if (res.statusCode == 200) {
        localStorage.setItem('user_token', res.data.access_token);
        localStorage.setItem('user_details', JSON.stringify(res.data.user));
        Swal.fire(res.message);
        this.router.navigateByUrl('/patient/dashboard');
        //  $("#testModall").modal('show');
      } else {
        Swal.fire({
          title: 'Please enter valid OTP',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  // request otp
  requestOTP() {
    this.isSubmit = true;
    this.signinForm.get('username').setValidators([Validators.required]);
    this.signinForm.get('username').updateValueAndValidity();
    this.signinForm.get('password').clearValidators();
    this.signinForm.get('password').updateValueAndValidity();
    if (!this.signinForm.valid) {
      return;
    }

    this.showVerifyotp = true;

    let obj = {
      userName: this.signinForm.value.username,
    };

    this.authService.loginOTP(obj).subscribe((res) => {
      if (res.statusCode == 200) {
        Swal.fire(res.message);
        localStorage.setItem('cvo', res?.data?.id);
        // localStorage.setItem("user_token", res.data.access_token)
        localStorage.setItem('role', res?.data?.role);
      } else {
        Swal.fire({
          title: 'Please enter valid email/mobile number',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  // login otp verification
  loginOtpVerify() {
    this.orgOTP = localStorage.getItem('cvo');
    this.userRole = localStorage.getItem('role');

    let verifyObj = {
      id: this.orgOTP,
      otp: this.signinVerifyOtpForm.value.otp,
      role: this.userRole,
    };
    this.spinner.show()
    this.authService.loginOtpVerification(verifyObj).subscribe((res) => {
      if (res.statusCode == 200) {
       localStorage.setItem('user_token', res.data.access_token);
       localStorage.setItem('user_details', JSON.stringify(res.data.user));
       if (res.data.user.role === 'admin') {
         this.router.navigateByUrl('/admin/management');
       } else if (res.data.user.role === 'super-admin') {
         this.router.navigateByUrl('/super-admin/company');
       } else if (res.data.user.role === 'labl') {
         this.router.navigateByUrl('/privia/dashboard');
       } else if (res.data.user.role === 'front-office') {
         this.router.navigateByUrl('/admin/patient');
       } else if (
         res.data.user.role === 'lab' ||
         res.data.user.role === 'lab-incharge' ||
         res.data.user.role === 'lab-technician'
       ) {
         this.router.navigateByUrl('/admin/test-result');
       }else if(res.data.user.role === 'patient'){
        this.router.navigateByUrl('/patient/dashboard');
       }else if(res.data.user.role === 'doctor'){
        this.router.navigateByUrl('/admin/referral-patients');
       }else if(res.data.user.role === 'org-admin'){
        this.router.navigateByUrl('/admin/patient');
       }
       this.broadcastservice.loginData.emit(true);
        // localStorage.setItem("user_token", res.data.access_token)
        // localStorage.setItem("user_details", JSON.stringify(res.data.user))
        // Swal.fire(res.message);
        // this.router.navigateByUrl('/patient/dashboard');
        //  $("#testModall").modal('show');
      } else {
        this.spinner.hide()
        Swal.fire({
          title: 'Please enter valid OTP',
          confirmButtonText: 'OK',
        });
      }
    },(err)=>{this.spinner.hide()});
  }

  signinVerifyOtp() {
    this.signinVerifyOtpForm = this.fb.group({
      // username: ['',Validators.required],
      otp: ['', Validators.required],
    });
  }

  get f() {
    return this.signinForm.controls;
  }
  get sinf() {
    return this.signinForm.controls;
  }
  get rot() {
    return this.signinVerifyOtpForm.controls;
  }

  resendSignupOtp() {
    this.submitSignup();
  }

  resendSigninOtp() {
    this.requestOTP();
  }

  backTosingUp() {
    this.showVerify = false;
    if(this.registerForm.value.mobileNo){
      this.registerForm.get('mobileNo').setValidators([Validators.required])
      this.registerForm.get('mobileNo').updateValueAndValidity();
      this.registerForm.get('email').clearValidators()
      this.registerForm.get('email').updateValueAndValidity();
      this.cdref.detectChanges();
    
    console.log('1', this.registerForm.controls)
    console.log('1')
    }
    if(this.registerForm.value.email){
      this.registerForm.get('mobileNo').clearValidators()
      this.registerForm.get('mobileNo').updateValueAndValidity();
      this.registerForm.get('email').setValidators( [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]);
      this.registerForm.get('email').updateValueAndValidity();
    console.log('2')
    }
    if(this.registerForm.value.mobileNo && this.registerForm.value.email){
      this.registerForm.get('mobileNo').setValidators([Validators.required])
      this.registerForm.get('mobileNo').updateValueAndValidity();
       this.registerForm.get('email').setValidators( [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]);
      this.registerForm.get('email').updateValueAndValidity();
      console.log('3')

    }
  }

  selectedDOB(event) {
    this.date_of_birth = event.target.value;
    console.log(event.target.value);
  }

  // Register for Vaccination submit
  submitVaccination() {
    this.submitted = true;
    this.vaccineRegisterDynamicValidation()
    // stop here if form is invalid
    if (this.vaccineRegisterForm.invalid) {
      return;
    }

    let obj = {
      name: this.vaccineRegisterForm.value.userName,
      DOB: this.date_of_birth,
      gender: this.vaccineRegisterForm.value.gender,
      vaccinationDose: this.vaccineRegisterForm.value.dose,
      aadhaar: this.vaccineRegisterForm.value.aadhaar,
      mobileNumber: this.vaccineRegisterForm.value.mobileNumber,
      emailAddress: this.vaccineRegisterForm.value.email_Address,
      address: this.vaccineRegisterForm.value.address,
      organization: this.vaccineRegisterForm.value.organization,
      vaccineName: this.vaccineRegisterForm.value.vaccineName,
      noOfPersons: Number(this.vaccineRegisterForm.value.noOfPersons),
      subdivision_id: ''
    };

    console.log(obj,'obj');
    

    this.authService.vaccinationRegister(obj).subscribe((res) => {
      if (res.statusCode == 200) {
        this.vaccineRegisterForm.reset();
        this.clearForm();
        this.vaccineRegisterForm
        this.vaccineRegisterForm.get('email_Address').clearValidators()
        this.vaccineRegisterForm.get('email_Address').updateValueAndValidity()
        Swal.fire({
          icon: 'success',
          text: `${res?.message}`,
          confirmButtonText: 'OK',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: true,
        }).then((result) => {
          this.clearForm();
        });
      }
    });
  }

  vaccineRegisterDynamicValidation(){
    this.vaccineRegisterForm.get('email_Address').setValidators([
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ])
    this.vaccineRegisterForm.get('email_Address').updateValueAndValidity()
    this.vaccineRegisterForm.get('userName').setValidators([Validators.required])
    this.vaccineRegisterForm.get('userName').updateValueAndValidity()
    this.vaccineRegisterForm.get('date_of_birth').setValidators([Validators.required])
    this.vaccineRegisterForm.get('date_of_birth').updateValueAndValidity()
    this.vaccineRegisterForm.get('gender').setValidators([Validators.required])
    this.vaccineRegisterForm.get('gender').updateValueAndValidity()
    this.vaccineRegisterForm.get('dose').setValidators([Validators.required])
    this.vaccineRegisterForm.get('dose').updateValueAndValidity()
    this.vaccineRegisterForm.get('aadhaar').setValidators([Validators.required])
    this.vaccineRegisterForm.get('aadhaar').updateValueAndValidity()
    this.vaccineRegisterForm.get('mobileNumber').setValidators([Validators.required])
    this.vaccineRegisterForm.get('mobileNumber').updateValueAndValidity()
    this.vaccineRegisterForm.get('address').setValidators([Validators.required])
    this.vaccineRegisterForm.get('address').updateValueAndValidity()
    this.vaccineRegisterForm.get('vaccineName').setValidators([Validators.required])
    this.vaccineRegisterForm.get('vaccineName').updateValueAndValidity()
    this.vaccineRegisterForm.get('noOfPersons').setValidators([Validators.required])
    this.vaccineRegisterForm.get('noOfPersons').updateValueAndValidity()
   return
  }
  backTosignIn() {
    this.showVerifyotp = false;
  }
}
