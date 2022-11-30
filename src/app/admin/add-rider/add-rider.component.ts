import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { RiderListComponent } from '../rider-list/rider-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { EventEmitter } from 'events';
import { FormControl } from '@angular/forms';
import {ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-rider',
  templateUrl: './add-rider.component.html',
  styleUrls: ['./add-rider.component.scss']
})
export class AddRiderComponent implements OnInit {

  subdivisions = new FormControl();
  subdivision: string[] = ['branch', 'hospital', 'location', 'lab'];
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage'];
  selected = -1;
  selectedValues = [];
  selectedLabData = [];
  action: string = 'ADD'
  addRiderForm: FormGroup
  riderDetails: any
  riderListData: any
  user: any
  subLabData: any

  hospitalData: any
  branchData: any
  labData: any
  locationData: any

  constructor(private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    public dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AddRiderComponent>,
    private spinner:NgxSpinnerService

  ) {
    this.addRiderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      // subdivision: [''],
      // sub_lab_division: ['']
    })

    this.riderDetails = JSON.parse(localStorage.getItem("Rider"))

    this.lodform()


  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
  }

  get d() { return this.addRiderForm.controls; }

  lodform() {
    if (this.riderDetails?.action === "update") {
      this.action = 'UPDATE'
      this.addRiderForm.patchValue({

        name: this.riderDetails?.data?.name,
        email: this.riderDetails?.data?.emailAddress,
        mobileNumber: this.riderDetails?.data?.mobileNumber,
      })
    } else {

    }
  }


  submitRider() {
    let obj = {
      name: this.addRiderForm.value.name,
      emailAddress: this.addRiderForm.value.email,
      mobileNumber: `${this.addRiderForm.value.mobileNumber}`,
      password: '',
      subdivision: '',
      department: '',
      role: "rider",
      address: {
        country: '',
        state: '',
        city: '',
        place: '',
        street: '',
        pin: '',
        zone: '',
        email: '',
        mobile: '',
        fax: '',
        phone1: '',
        phone2: '',
        website: ''

      },

    }
    if (this.riderDetails?.action === "add") {
     this.spinner.show()
      this.service.addRider(obj).subscribe((resp :any) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          this.service.riderListUpdate.emit(true)
          this.dialog.closeAll()
          this.addRiderForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Rider Created Successfully',
            // title: `${resp.message}`,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: true,
          })
        }

      },(err)=>{this.spinner.hide()})
    } else {
      this.spinner.show()
      this.service.riderUpdate(this.riderDetails?.data?._id, obj).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          console.log(resp, 'resp');
          this.service.riderListUpdate.emit(true)
          this.dialog.closeAll()
          this.addRiderForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Rider Updated Successfully',
            // title: `${resp.message}`,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: true,
          })
        }
      },(err)=>{this.spinner.hide()} )
    }
  }



  onClose() {
    this.dialogRef.close()
  }



  /*checkbox change event*/
  // onOut() {
  //   console.log(this.selectedValues)
  //   this.loadSubLabDetails()
  // }


  ngAfterContentChecked() { 
    this.cdref.detectChanges()    
     }

//   loadSubLabDetails() {
//     let obj = {
//       category: this.selectedValues,
//     };
// console.log(obj,'obj');

//     this.service.getSubDetails(this.user?.company, obj).subscribe((res) => {
//         if (res.statusCode == 200) {
//           this.subLabData = res?.['data']?.['subDivisions'];
//           this.selectedLabData.push(this.subLabData)
//           console.log(this.selectedLabData,'lab');
//           console.log(this.subLabData, 'subLabData');
//         }
//       });
//   }

 

//   changeHandler(event) {
//     let value = (<HTMLInputElement>event.target).value;
//     console.log(value);
//     // this.getAllTests(value);

//   }

// loadSubLabDetails(){
//   this.getHospatialData()
//   this.getLocationData()
//   this.getBranchData()
//   this.getLabData()
//   }

//   getHospatialData(){
//     let obj = {
//             category: 'hospital',
//           };
//     this.service.getSublabDetails(this.user?.company, obj).subscribe(res=>{
//       this.hospitalData = res?.['data']?.['subDivisions'];
//         this.selectedLabData.push(this.hospitalData)
//         console.log(this.selectedLabData);
        
//     })
//   }

//   getLocationData(){
//     let obj = {
//       category: 'location'
//     }
//     this.service.getSublabDetails(this.user?.company, obj).subscribe(res=>{
//       this.locationData = res?.['data']?.['subDivisions'];
//       this.selectedLabData.push(this.locationData)
//       console.log(this.selectedLabData);
//     })
//   }

//   getLabData(){
//     let obj = {
//       category: 'lab'
//     }
//     this.service.getSublabDetails(this.user?.company, obj).subscribe(res=>{
//       this.labData = res?.['data']?.['subDivisions'];
//       this.selectedLabData.push(this.labData)
//       console.log(this.selectedLabData);
//     })
//   }
  
//   getBranchData(){
//     let obj ={
//       category: 'branch'
//     }
//     this.service.getSublabDetails(this.user?.company, obj).subscribe(res=>{
//       this.branchData = res?.['data']?.['subDivisions'];
//       this.selectedLabData.push(this.branchData)
//       console.log(this.selectedLabData);
//     })
//   }


  

  


}
