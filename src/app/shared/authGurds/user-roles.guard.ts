import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserRolesGuard implements CanActivate {
  constructor(private router: Router , private authService:AuthService , private spinner:NgxSpinnerService) {}
  /*
  * Checking user roles
  */

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user :any = this.authService.currentUser();
    const permission = route.data['permission'];

    let canActivate: boolean;

    // if (!permission) {
    //   throw new Error('Permissions is not setup!');
    // }
    // if (!permission.only.length) {
    //   throw new Error('Roles are not setup!');
    // }

    if (!user) {
      return false;
    }

    if(user.authorities.length == 0){
      this.spinner.hide()
      Swal.fire(`There are no menu's assigned for this role`)
      return false;
    }

    // canActivate = permission.only.includes(user.authorities);
    canActivate = user.authorities.some((el) => permission.only.includes(el));

    if (!canActivate) {
      // this.router.navigate([permission.redirectTo], { queryParams: { returnUrl: state.url } });
      // this.router.navigate([permission.redirectTo]);
      return false
    }

    // if (user && user.userRole) {
    //   return true;
    // }

    // this.router.navigate(['no-access']);
    return canActivate;
  }
}
