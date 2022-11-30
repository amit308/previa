import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelect } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from "src/app/service/admin.service";
import { HealthService } from "src/app/service/health.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-add-test-packages",
  templateUrl: "./add-test-packages.component.html",
  styleUrls: ["./add-test-packages.component.scss"],
})
export class AddTestPackagesComponent implements OnInit {
  testPackagesFormGroup: FormGroup;
  selectedtestPackages: any;
  companyDetails: any;
  allTests: any;

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect;
  packages: any;
  selectedTests: any;
  patchValues: any;

  /*  for filter with multi select  */

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private readonly HealthService: HealthService,
    private readonly adminService: AdminService,
    private dialogRef: MatDialogRef<AddTestPackagesComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectedtestPackages = data;
    this.testPackagesFormGroup = this.fb.group({
      name: [""],
      tests: [null],
      price: [""],
      code: [""],
      discountPercentage: [""],
      discountPrice: [""],
      basePrice: [""],
    });
  }

  ngOnInit(): void {
    let search = "";
    this.getAllTests(search);
    // this.loadcompanyform();
  }

  changeHandler(event) {
    let value = (<HTMLInputElement>event.target).value;
    // let req = {
    //   search : value
    // }

    this.getAllTests(value);
  }
  calculateDiscountPrice() {
    const basePrice = this.testPackagesFormGroup.value.basePrice;
    const discountPrice = this.testPackagesFormGroup.value.discountPrice;
    const discountPercentage = 100 - (discountPrice / basePrice) * 100;
    if (discountPrice > basePrice) {
      return false;
    }
    this.testPackagesFormGroup.patchValue({
      discountPercentage: discountPercentage.toFixed(2),
    });
  }
  calculateDiscountPercentage() {
    const basePrice = this.testPackagesFormGroup.value.basePrice;
    const discountPercentage =
      this.testPackagesFormGroup.value.discountPercentage;
    const discountPrice = basePrice * (discountPercentage / 100);
    const price = basePrice - discountPrice;
    this.testPackagesFormGroup.patchValue({
      discountPrice: price,
    });
  }
  public getAllTests(req): void {
    this.HealthService.getTest(req).subscribe((res) => {
      if (res.statusCode == 200) {
        console.log(res);
        this.allTests = res.data.tests;
        this.loadcompanyform();
      }
    });
  }

  onFileChange(e) {}
  loadcompanyform() {
    if (this.selectedtestPackages.action === "update") {
      let array = [];
      this.selectedtestPackages.data.tests.forEach((element) => {
        array.push(element._id);
      });
      console.log(this.selectedtestPackages);

      const discountPercentage = (
        100 -
        (this.selectedtestPackages?.data?.discountPrice /
          this.selectedtestPackages?.data?.basePrice) *
          100
      ).toFixed(2);
      console.log({ discountPercentage });

      this.testPackagesFormGroup.patchValue({
        name: this.selectedtestPackages.data.name,
        price: this.selectedtestPackages.data.price,
        tests: array,
        code: this.selectedtestPackages.data.code,
        basePrice: this.selectedtestPackages.data.basePrice,
        discountPercentage:
          discountPercentage == "NaN" || !discountPercentage
            ? 0
            : discountPercentage,
        discountPrice: this.selectedtestPackages.data.discountPrice,
      });
    }
  }

  get o() {
    return this.testPackagesFormGroup.controls;
  }

  addtestPackages() {
    const formData = {
      name: this.testPackagesFormGroup.value.name,
      tests: this.testPackagesFormGroup.value.tests,
      price: this.testPackagesFormGroup.value.discountPrice,
      code: this.testPackagesFormGroup.value.code,
      basePrice: this.testPackagesFormGroup.value.basePrice,
      discountPercentage: this.testPackagesFormGroup.value.discountPercentage,
      discountPrice: this.testPackagesFormGroup.value.discountPrice,
    };
    this.spinner.show();
    this.HealthService.addTestPackages(formData).subscribe(
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
  updatetestPackages() {
    const formData = {
      name: this.testPackagesFormGroup.value.name,
      tests: this.testPackagesFormGroup.value.tests,
      price: this.testPackagesFormGroup.value.discountPrice,
      code: this.testPackagesFormGroup.value.code,
      basePrice: this.testPackagesFormGroup.value.basePrice,
      discountPercentage: this.testPackagesFormGroup.value.discountPercentage,
      discountPrice: this.testPackagesFormGroup.value.discountPrice,
    };
    this.spinner.show();
    this.HealthService.updateTestPackages(
      this.selectedtestPackages.data._id,
      formData
    ).subscribe(
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
        this.spinner.show();
      }
    );
  }
  onClose() {
    this.dialogRef.close();
  }
}
