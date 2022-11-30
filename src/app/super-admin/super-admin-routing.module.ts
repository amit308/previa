import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardGuard } from '../shared/role-guard.guard';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [RoleGuardGuard], data: { superAdminRole: 'super-admin' }
      },
      {
        path: "company",
        component: CompanyComponent,
        canActivate: [RoleGuardGuard], data: { superAdminRole: 'super-admin' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
