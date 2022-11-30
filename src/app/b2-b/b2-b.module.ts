import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices/invoices.component';
import { Routes } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MaterialModule } from '../material/material.module';
const routes: Routes = [
  { path: 'invoices/create', component: CreateInvoiceComponent },
  { path: 'invoices', component: InvoicesComponent },
];

@NgModule({
  declarations: [InvoicesComponent, CreateInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatDialogModule,
    NgxDaterangepickerMd.forRoot(),
    MaterialModule,
  ],
})
export class B2BModule {}
