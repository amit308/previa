import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class RoleGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  // userData = localStorage.getItem('user_details');
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const adminRole = next.data.adminRole;
    const foRole = next.data.foRole;
    const labRole = next.data.labRole;
    const superAdminRole = next.data.superAdminRole;
    const labInchargeRole = next.data.labInchargeRole;
    const labTechRole = next.data.labTechRole;
    const doctorRole = next.data.doctorRole;
    const orgRole = next.data.orgRole;
    const role = JSON.parse(localStorage.getItem('user_details')).role;
    if (role === adminRole ||
      role === foRole ||
      role === labRole ||
      role === superAdminRole ||
      role === labInchargeRole ||
      role === doctorRole ||
      role === orgRole ||
      role === labTechRole) {
      console.log("if case role guard")
      return true;
    } else {
      console.log("else case role guard");
      Swal.fire({
        icon: 'error',
        title: 'Unexpected path'
      }).then((res) => {
        if (res.isConfirmed) {
          this.router.navigateByUrl('session/signIn');
        }
      })
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
