import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-addfinancemanager',
  templateUrl: './addfinancemanager.component.html',
  styleUrls: ['./addfinancemanager.component.scss']
})
export class AddfinancemanagerComponent implements OnInit {
  FinanceManagerFormGroup: FormGroup;
  selectedManager: any;

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
    private dialogRef: MatDialogRef<AddfinancemanagerComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectedManager = data;

    this.FinanceManagerFormGroup = this.fb.group({
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
    
  }

  // loadcompanyform() {
  //   if (this.selectedFrontOffice.action === 'update') {
  //     this.FrontOfficeFormGroup.patchValue({
  //       name: this.selectedFrontOffice.data.name,
  //       emailAddress: this.selectedFrontOffice.data.emailAddress,
  //       mobileNumber: this.selectedFrontOffice.data.mobileNumber,
  //       subdivision: this.selectedFrontOffice.data.subdivision,
  //       subdivision_id: this.selectedFrontOffice?.data?.subdivision_id,
  //       role: this.selectedFrontOffice.data.role,
  //     });
  //     this.selected_lab_value = this.selectedFrontOffice.data.subdivision;
  //     this.loadSubLabDetails();
  //     // this.FrontOfficeFormGroup.controls['subdivision_id'].patchValue({ subdivision_id: this.selectedFrontOffice?.data?.subdivisionInfo?.name})
  //   }
  // }

  get o() {
    return this.FinanceManagerFormGroup.controls;
  }

   onClose() {
    this.dialogRef.close();
  }


 
}

