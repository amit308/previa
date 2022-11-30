import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { HttpService } from 'src/app/service/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changepasswordForm: FormGroup;
  userDetails: any = []
  constructor( private router:Router,  private fb:FormBuilder, private http: HttpService, private service:AdminService  ) {
    
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("user_details"));
    this.loadChangepasswordForm()
  }
  loadChangepasswordForm(){    
    this.changepasswordForm = this.fb.group({
      password: ['', Validators.required],
      new_password:['', [Validators.required, Validators.minLength(6)]] ,
      confirm_new_password: ['', Validators.required],
    },
    {
      validator: this.http.MatchPassword('new_password', 'confirm_new_password'),
    }
    );
  }




  get cp() { return this.changepasswordForm.controls; }



  show(){
    
  }
  changePassword(){
    console.log(this.changepasswordForm.value);
    // this.changepasswordForm.reset()
    let obj ={
      currentPassword:this.changepasswordForm.value.password,
      newPassword:this.changepasswordForm.value.new_password,
      
    }


  this.service.updatePassword(obj).subscribe((res) => {

    if (res.statusCode == 200) {
      localStorage.clear()
      this.router.navigateByUrl('')
      Swal.fire({
        title: `${res.message}`,
        icon: "success",
      })
      this.changepasswordForm.reset()
    } else {
      this.changepasswordForm.reset()

      Swal.fire({
        title: `${res.message}`,
        icon: "warning"
      })
    }
  
  })
  }
}
