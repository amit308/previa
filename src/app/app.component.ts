import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BroadcastService } from './service/broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'priviaHealth';
  show: boolean;
  constructor(private router:Router,private broadCastservice:BroadcastService){

  }
  ngOnInit(): void {
    // this.broadCastservice.loginData.subscribe(res=>{
    //   if(res === true){
    //     this.show = true
    //   }else{
    //     this.show = false
    //   }
    // })
    const user = localStorage.getItem('user_token')
    // if(user?.role){
    //   console.log("suresh")
    // }else{
    //   this.router.navigateByUrl('/session/signIn')
    // }
    if(user){
      // this.router.navigateByUrl("/admin/hospital");
    }else{
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          console.log(e.url);
        }
      });
      // this.router.navigateByUrl('/session/signIn')
    }
  }
}
