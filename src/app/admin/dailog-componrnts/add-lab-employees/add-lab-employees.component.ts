import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelect } from "@angular/material/select";
import { AdminService } from "src/app/service/admin.service";
import { HealthService } from "src/app/service/health.service";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-add-lab-employees",
  templateUrl: "./add-lab-employees.component.html",
  styleUrls: ["./add-lab-employees.component.scss"],
  providers: [FormBuilder],
})
export class AddLabEmployeesComponent implements OnInit {
  @ViewChild("select") select: MatSelect;
  LabInchargeFormGroup: FormGroup;
  selectedLabValue: any;
  companyDetails: any;
  selected_lab_value: any;
  subLabData: any;
  user: any;
  allSelected = false;
  userToken: any;
  role = ["lab", "lab-incharge", "lab-technician"];
  subdivision = ["branch", "hospital", "location", "lab"];
  departments: any;
  constructor(
    private fb: FormBuilder,
    private readonly HealthService: HealthService,
    private readonly adminService: AdminService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddLabEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectedLabValue = data;

    this.LabInchargeFormGroup = this.fb.group({
      name: [""],
      emailAddress: [""],
      mobileNumber: [""],
      password: [""],
      subdivision: [],
      department: [""],
      subdivision_id: [""],
      role: [
        {
          value: this.selectedLabValue.role,
          disabled: this.selectedLabValue.action,
        },
      ],
    });
  }
  isShown = false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"));
    const token = localStorage.getItem("user_token");
    this.userToken = jwt_decode(token);
    this.loadcompanyform();
    this.getDepartments();
  }
  checkPageAccess(value: any): any {
    return this.userToken?.authorities
      ? this.userToken.authorities.includes(value)
        ? true
        : false
      : false;
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => {
        if (item.value) {
          item.select();
        } else {
          item.deselect();
        }
      });
    } else {
      this.select.options.forEach((item: MatOption) => {
        if (!item.value) {
          item.select();
        } else {
          item.deselect();
        }
      });
    }
  }
  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      } else {
        if (!item.value) {
          item.deselect();
        }
      }
      if (item.selected) {
      }
    });
    this.allSelected = newStatus;

    const selectedValue = [];
    this.select.options.map((item: MatOption) => {
      if (item.selected) {
        selectedValue.push(item);
      }
    });
    if (selectedValue.length == 0) {
      this.select.options.forEach((item: MatOption) => {
        if (!item.value) {
          item.select();
        }
      });
    }
  }
  getDepartments() {
    this.HealthService.getDepartments().subscribe((res) => {
      this.departments = res.data.departments;
    });
  }

  loadcompanyform() {
    if (this.selectedLabValue.action === "update") {
      this.LabInchargeFormGroup.patchValue({
        name: this.selectedLabValue.data.name,
        emailAddress: this.selectedLabValue.data.emailAddress,
        mobileNumber: this.selectedLabValue.data.mobileNumber,
        subdivision: this.selectedLabValue.data.subdivision,
        role: this.selectedLabValue.data.role,
        department: this.selectedLabValue.data.departments,
        subdivision_id: this.selectedLabValue.data.subdivisionId,
      });
      this.selected_lab_value = this.selectedLabValue.data.subdivision;
      this.loadSubLabDetails();
    }
  }

  get o() {
    return this.LabInchargeFormGroup.controls;
  }

  addLabIncharge() {
    const formData = {
      name: this.LabInchargeFormGroup.value.name,
      emailAddress: this.LabInchargeFormGroup.value.emailAddress,
      mobileNumber: this.LabInchargeFormGroup.value.mobileNumber.toString(),
      password: this.LabInchargeFormGroup.value.password,
      subdivision: this.LabInchargeFormGroup.value.subdivision
        ? this.LabInchargeFormGroup.value.subdivision
        : this.user?.subdivision,
      department: this.LabInchargeFormGroup.value.department.filter(item => {return item != ""}),
      // "department": this.LabInchargeFormGroup.value.department,
      role: `${this.selectedLabValue.role}`,
      subdivision_id: this.LabInchargeFormGroup.value.subdivision_id
        ? `${this.LabInchargeFormGroup.value.subdivision_id}`
        : this.user?.subdivision_id,
    };
    if(formData.department.length == 0){
      return
    }
    this.spinner.show();
  
    this.adminService.createLabEmployees(formData).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.statusCode === 200) {
          Swal.fire({
            title: "WelCome!",
            text: `${res?.message}`,
            icon: "success",
            confirmButtonText: "ok",
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
  updateLabIncharge() {
    const formData = {
      name: this.LabInchargeFormGroup.value.name,
      emailAddress: this.LabInchargeFormGroup.value.emailAddress,
      mobileNumber: this.LabInchargeFormGroup.value.mobileNumber.toString(),
      // "password": this.FrontOfficeFormGroup.value.password,
      subdivision: this.LabInchargeFormGroup.value.subdivision,
      department: this.LabInchargeFormGroup.value.department.filter(item => {return item != ""}),
      role: `${this.selectedLabValue.role}`,
      subdivision_id: `${this.LabInchargeFormGroup.value.subdivision_id}`,
    };

    if(formData.department.length == 0){
      return
    }    this.spinner.show();
    this.adminService
      .updateUser(this.selectedLabValue.data._id, formData)
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (res.statusCode === 200) {
            Swal.fire({
              title: "WelCome!",
              text: `${res?.message}`,
              icon: "success",
              confirmButtonText: "ok",
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
          this.subLabData = res?.["data"]?.["subDivisions"];
        }
      });
  }
}
