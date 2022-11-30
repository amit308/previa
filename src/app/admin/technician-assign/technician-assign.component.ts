import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HealthService } from "src/app/service/health.service";
import { formatDate } from "@angular/common";
import { AdminService } from "src/app/service/admin.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { PaginationUtility } from "src/app/shared/pagination/pagination-utility";
import { ThemePalette } from "@angular/material/core";
import * as moment from "moment";

@Component({
  selector: "app-technician-assign",
  templateUrl: "./technician-assign.component.html",
  styleUrls: ["./technician-assign.component.scss"],
})
export class TechnicianAssignComponent implements OnInit {
  technicianListData: any;
  action: string;
  userrole: string;
  selectedTechnician: any;
  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;

  //pagination code ends here
  technicianDetails: any;
  panelOpenState = false;
  technicianInfo: any;
  stepIndex = 0;
  technicians = [];
  patients = [];
  patientdetails: any;
  selectedPatients = [];
  technicianAssignForm: FormGroup;
  patientsArray: FormArray;
  patientTestsArray: FormArray;
  tests = [];
  sampleTestArray = [];
  technicianSlots = [];
  technicianSlot: any;

  @ViewChild("picker") picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = "primary";

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required]),
  });
  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  public dateControlMinMax = new FormControl(new Date());

  public options = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  public listColors = ["primary", "accent", "warn"];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
  latitude: number;
  longitude: number;
  zoom: number;
  constructor(
    private healthService: HealthService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  testControl = "";
  technicianControl = "";
  patientControle = "";

  page: number = 1;
  mySelect = "AssignedToTechnician";
  status = "AssignedToTechnician";

  ngOnInit(): void {
    this.loadTechnicianAssignForm();
    this.getTech();
    this.setCurrentLocation();
  }
  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  openAddress(content) {
    const dialogRef = this.dialog.open(content, {
      width: "40%",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openTests(content, technicianSlot: any) {
    this.technicianInfo = technicianSlot;
    this.getTechnicianSlots("AssignedToTechnician", technicianSlot?._id);
    const dialogRef = this.dialog.open(content, {
      width: "100%",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.technicianSlot = null;
    });
  }

  loadTechnicianAssignForm() {
    this.technicianAssignForm = this.fb.group({
      patientsArray: this.fb.array([]),
    });
  }

  getTechnicians(event) {
    let value = (<HTMLInputElement>event.target).value;
    if (value.length > 2)
      this.healthService.getDDTechnicians(value).subscribe((res) => {
        this.technicians = res.data.users;
      });
  }
  getpatients(event) {
    let value = (<HTMLInputElement>event.target).value;
    if (value.length > 2)
      this.healthService.getPatientsDataBySearch(value).subscribe((res) => {
        this.patients = res.data.patients;
        // this.patientControle = null
      });
  }

  selectedTechnicianInfo(info) {
    this.technicianInfo = info;
    this.technicianControl = null;
    this.getTechnicianSlots("AssignedToTechnician", info?._id);
  }

  // getTechnicianSlots(id) {
  //   this.healthService.getTechnicianSlots({ id: id, status: 'AssignedToTechnician' }).subscribe(res => {
  //     res ? (this.technicianSlots = res?.data?.slots) : null
  //   })
  // }

  selctedPatient(PID) {
    const patient = this.technicianAssignForm.value.patientsArray.filter(
      (p) => {
        return p.pid == PID;
      }
    )?.[0];
    if (patient) {
      alert(`${patient?.name} already added`);
    }
    if (!patient) {
      this.healthService.getPatientsbyPId(PID).subscribe((res) => {
        const patientdetails = res.data;
        console.log(patientdetails, "patientdetails");

        if (patientdetails) this.loadPatientsFormArray(patientdetails);
      });
    }
  }
  removePatient(index) {
    // this.selectedPatients = this.selectedPatients.filter(patient => { return patient.pid != PID })
    (<FormArray>this.technicianAssignForm.get("patientsArray")).removeAt(index);
  }
  loadPatientsFormArray(patient) {
    this.patientsArray = this.technicianAssignForm.get(
      "patientsArray"
    ) as FormArray;

    const filterPackages = [];

    patient.tests.forEach((test) => {
      if (test?.status == "AwaitingSampleTechnician") {
        if (test.isTestPackage == true) {
          const checkPackages = filterPackages.filter((fPackage) => {
            return fPackage.ptId == test?.test?.ptId;
          });
          if (checkPackages.length >= 1) {
            filterPackages.forEach((fp, index) => {
              if (fp?.ptId == test?.test?.ptId) {
                filterPackages[index].tests.push(
                  this.fb.group({
                    _id: test?.test?._id,
                    name: test?.test?.name,
                    sid: test?.sid,
                  })
                );
              }
            });
          } else {
            const obj = {
              _id: test?.package?._id,
              name: test?.package?.name,
              price: test?.package?.price,
              tests: this.fb.array([
                {
                  _id: test?.test?._id,
                  name: test?.test?.name,
                  sid: test?.sid,
                },
              ]),
              isPackage: true,
              isBeforeAdd: true,
              // sid:test?.sid || '',
              instructions: test?.instructions,
              ptId: test?.test?.ptId,
              technicianComment: test?.technicianComments,
            };
            filterPackages.push(obj);
          }
        } else {
          const obj = {
            _id: test?.test?._id,
            name: test?.test?.name,
            price: test?.test?.price,
            tests: [],
            isPackage: false,
            isBeforeAdd: true,
            sid: test?.sid || "",
            instructions: test?.instructions,
            ptId: test?.test?._id,
            technicianComment: test?.technicianComments,
          };
          filterPackages.push(obj);
        }
      }
    });
    console.log({ filterPackages });
    const temptests = [];
    filterPackages.forEach((fp) => {
      temptests.push(this.fb.group(fp));
    });
    this.patientsArray.push(
      this.fb.group({
        _id: [patient?._id],
        name: [patient?.name],
        pid: [patient?.pid],
        address: [patient?.address],
        sampleCollectionDate: [formatDate(new Date(), "yyyy-MM-dd", "en")],
        sampleCollectionTime: [moment().format("LT")],
        patientTestsArray: this.fb.array(temptests),
      })
    );
    // this.loadPatienTestsFormArray(patient.tests)
  }
  loadPatienTestsFormArray(tests) {
    const sampleTests = [];

    tests.forEach((test) => {
      if (test?.status == "AwaitingSampleTechnician")
        sampleTests.push(
          this.fb.group({
            _id: test?.test?._id,
            name: test?.test?.name,
            displayName: test?.test?.displayName,
            pTestId: test._id,
            price: test?.test?.price || "",
            isBeforeAdd: true,
            sid: test?.sid || "",
            packageId: test?.package || "",
            packageName: test?.name || "",
            packagePrice: test?.price || "",
          })
        );
    });
    return sampleTests;
  }

  getTests(event) {
    let value = (<HTMLInputElement>event.target).value;
    if (value)
      this.healthService.getSearchTestsPackages(value, id).subscribe((res) => {
        this.tests = res.data;
      });
  }

  onChangeTestValue(event, patientIndex) {
    this.sampleTestArray = [];
    console.log({ event });
    if (event.type === "package") {
      this.adminService.gettestpackagesByid(event._id).subscribe((res) => {
        // this.filterPackages(res.data, patientIndex)
        this.filterNewpackages(res.data, patientIndex);
      });
    } else {
      this.healthService.getTestsById(event._id).subscribe((res) => {
        const packageInfo = null;
        // this.filterTests(res.data, patientIndex, packageInfo)
        this.filterNewTests(res.data, patientIndex);
      });
    }
    this.testControl = null;
  }
  filterNewpackages(packageInfo, patientIndex) {
    let patients = this.technicianAssignForm.value.patientsArray[patientIndex];
    if (
      patients.patientTestsArray.filter((test) => {
        return test?._id == packageInfo._id;
      })?.[0]
    ) {
      alert(`${packageInfo?.name} already added`);
    } else {
      let isDuplicateTest = false;
      const packageTests = this.filterPackageTestsCheck(
        packageInfo?.tests || []
      );
      packageTests.forEach((test) => {
        patients.patientTestsArray.forEach((sTest, index) => {
          if (sTest._id == test._id) {
            isDuplicateTest = true;
            alert(`${test?.name}  already added`);
          }
        });
      });
      if (!isDuplicateTest) {
        const obj = {
          _id: packageInfo?._id,
          name: packageInfo?.name,
          price: packageInfo?.price,
          tests: this.fb.array(
            this.filterPackageTests(packageInfo?.tests || [])
          ),
          isPackage: true,
          isBeforeAdd: false,
          sid: "",
          instructions: "",
          technicianComment: "",
        };
        this.patientTests(patientIndex).push(this.fb.group(obj));

        // let patient = this.technicianAssignForm.value.patientsArray[patientIndex]
        // console.log('test', this.technicianAssignForm.value)
        // console.log({ patient })
      }
    }
  }
  loadPatienPackageTestsFormArray(tests) {
    const sampleTests = [];

    tests.forEach((test) => {
      if (test?.status == "AwaitingSampleTechnician")
        sampleTests.push(
          this.fb.group({
            _id: test?.test?._id,
            name: test?.test?.name,
            displayName: test?.test?.displayName,
            pTestId: test._id,
            price: test?.test?.price || "",
            isBeforeAdd: true,
            sid: test?.sid || "",
            packageId: test?.package || "",
            packageName: test?.name || "",
            packagePrice: test?.price || "",
          })
        );
    });
    return sampleTests;
  }
  filterPackageTests(packageTests) {
    let tempTests = [];

    packageTests.forEach((test) => {
      if (test?.subTests?.length === 0) {
        tempTests.push(test);
      }
      if (test?.subTests?.length > 0) {
        for (let i = 0; i < test?.subTests?.length; i++) {
          if (test?.subTests[i].subTests?.length === 0) {
            tempTests.push(test?.subTests[i]);
          } else if (test?.subTests[i].subTests?.length > 0) {
            for (let j = 0; j < test?.subTests[i].subTests.length; j++) {
              tempTests.push(test?.subTests[i].subTests[j]);
            }
          }
        }
      }
    });
    const temp = tempTests.filter((item) => {
      return item.isTest === true;
    });
    const temp1 = [];
    temp.forEach((test) => {
      temp1.push(
        this.fb.group({
          _id: test?._id,
          name: test?.name,
          // displayName: test?.test?.displayName,
          pTestId: test._id,
          price: test?.price || "",
          isBeforeAdd: false,
          sid: "",
        })
      );
    });
    return temp1;
  }

  filterPackageTestsCheck(packageTests) {
    let tempTests = [];

    packageTests.forEach((test) => {
      if (test?.subTests?.length === 0) {
        tempTests.push(test);
      }
      if (test?.subTests?.length > 0) {
        for (let i = 0; i < test?.subTests?.length; i++) {
          if (test?.subTests[i].subTests?.length === 0) {
            tempTests.push(test?.subTests[i]);
          } else if (test?.subTests[i].subTests?.length > 0) {
            for (let j = 0; j < test?.subTests[i].subTests.length; j++) {
              tempTests.push(test?.subTests[i].subTests[j]);
            }
          }
        }
      }
    });
    const temp = tempTests.filter((item) => {
      return item.isTest === true;
    });

    return temp;
  }
  filterNewTests(test, patientIndex) {
    let temp = [];
    const patients =
      this.technicianAssignForm.value.patientsArray[patientIndex];

    patients.patientTestsArray.forEach((sampleTest) => {
      if (sampleTest.isPackage == true) {
        sampleTest?.tests.forEach((test) => {
          temp.push(test);
        });
      } else {
        temp.push(sampleTest);
      }
    });
    let tempTests = [];
    if (test?.subTests?.length === 0) {
      const filterTest = temp.filter((res) => {
        return res._id === test._id;
      });
      if (filterTest.length === 0) {
        tempTests.push(test);
      } else {
        alert(`${test.name} Already Added`);
      }
    }

    if (test?.subTests?.length > 0) {
      for (let i = 0; i < test?.subTests?.length; i++) {
        if (test?.subTests[i].subTests?.length === 0) {
          const filterSubTest = temp.filter((res) => {
            return res._id === test?.subTests[i]._id;
          });
          if (filterSubTest.length === 0) {
            this.sampleTestArray.push(test?.subTests[i]);
          } else {
            alert(` ${test?.subTests[i].name} already added`);
          }
          tempTests.push(test?.subTests[i]);
        } else if (test?.subTests[i].subTests?.length > 0) {
          for (let j = 0; j < test?.subTests[i].subTests.length; j++) {
            tempTests.push(test?.subTests[i].subTests[j]);
          }
        }
      }
    }
    const filterTempTests = tempTests.filter((res) => {
      return res.isTest === true;
    });
    filterTempTests.forEach((test) => {
      const obj = {
        _id: test?._id,
        name: test?.name,
        price: test?.price,
        tests: [],
        isPackage: false,
        isBeforeAdd: false,
        sid: "",
        instructions: "",
        technicianComment: "",
      };
      this.patientTests(patientIndex).push(this.fb.group(obj));
    });
  }

  filterPackages(res, patientIndex) {
    const packages = res.tests;
    const packageInfo = res;
    for (let i = 0; i < packages?.length; i++) {
      const element = packages[i];
      this.filterTests(element, patientIndex, packageInfo);
    }
  }

  filterTests(res, patientIndex, packageInfo) {
    const array = res;
    if (array?.subTests?.length === 0) {
      const filterTest = this.sampleTestArray.filter((res) => {
        return res._id === array._id;
      });
      if (filterTest.length === 0) {
        this.sampleTestArray.push(array);
      } else {
        alert(`${array.name} Already Added`);
      }
    }

    if (array?.subTests?.length > 0) {
      for (let i = 0; i < array?.subTests?.length; i++) {
        if (array?.subTests[i].subTests?.length === 0) {
          const filterSubTest = this.sampleTestArray.filter((res) => {
            return res._id === array?.subTests[i]._id;
          });
          if (filterSubTest.length === 0) {
            this.sampleTestArray.push(array?.subTests[i]);
          } else {
            alert(` ${array?.subTests[i].name} already added`);
          }
        } else if (array?.subTests[i].subTests?.length > 0) {
          for (let j = 0; j < array?.subTests[i].subTests.length; j++) {
            const filterSubTest = this.sampleTestArray.filter((res) => {
              return res._id === array?.subTests[i].subTests[j]._id;
            });
            if (filterSubTest.length === 0) {
              this.sampleTestArray.push(array?.subTests[i].subTests[j]);
            } else {
              alert(`${array?.subTests[i].subTests[j].name} already added`);
            }
          }
        }
      }
    }
    this.sampleTestArray = this.sampleTestArray.filter((res) => {
      return res.isTest === true;
    });
    let patient = this.technicianAssignForm.value.patientsArray[patientIndex];

    const tests = [];
    this.sampleTestArray.forEach((test) => {
      const checkExitTest = patient.patientTestsArray.filter((pTest) => {
        return pTest._id == test._id;
      })?.[0];
      checkExitTest ? null : tests.push(test);
    });

    tests.forEach((test) => {
      this.patientTests(patientIndex).push(
        this.fb.group({
          _id: test?._id,
          name: test?.name,
          displayName: test?.displayName,
          price: test?.price || "",
          isBeforeAdd: false,
          sid: "",
          packageId: packageInfo?._id || "",
          packageName: packageInfo?.name || "",
          packagePrice: packageInfo?.price || "",
        })
      );
    });
    // console.log('patientsForm', this.technicianAssignForm.value.patientsArray)
    // console.log('sampleTestArray', this.sampleTestArray)
    // console.log('tests', tests)
  }

  patientsForm(): FormArray {
    return this.technicianAssignForm.get("patientsArray") as FormArray;
  }
  patientTests(pi): FormArray {
    return this.patientsForm().at(pi).get("patientTestsArray") as FormArray;
  }

  removeTest(test: any, pI: number, tI: number) {
    console.log({ pI, tI });
    console.log(test.value);
    const testInfo = test.value;
    console.log(testInfo, "testInfo");

    if (testInfo?.isBeforeAdd) {
      this.removePatientTest(testInfo?._id);
      this.patientTests(pI).removeAt(tI);
    }
    if (!testInfo?.isBeforeAdd) {
      this.patientTests(pI).removeAt(tI);
    }
  }
  addPatient() {
    this.router.navigateByUrl("/admin/patient");
  }

  assignPatients() {
    // this.spinner.show()
    const patients = [];
    const patientsArray = this.technicianAssignForm.value.patientsArray;
    patientsArray.forEach((patient) => {
      const tests = [];
      const packageTests = [];
      patient.patientTestsArray.forEach((pt) => {
        // !pt.isBeforeAdd &&
        if (!pt.isPackage) {
          tests.push({
            test: pt?._id,
            value: "",
            comment: "",
            instructions: pt?.instructions,
            sid: pt?.sid || "",
          });
        }
        // !pt.isBeforeAdd &&
        if (pt.isPackage) {
          const pTests = [];
          pt?.tests.forEach((ptest) => {
            console.log(ptest);
            const testObj = {
              test: ptest?._id,
              value: "",
              comment: "",
              instructions: pt?.instructions,
              sid: ptest?.sid || "",
            };
            pTests.push(testObj);
          });
          const obj = {
            package: pt?._id,
            tests: pTests,
          };
          packageTests.push(obj);
        }
      });
      const obj = {
        patient: patient?._id,
        location: patient?.address,
        date: moment(
          new Date(
            `${patient?.sampleCollectionDate} ${patient?.sampleCollectionTime}`
          )
        ).format("MM/DD/YYYY h:mm a"),
        tests: tests,
        packages: packageTests,
      };
      patients.push(obj);
    });
    const obj = {
      techincin: this.technicianInfo?._id,
      patients: patients,
    };

    // console.log('obj',JSON.stringify(obj))
    // this.healthService.technicianAssign(obj).subscribe(res => {
    //   Swal.fire('Assigned SuccessFully')
    //   this.spinner.hide()
    //   this.technicianInfo = null
    //   this.patientControle = null
    //   this.loadTechnicianAssignForm();
    //   this.technicians = []
    //   this.patients = []
    //   this.getTech()
    // })
  }

  removePatientTest(id) {
    console.log(id, "id");

    this.healthService.deletePatientTestById(id).subscribe((res) => {});
  }

  getTechnician(formData) {
    this.adminService.technicianList(formData).subscribe((resp) => {
      if (resp.statusCode == 200) {
        const technicianList = resp?.["data"]?.["users"];
        this.technicianListData = technicianList?.filter((tech) => {
          return tech?.isOnline == true;
        });

        this.length = this.technicianListData.length;
        console.log(this.technicianListData, "technicianListData");
      }
    });
  }

  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getTech();

    console.log("page", this.pageEvent?.pageIndex, this.pageEvent?.pageSize);
  }

  getTech() {
    let formData = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );
    formData["role"] = "dd-technician";
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue;
      formData["sortOrder"] = this.sortDirection;
    }
    this.getTechnician(formData);
  }

  selectTechnician(techincin) {
    this.technicianInfo = techincin;
    // this.getTechnicianSlots(techincin?._id)
  }

  backToTechnicians() {
    if (this.technicianInfo) {
      const tempdata = this.technicianListData.filter((techni) => {
        return techni._id != this.technicianInfo._id;
      });
      this.technicianListData = tempdata;
      this.technicianListData.push(this.technicianInfo);
      this.technicianListData.reverse();
    }
  }

  toggleMinDate(evt: any) {
    if (evt.checked) {
      this._setMinDate();
    } else {
      this.minDate = null;
    }
  }

  toggleMaxDate(evt: any) {
    if (evt.checked) {
      this._setMaxDate();
    } else {
      this.maxDate = null;
    }
  }

  closePicker() {
    this.picker.cancel();
  }

  private _setMinDate() {
    const now = new Date();
    // this.minDate = new Date();
    // this.minDate.setDate(now.getDate() - 1);
  }

  private _setMaxDate() {
    const now = new Date();
    // this.maxDate = new Date();
    // this.maxDate.s(now.getDate() + 1);
  }

  public statuss = [
    {
      viewName: "CollectedByTechnician",
      status: "CollectedByTechnician",
    },
    {
      viewName: "AssignedToTechnician",
      status: "AssignedToTechnician",
    },
    {
      viewName: "All",
      status: "",
    },
  ];

  getTechnicianSlots(selectType, id) {
    let status = "";

    if (selectType === "CollectedByTechnician") {
      status = "CollectedByTechnician";
    }
    if (selectType === "AssignedToTechnician") {
      status = "AssignedToTechnician";
    }
    if (selectType === "All") {
      status = "";
    }

    this.healthService
      .getTechnicianSlots({ id: id, status })
      .subscribe((res) => {
        if (res.statusCode == 200) {
          res ? (this.technicianSlots = res?.data?.slots) : null;
        } else {
          this.technicianSlots = [];
        }
      });
  }

  selectChange(event) {
    this.page = 1;
    this.status = event.target.value;

    this.getTechnicianSlots(this.status, this.technicianInfo._id);
  }
}
function id(value: string, id: any) {
  throw new Error("Function not implemented.");
}
