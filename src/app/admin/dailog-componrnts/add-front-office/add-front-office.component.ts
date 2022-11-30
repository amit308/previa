import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';
import { AddLabEmployeesComponent } from '../add-lab-employees/add-lab-employees.component';

@Component({
  selector: 'app-add-front-office',
  templateUrl: './add-front-office.component.html',
  styleUrls: ['./add-front-office.component.scss'],
})
export class AddFrontOfficeComponent implements OnInit {
  FrontOfficeFormGroup: FormGroup;
  selectedFrontOffice: any;

  formValue: any = {};

  role = ['lab', 'lab-incharge', 'lab-technician'];
  subdivision = ['branch', 'hospital', 'location', 'lab'];
  selectedSubDivisionList = [];
  subLabData: any;
  selected_lab_value: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private readonly HealthService: HealthService,

    private readonly adminService: AdminService,
    private dialogRef: MatDialogRef<AddFrontOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectedFrontOffice = data;

    this.FrontOfficeFormGroup = this.fb.group({
      name: [''],
      emailAddress: [''],
      mobileNumber: [''],
      password: [''],
      subdivision: [''],
      subdivision_id: [''],
      role: [''],
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_details'));



    this.loadcompanyform();
    
  }

  loadcompanyform() {
    if (this.selectedFrontOffice.action === 'update') {
      this.FrontOfficeFormGroup.patchValue({
        name: this.selectedFrontOffice.data.name,
        emailAddress: this.selectedFrontOffice.data.emailAddress,
        mobileNumber: this.selectedFrontOffice.data.mobileNumber,
        subdivision: this.selectedFrontOffice.data.subdivision,
        subdivision_id: this.selectedFrontOffice?.data?.subdivision_id,
        role: this.selectedFrontOffice.data.role,
      });
      this.selected_lab_value = this.selectedFrontOffice.data.subdivision;
      this.loadSubLabDetails();
      // this.FrontOfficeFormGroup.controls['subdivision_id'].patchValue({ subdivision_id: this.selectedFrontOffice?.data?.subdivisionInfo?.name})
    }
  }

  get o() {
    return this.FrontOfficeFormGroup.controls;
  }

  addFrontOffice() {
    const formData = {
      name: this.FrontOfficeFormGroup.value.name,
      emailAddress: this.FrontOfficeFormGroup.value.emailAddress,
      mobileNumber: this.FrontOfficeFormGroup.value.mobileNumber.toString(),
      password: this.FrontOfficeFormGroup.value.password,
      // subdivision: this.FrontOfficeFormGroup.value.subdivision,
      // subdivision_id: this.FrontOfficeFormGroup.value.subdivision_id,
      subdivision: '',
      subdivision_id: '',
      // "department": this.FrontOfficeFormGroup.value.department,
      role: 'front-office',
    };
    this.spinner.show();
    this.adminService.createUser(formData).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.statusCode === 200) {
          Swal.fire({
            title: 'WelCome!',
            text: `${res?.message}`,
            icon: 'success',
            confirmButtonText: 'ok',
          }).then((result) => {
            this.dialogRef.close();
          });
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  updateFrontOffice() {
    const formData = {
      name: this.FrontOfficeFormGroup.value.name,
      emailAddress: this.FrontOfficeFormGroup.value.emailAddress,
      mobileNumber: this.FrontOfficeFormGroup.value.mobileNumber.toString(),
      // "password": this.FrontOfficeFormGroup.value.password,
      // subdivision: this.FrontOfficeFormGroup.value.subdivision,
      // subdivision_id: this.FrontOfficeFormGroup.value.subdivision_id,
      // "department": this.FrontOfficeFormGroup.value.department,
      role: 'front-office',
    };
 this.spinner.show()
    this.adminService
      .updateUser(this.selectedFrontOffice.data._id, formData)
      .subscribe((res) => {
        this.spinner.hide()
        if (res.statusCode === 200) {
          Swal.fire({
            title: 'WelCome!',
            text: `${res?.message}`,
            icon: 'success',
            confirmButtonText: 'ok',
          }).then((result) => {
            this.dialogRef.close();
          });
        }
      }, (err)=>{
        this.spinner.hide()
      });
  }
  onClose() {
    this.dialogRef.close();
  }

  selctedSubDivision(event) {
    this.selected_lab_value = event.target.value;
    this.loadSubLabDetails();
  }

  loadSubLabDetails() {
    let obj = {
      category: this.selected_lab_value,
    };

    this.adminService
      .getSublabDetails(this.user?.company, obj)
      .subscribe((res) => {
        if (res.statusCode == 200) {
          this.subLabData = res?.['data']?.['subDivisions'];
        }
      });
  }
}
