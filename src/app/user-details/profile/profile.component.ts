import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  id: any;
  userDetails:any = []
  constructor(private fb: FormBuilder, private service:AdminService , private healthService:HealthService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      mobile_number: [''],
      role: ['', Validators.required],
      subdivision: [''],
      subdivisionName:[''],
      department:[''],
      qualification:['']
    })
    this.userDetails = JSON.parse(localStorage.getItem("user_details"));
    console.log( this.userDetails ,'');
    
    this.profileData(this.userDetails);
    
  }

  ngOnInit(): void {
  }

  profileData(userDetails) {
    console.log({userDetails});
    
    this.id = userDetails._id    
     this.healthService.getUserById().subscribe(res =>{
       console.log(res);
  
       this.profileForm.patchValue({
        name: res?.name,
        email: res?.emailAddress,
        mobile_number: res?.mobileNumber,
        role: res?.role,
        subdivision:res?.subdivision,
        subdivisionName:res?.subdivisionInfo?.name,

  
      })
       
     })
  }



  editProfile(){
    console.log(this.profileForm.value);
    
    const formData ={
      userId: this.id,
      name: this.profileForm.value.name,
      emailAddress: this.profileForm.value.email,
      mobileNumber: this.profileForm.value.mobile_number,
      subdivision: this.profileForm.value.subdivision,
      department: this.profileForm.value.department,
      qualification: this.profileForm.value.qualification,

    }

    console.log(formData,'ravi');    

  this.service.editProfileData(this.userDetails._id,formData).subscribe((resp) => {

    if (resp.status_code == 200) {
       Swal.fire({
        text: `${resp.message}`,
      })
    } else {
      Swal.fire({
        text: `${resp.message}`,
      })
  
    }
  })
}



}
