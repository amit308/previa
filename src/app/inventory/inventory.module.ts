import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list/list.component";
import { AddComponent } from "./add/add.component";
import { Router, RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { MatSelectModule } from "@angular/material/select";
const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  { path: "add", component: AddComponent },
];

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    NgxSpinnerModule,
    NgxDaterangepickerMd.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
  ],
})
export class InventoryModule {}
