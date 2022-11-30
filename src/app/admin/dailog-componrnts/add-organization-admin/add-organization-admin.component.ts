import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-organization-admin',
  templateUrl: './add-organization-admin.component.html',
  styleUrls: ['./add-organization-admin.component.scss']
})
export class AddOrganizationAdminComponent implements OnInit {

  OrganizationFormGroup: FormGroup;
  selectedOrganization: any;

  formValue: any = {};

  role = ['lab', 'lab-incharge', 'lab-technician'];
  subdivision = ['branch', 'hospital', 'location', 'lab'];
  selectedSubDivisionList = [];
  subLabData: any;
  selected_lab_value: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private readonly HealthService: HealthService,
    private readonly adminService: AdminService,
    private dialogRef: MatDialogRef<AddOrganizationAdminComponent>,
    private spinner:NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectedOrganization = data;

    this.OrganizationFormGroup = this.fb.group({
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
    // this.OrganizationFormGroup.controls['subdivision_id'].patchValue({
    //   subdivision_id: this.selectedOrganization?.data?.subdivisionInfo?.name,
    // });
  }

  loadcompanyform() {
    if (this.selectedOrganization.action === 'update') {

      this.OrganizationFormGroup.patchValue({
        name: this.selectedOrganization.data.name,
        emailAddress: this.selectedOrganization.data.emailAddress,
        mobileNumber: this.selectedOrganization.data.mobileNumber,
        subdivision: this.selectedOrganization.data.subdivision,
        subdivision_id: this.selectedOrganization?.data?.subdivision_id,
        role: this.selectedOrganization.data.role,
      });
      this.selected_lab_value = this.selectedOrganization.data.subdivision;
      this.loadSubLabDetails();
      // this.OrganizationFormGroup.controls['subdivision_id'].patchValue({ subdivision_id: this.selectedOrganization?.data?.subdivisionInfo?.name})
    }
  }

  get o() {
    return this.OrganizationFormGroup.controls;
  }

  addOrganization() {
    const formData = {
      name: this.OrganizationFormGroup.value.name,
      emailAddress: this.OrganizationFormGroup.value.emailAddress,
      mobileNumber: this.OrganizationFormGroup.value.mobileNumber.toString(),
      password: this.OrganizationFormGroup.value.password,
      subdivision: this.OrganizationFormGroup.value.subdivision,
      subdivision_id: this.OrganizationFormGroup.value.subdivision_id,
      // "department": this.OrganizationFormGroup.value.department,
      role: 'org-admin',
    };
    this.spinner.show()
    this.adminService.createOrganizationUser(formData).subscribe((res) => {
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
    },
     (err)=>{
       this.spinner.hide()
     }
    );
  }

  updateOrganization() {
    const formData = {
      name: this.OrganizationFormGroup.value.name,
      emailAddress: this.OrganizationFormGroup.value.emailAddress,
      mobileNumber: this.OrganizationFormGroup.value.mobileNumber.toString(),
      // "password": this.OrganizationFormGroup.value.password,
      subdivision: this.OrganizationFormGroup.value.subdivision,
      subdivision_id: this.OrganizationFormGroup.value.subdivision_id,
      // "department": this.OrganizationFormGroup.value.department,
      role: 'org-admin',
    };
    this.spinner.show()
    this.adminService.updateOrganizationUser(this.selectedOrganization.data._id, formData).subscribe((res) => {
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
      } ,(err)=>{this.spinner.hide()});
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
          console.log(this.subLabData, 'subLabData');
        }
      });
  }
}
