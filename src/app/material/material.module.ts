import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
declarations: [],
imports: [
CommonModule,
MatButtonModule,
MatDialogModule,
MatTableModule,
MatPaginatorModule,
MatCardModule,
MatTabsModule,
MatInputModule,
MatAutocompleteModule,
MatSelectModule,
MatCheckboxModule,
MatIconModule,
MatRadioModule,
MatProgressBarModule,
MatSidenavModule,
MatExpansionModule,
MatSlideToggleModule,
MatStepperModule,
MatDatepickerModule,
MatMenuModule,
],
exports:[
MatButtonModule,
MatDialogModule,
MatTableModule,
MatPaginatorModule,
MatCardModule,
MatInputModule,
MatAutocompleteModule,
MatSelectModule,
MatCheckboxModule,
MatTabsModule,
MatIconModule,
MatRadioModule,
MatProgressBarModule,
MatSidenavModule,
MatExpansionModule,
MatSlideToggleModule,
MatStepperModule,
MatDatepickerModule,
MatMenuModule
]
})
export class MaterialModule { }