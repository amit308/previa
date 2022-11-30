import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';

import { MainComponentComponent } from './layout/main-component/main-component.component';
import { PromeaComponent } from './promea/promea.component';
import { TestReportComponent } from './test-report/test-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/session/signIn',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'session',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },

  {
    path: '',
    component: MainComponentComponent,
    children: [
      {
        path: 'privia',
        loadChildren: () =>
          import('./privia/privia.module').then((m) => m.PriviaModule),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'super-admin',
        loadChildren: () =>
          import('./super-admin/super-admin.module').then(
            (m) => m.SuperAdminModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./user-details/user-details.module').then(
            (m) => m.UserDetailsModule
          ),
      },
      {
        path: 'roles-menus',
        loadChildren: () =>
          import('./roles-menus/roles-menus.module').then(
            (m) => m.RolesMenusModule
          ),
      },
      {
        path: 'riderselfslots',
        loadChildren: () =>
          import('./rider/rider.module').then((m) => m.RiderModule),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./inventory/inventory.module').then((m) => m.InventoryModule),
      },
      {
        path: 'b2-b',
        loadChildren: () =>
          import('./b2-b/b2-b.module').then((m) => m.B2BModule),
      },
    ],
  },
  {
    path: 'promea',
    component: PromeaComponent,
  },
  {
    path: 'report',
    component: TestReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
