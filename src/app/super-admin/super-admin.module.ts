import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { CompanyComponent } from './company/company.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyDailogComponent } from './comonents/company-dailog/company-dailog.component';
import { AdminDailogComponent } from './comonents/admin-dailog/admin-dailog.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [CompanyComponent, AdminComponent, CompanyDailogComponent, AdminDailogComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,FormsModule,
    NgxSpinnerModule
  ],
  entryComponents:[
    AdminDailogComponent
  ]
})
export class SuperAdminModule { }
