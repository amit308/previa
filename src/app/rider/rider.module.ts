import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderSamplesComponent } from './rider-samples/rider-samples.component';
import { RouterModule,Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FormsModule } from '@angular/forms';

const routes: Routes = [ 
      { 
        path: '', 
        component: RiderSamplesComponent 
    },
 
     
 
 ]

@NgModule({
  declarations: [RiderSamplesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MaterialModule,
    MatCarouselModule,
    FormsModule
    
    
  ],
})
export class RiderModule { }
