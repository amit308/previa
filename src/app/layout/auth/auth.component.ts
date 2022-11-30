import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user_token');
    if(user){
      // this.router.navigateByUrl("/admin/hospital");
    }else{
      this.router.navigateByUrl('/session/signIn')
    }
  }

}
