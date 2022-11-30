import { MatDialog } from "@angular/material/dialog";
import { startWith, map } from "rxjs/operators";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import jwt_decode from "jwt-decode";
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect;
  RegistrationForm: FormGroup;
  selectType = [
    { name: "hospital", displayName: "Hospital" },
    { name: "lab", displayName: "Lab" },
    // { name: 'doctor', displayName: 'Doctor' },
    { name: "location", displayName: "Location" },
    { name: "branch", displayName: "Branch" },
    { name: "dd-technician", displayName: "DD-Technician" },
    { name: "rider", displayName: "Rider" },
  ];
  selectTypeName = [];
  user: any;
  inventorDetails: any;
  userToken: any;

  materials: any = [];
  materialName: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    const token = localStorage.getItem("user_token");
    this.userToken = jwt_decode(token);
    this.RegistrationForm = this.fb.group(
      {
        type: ["", Validators.required],
        typeName: ["", Validators.required],
        materialName: ["", Validators.required],
        availabilityQuantity: [""],
        usedQuantity: [""],
        typeId: "",
      },
      {
        validator: quantityValidator("availabilityQuantity", "usedQuantity"),
      }
    );
    this.user = JSON.parse(localStorage.getItem("user_details"));
    this.inventorDetails = JSON.parse(localStorage.getItem("Inventory"));
    this.loadform();
    this.getMaterialTypes();
  }

  get f() {
    return this.RegistrationForm.controls;
  }

  getMaterialTypes() {
    this.adminservice.getMaterialTypes().subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.materials = resp.data;
      }
    });
  }

  createMaterialType() {
    const params = {
      materialName: this.materialName,
    };
    this.adminservice.createMaterialType(params).subscribe(
      (resp: any) => {
        if (resp) {
          console.log(resp);
          this.dialog.closeAll();
          this.materialName = null;
          this.getMaterialTypes();
        }
      },
      (err) => {
        Swal.fire({
          title: "Already Exits",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  openInvoiceModel(dialogContent) {
    const dialogRef = this.dialog.open(dialogContent, {
      width: "40%",
      data: {},
    });
  }

  loadform() {
    if (this.inventorDetails?.action === "update") {
      this.selectReferRole(this.inventorDetails?.data.type);
      this.RegistrationForm.patchValue({
        type: this.inventorDetails?.data.type,
        typeName: this.inventorDetails?.data?.typeName,
        typeId: this.inventorDetails?.data?.typeId,
        materialName: this.inventorDetails?.data.materialName,
        availabilityQuantity: this.inventorDetails?.data?.availabilityQuantity,
        usedQuantity: this.inventorDetails?.data.usedQuantity,
      });
    } else {
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem("user_token");
    this.userToken = jwt_decode(token);
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  backtolist() {
    this.router.navigateByUrl("/inventory/list");
  }
  submitt() {
    console.log("hello");
    if (this.RegistrationForm.invalid) {
      return;
    }

    const selectType = this.selectTypeName.filter((typeInfo) => {
      return typeInfo.name === this.RegistrationForm?.value?.typeName;
    })?.[0];
    const formData = {
      type: this.RegistrationForm.value.type,
      typeName: selectType.name,
      typeId: selectType._id,
      materialName: this.RegistrationForm.value.materialName,
      availabilityQuantity: this.RegistrationForm.value.availabilityQuantity,
      usedQuantity: this.RegistrationForm.value.usedQuantity,
    };
    console.log(this.inventorDetails?.action);
    console.log(formData);
    if (this.inventorDetails?.action === "add") {
      console.log(this.inventorDetails?.action);
      console.log(formData);
      this.spinner.show();
      this.adminservice.addInventory(formData).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            Swal.fire({
              title: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            });
            this.router.navigateByUrl("/inventory/list");
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.show();
      this.adminservice
        .inventoryUpdate(this.inventorDetails?.data?._id, formData)
        .subscribe(
          (resp) => {
            this.spinner.hide();
            if (resp.statusCode === 200) {
              this.router.navigateByUrl("/inventory/list");
              this.RegistrationForm.reset();

              Swal.fire(resp.message);
            }
          },
          (err) => {
            this.spinner.hide();
          }
        );
    }
  }
  selectReferRole(value) {
    this.selectTypeName = [];
    const role = value;

    const formData: any = {};
    if (role !== "doctor" && role !== "dd-technician" && role !== "rider") {
      (formData.companyId = this.user.company), (formData.category = role);
      this.getLaboratoryDetails(formData);
    } else {
      formData.role = role;
      this.adminservice.usersList(formData).subscribe((resp) => {
        if (resp.statusCode === 200) {
          this.selectTypeName = resp.data.users;
          console.log(this.selectTypeName, "TypeNames");
        }
      });
    }
  }

  getLaboratoryDetails(formData) {
    this.adminservice.getSubdivision(formData).subscribe((res) => {
      this.selectTypeName = res.data.subDivisions;
    });
  }
  checkPageAccess(value: any): any {
    if (this.user.role === "admin") {
      return null;
    } else {
      return this.userToken?.authorities
        ? this.userToken.authorities.includes(value)
          ? null
          : false
        : false;
    }
  }

  checkUsedQTYPageAccess(): any {
    if (this.user.role === "admin") {
      return null;
    } else {
      console.log(
        this.userToken?.authorities
          ? this.userToken.authorities.includes(
              "INVENTORY_USED_QUANTITY_UPDATE"
            ) || this.userToken.authorities.includes("INVENTORY_UPDATE")
            ? null
            : false
          : false
      );

      return this.userToken?.authorities
        ? this.userToken.authorities.includes(
            "INVENTORY_USED_QUANTITY_UPDATE"
          ) || this.userToken.authorities.includes("INVENTORY_UPDATE")
          ? null
          : false
        : false;
    }
  }
}

function quantityValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const availabilityQuantityContole = formGroup.controls[controlName];
    const usedQuantityControle = formGroup.controls[matchingControlName];

    if (usedQuantityControle.value) {
      if (usedQuantityControle.value > availabilityQuantityContole.value) {
        usedQuantityControle.setErrors({ usedQuantityValidator: true });
      } else {
        usedQuantityControle.setErrors(null);
      }
    }
  };
}
