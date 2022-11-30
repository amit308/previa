import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesMenusRoutingModule } from './roles-menus-routing.module';
import { MenusComponent } from './menus/menus.component';
import { RolesComponent } from './roles/roles.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [MenusComponent, RolesComponent],
  imports: [
    CommonModule,
    RolesMenusRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
   
    NgbModalModule,
    MatDatepickerModule,
    MatInputModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
  ]
})
export class RolesMenusModule { }
