import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from "src/app/service/admin.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-subdivision",
  templateUrl: "./add-subdivision.component.html",
  styleUrls: ["./add-subdivision.component.scss"],
})
export class AddSubdivisionComponent implements OnInit {
  public countries = [
    // {
    //   id: 1,
    //   name: 'Albania',
    // },
    // {
    //   id: 2,
    //   name: 'Belgium',
    // },
    // {
    //   id: 3,
    //   name: 'usa',
    // },
    // {
    //   id: 4,
    //   name: 'Montenegro',
    // },
    // {
    //   id: 5,
    //   name: 'Turkey',
    // },
    // {
    //   id: 6,
    //   name: 'Ukraine',
    // },
    // {
    //   id: 7,
    //   name: 'Macedonia',
    // },
    // {
    //   id: 8,
    //   name: 'Slovenia',
    // },
    // {
    //   id: 9,
    //   name: 'Georgia',
    // },
    {
      id: 1,
      name: "India",
    },
    // {
    //   id: 11,
    //   name: 'Russia',
    // },
    // {
    //   id: 12,
    //   name: 'Switzerland',
    // }
  ];
  branchForm: FormGroup;
  subDivisionDetails: any;
  responceMessage: any;
  isSubmit: boolean = false;
  testStatus: FormArray;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.subDivisionDetails = JSON.parse(localStorage.getItem("subdivision"));
    this.loadbranchForm();
    this.lodform();
  }

  ngOnInit(): void {
    console.log("subdivisionDetails", this.subDivisionDetails);
  }
  loadbranchForm() {
    console.log(this.branchForm, "hdsfjsg");

    this.branchForm = this.fb.group({
      category: [{ value: this.subDivisionDetails?.role, disabled: true }],
      name: ["", Validators.required],
      type: [""],
      enableSMS: [false],
      enableEmail: [false],
      enableScheme: [false],
      enableTokenSystem: [false],
      description: [""],
      invoiceFooter: [""],
      paddingCode: [""],
      country: [""],
      state: [""],
      city: [""],
      street: [""],
      mobile: ["", Validators.required],
      phone: [""],
      pin: ["", Validators.required],
      contactPerson: [""],
      user_name: [""],
      password: [""],
      portal_api: [""],
      statusName: [""],
      statusDisplayName: [""],
      testStatus: new FormArray([]),
    });
  }
  get f() {
    return this.branchForm.controls;
  }

  createStatus() {
    return this.fb.group({
      name: [""],
      displayName: [""],
    });
  }

  lodform() {
    if (this.subDivisionDetails?.action === "update") {
      this.branchForm.patchValue({
        category: this.subDivisionDetails?.data.category,
        name: this.subDivisionDetails?.data.name,
        type: this.subDivisionDetails?.data.type,
        enableSMS: this.subDivisionDetails?.data.enableSMS,
        enableEmail: this.subDivisionDetails?.data.enableEmail,
        enableScheme: this.subDivisionDetails?.data.enableScheme,
        enableTokenSystem: this.subDivisionDetails?.data.enableTokenSystem,
        description: this.subDivisionDetails?.data.description,
        invoiceFooter: this.subDivisionDetails?.data.invoiceFooter,
        paddingCode: this.subDivisionDetails?.data.paddingCode,
        country: this.subDivisionDetails?.data.country,
        state: this.subDivisionDetails?.data.state,
        city: this.subDivisionDetails?.data.city,
        street: this.subDivisionDetails?.data.street,
        mobile: this.subDivisionDetails?.data.mobile,
        phone: this.subDivisionDetails?.data.phone,
        pin: this.subDivisionDetails?.data.pin,
        contactPerson: this.subDivisionDetails?.data.contactPerson,
      });
    }
  }
  onSubmit() {
    this.isSubmit = true;
    this.dynamicFormValidation();
    if (this.branchForm.invalid) {
      alert("Please Enter Valid  Details");
      return;
    }
    const formdata = this.branchForm.value;
    console.log(this.branchForm.value);
    formdata["category"] = this.subDivisionDetails?.role;
    if (this.subDivisionDetails?.action === "add") {
      this.spinner.show();
      this.adminService.addSubdivision(this.branchForm.value).subscribe(
        (res) => {
          this.spinner.hide();
          const testStatus = this.branchForm.value.testStatus;
          const data = testStatus.map((testS) => {
            return {
              name: testS.name,
              displayName: testS.displayName,
              subDivision_id: res?.data?._id,
            };
          });
          this.addTestStatus(data);
          if (res.statusCode === 200) {
            this.sweetAlert(res);
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.show();
      this.adminService
        .updateSubdivision(this.subDivisionDetails.data._id, formdata)
        .subscribe(
          (res) => {
            this.spinner.hide();
            const testStatus = this.branchForm.value.testStatus;
            const data = testStatus.map((testS) => {
              return {
                name: testS.name,
                displayName: testS.displayName,
                subDivision_id: this.subDivisionDetails.data._id,
              };
            });
            this.addTestStatus(data);

            if (res.statusCode === 200) {
              this.sweetAlert(res);
            }
          },
          (err) => {
            this.spinner.hide();
          }
        );
    }
  }

  addTestStatus(reqData) {
    this.adminService
      .createOrgTestStatus({ testStatus: reqData })
      .subscribe((data) => {});
  }

  sweetAlert(res) {
    if (res?.statusCode === 200) {
      Swal.fire({
        title: "WelCome!",
        text: `${res?.message}`,
        icon: "success",
        confirmButtonText: "ok",
      }).then((result) => {
        if (this.subDivisionDetails?.role === "branch") {
          this.router.navigateByUrl("/admin/branch");
        } else if (this.subDivisionDetails?.role === "hospital") {
          this.router.navigateByUrl("/admin/hospital");
        } else if (this.subDivisionDetails?.role === "location") {
          this.router.navigateByUrl("/admin/location");
        } else {
          this.router.navigateByUrl("/admin/laboratory");
        }
        localStorage.removeItem("subdivision");
      });
    }
  }

  clearForm() {
    this.branchForm.reset();
    this.loadbranchForm(), (this.subDivisionDetails["action"] = "add");
    this.branchForm.patchValue({
      category: this.subDivisionDetails?.role,
    });
  }
  checkIfNumber(e) {
    e = e || window.event;
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (
      !charStr.match(/^[0-9]+$/) ||
      this.branchForm.value.mobile?.length == 10
    ) {
      e.preventDefault();
    }
  }
  checkIfNumber1(e) {
    e = e || window.event;
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (
      !charStr.match(/^[0-9]+$/) ||
      this.branchForm.value.phone?.length == 10
    ) {
      e.preventDefault();
    }
  }
  checkIfNumber3(e) {
    e = e || window.event;
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/) || this.branchForm.value.pin?.length == 6) {
      e.preventDefault();
    }
  }
  dynamicFormValidation() {
    const pForm = this.branchForm;
    const tempArray = ["", null, undefined];
    tempArray.includes(pForm.value.mobile)
      ? (pForm.get("mobile").clearValidators(),
        pForm.get("mobile").updateValueAndValidity())
      : (pForm
          .get("mobile")
          .setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]),
        pForm.get("mobile").updateValueAndValidity());
    tempArray.includes(pForm.value.pin)
      ? (pForm.get("pin").clearValidators(),
        pForm.get("pin").updateValueAndValidity())
      : (pForm
          .get("pin")
          .setValidators([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ]),
        pForm.get("pin").updateValueAndValidity());
  }
  addStatus() {
    const { statusName, statusDisplayName } = this.branchForm.value;
    this.testStatus = this.branchForm.get("testStatus") as FormArray;

    this.testStatus.push(
      this.fb.group({
        name: statusName,
        displayName: statusDisplayName,
      })
    );

    this.branchForm.patchValue({
      statusName: [""],
      statusDisplayName: [""],
    });
    console.log(this.branchForm.value);
  }

  removeTest(index) {
    this.testStatus = this.branchForm.get("testStatus") as FormArray;
    this.testStatus.removeAt(index);
  }
}
