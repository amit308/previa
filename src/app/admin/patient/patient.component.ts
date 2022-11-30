import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPrinterService } from "ngx-printer";
import { BehaviorSubject, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { AdminService } from "src/app/service/admin.service";
import { BroadcastService } from "src/app/service/broadcast.service";
import { HealthService } from "src/app/service/health.service";
import Swal from "sweetalert2";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InteractionMode } from "igniteui-angular";
import { config } from "src/config";
import * as moment from "moment";
import { MapsAPILoader } from "@agm/core";
import { formatDate } from "@angular/common";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { PaginationUtility } from "src/app/shared/pagination/pagination-utility";
import { PageEvent } from "@angular/material/paginator";
// import { DataServiceService } from "../../service/data-service.service";
import { IgxDaysViewNavigationService } from "igniteui-angular/lib/calendar/days-view/daysview-navigation.service";
// import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap'

// import { AmazingTimePickerService } from 'amazing-time-picker'; // this line you need
@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"],
})
export class PatientComponent implements OnInit {
  // model: NgbDateStruct; 


  message:string;
  // subscription!: Subscription;
  [x: string]: any;
  icon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00c9d1";

  proofDetails = ["Voter Id", "PassPort ID", "License"];
  months: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  reasonForm: FormGroup;
  minDate = moment(new Date()).format("YYYY-MM-DD");
  strIntoObj: any;
  doseValue: any;
  // map ode start
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  technicianListData: any;
  user_address: any;
  @ViewChild("searchtext")
  public searchElementRef: ElementRef;
  invalidRecordsData: any;
  invalidRecords: any;
  patientsOrgData: any;
  Subdivision_id: any;
  hospitalId: any;
  userdetails: any;
  bulkPatients: any;
  errormessage: any;
  errormessage1: any;
  organizations: any;
  filteredOrganizations: any = [];
  selectedSearchAddress: any;
  deliveryAddress: any;
  deliverylat: any;
  deliverylang: any;
  addressIndex: any;
  addressTypeFlag = false;
  // map code end
  selected_test_id: any;
  isVisible: any;
  isSelected: boolean = true;
  dobSelected: boolean = true;
  ageSelected: boolean = true;
  selectedDate: any;
  selectedBillingDate: any;
  timePickerMin: string = "";
  scheduled_Hour: any;
  patientaccshow: string;
  vaccineaccshow: string;
  testaccshow: string;
  pastaccshow: string;
  familyaccshow: string;
  questionnaireshow: string;
  billingshow: string;
  data: boolean;
  testname: any;
  patientRegistrationForm: FormGroup;
  details: FormGroup;
  patientdetailsdata: any;
  pid: any;
  date: any = null;

  value: any = "1234567";
  age: number;
  tests: any;
  showForm: boolean;
  barCodeValue: any;
  printId: string;
  showQuestioner: boolean = false;
  myForm: FormGroup;
  vaccineForm: FormGroup;
  questionariesDetails: any;
  showqrcode: boolean;
  elementType: "url" | "canvas" | "img" = "url";
  createdAt: any;
  pdfSrc = "./assets/PreviaLogo.png";
  doctorReviewshow: string;
  showUploadFiles: boolean = false;
  uploadFilesData: any = [];
  uploadFilesDetails: any;
  file: any;
  image = config.url;
  imageView: any;
  removeTestFormFlag: boolean;
  testArray = [];
  sampleTestArray = [];
  defaultTestPackages: any;
  updateTestsForm: FormGroup;
  testsDetails: any;
  testId: any;
  resMessage: any;
  submitted: boolean = false;
  currentItem: any;
  templateViewContent: any;
  public Editor = ClassicEditor;
  closeResult = "";
  productSub: any;
  showQuestionnaireView: boolean = false;
  disbalePIDInput: boolean = true;
  isDefaultTestPackage: boolean = false;
  hideScannerbutton: boolean = false;
  @ViewChild("search") searchElement: ElementRef;
  public mode: InteractionMode = InteractionMode.DropDown;
  public format: string = "hh:mm tt";
  patientTestsArray: FormArray;
  testReportUrl = environment.testReportBaseurl;
  width = 100;
  height = 100;

  // referRoles = ['self', 'lab', 'doctor'];
  referRoles = [
    { name: "Self", displayName: "Self" },
    { name: "hospital", displayName: "Hospital" },
    { name: "lab", displayName: "Lab" },
    { name: "doctor", displayName: "Doctor" },
    { name: "location", displayName: "Location" },
    { name: "branch", displayName: "Branch" },
  ];
  res: any;
  referRoleList = [];
  user: any;
  sampleDate: any;
  invalidid: any;
  patientCreatedBy: any;
  isSubDivisionPatient = true;
  templeteForm: FormGroup;
  selectedDownloadTest: any;
  testDetails: any;
  selectedTestInfoObj = {};
  organizationName: any;
  subdivisionInfo: any;
  totalPaidAmount: number = 0;
  totalAmount: number = 0;
  disabled = false;
  showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
  stepMinutes = [0o0, 15, 30, 45];
  stepHour = 1;
  stepMinute = 15;
  stepSecond = 1;
  isBold: boolean = false;
  // defaultTime = [new Date().getHours, 0o0 , 0o0]
  selectedPayment = "Cash";
  paymentTypes = ["Cash", "Cheque"];
  paymentLinkType = "sms";
  data1: any;
  dateValue = null;
  patientpaymentObj: any = {
    patient: "",
    tests: [],
    billAmount: 0,
    totalAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    discountAmount: 0,
    discountPercentage: 0,
    otherCharges: 0,
    comments: "",
    transactionType: "Patient",
    paymentInfo: {
      paymentType: "",
      chequeNo: "",
      chequeDate: "",
    },
  };

  transactions: any = [];
  panelOpenState: boolean = false;
  selectValue: any;
  billingRes: any;

  userData: any;
  userDta: any;
  selectedHospital: any;
  action: string;

  userrole: string;
  hospitalDetails: any;
  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  //pagination code ends here
  searchValue: any = "";
  selectOrganization: any;

  referredTypeValue;
  referredByValue;

  constructor(
    // private dataService : DataServiceService,
    public cdRef: ChangeDetectorRef,

    private fb: FormBuilder,
    private healthService: HealthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private printerService: NgxPrinterService,
    private broadcastServicde: BroadcastService,
    private sanitizer: DomSanitizer,
    private adminService: AdminService,
    private health: HealthService,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.hide();
    this.vaccineForm = this.fb.group({
      vaccineName: [""],
      vaccinatedDate: ["", Validators.required],
      vaccinationDose: [""],
      noOfPersons: [""],
      vaccinationStatus: [""],
      technician_id: ["", Validators.required],
    });

    this.patientRegistrationForm = this.fb.group({
      PID: [""],
      subdivision_id: [""],
      name: ["", Validators.required],
      DOB: [""],
      gender: ["", Validators.required],
      mobileNumber: [""],
      emailAddress: [""],
      aadhaar: [""],
      latitude: [""],
      longitude: [""],
      address: [""],
      address2: [""],
      kycDetails: [""],
      city: [""],
      state: [""],
      referredByType: [""],
      referredByCode: [""],
      referredByName: [""],
      habits: [""],
      economicStatus: [""],
      lifeStyle: [""],
      occupation: [""],
      proofType: [""],
      proofValue: [""],
      paidAmount: [""],
      passport: [""],
      isReferralPatient: [false],
      details: this.fb.group({
        height: [""],
        weight: [""],
        BMI: [""],
        BP: [""],
        acuityOfVision: [""],
        bloodGroup: [""],
        temperature: [""],
        comment: [""],
      }),
      patientTestsArray: this.fb.array([]),
      medicalHistory: this.fb.array([this.medicalHistoryDetailsForm()]),
      familyHistory: this.fb.array([this.familyHistoryDetailsForm()]),
      sampleTestArray: this.fb.array([this.patientTestDetailsForm()]),
      doctorReview: this.fb.array([this.doctorReviewForm()]),
    });

    // this.patientRegistrationForm.get('proofType').valueChanges.subscribe(val=> {
    //   //  this.submitted=true
    //   //  console.log(changeValue);

    //  if(val!=='other') {

    //   this.patientRegistrationForm.get('proofValue').setValidators(Validators.required);
    //   this.patientRegistrationForm.get('proofValue').updateValueAndValidity();
    // } else if(!this.submitted){
    //   this.patientRegistrationForm.get('proofValue').clearValidators();
    //    this.patientRegistrationForm.get('proofValue').updateValueAndValidity();
    // }})

    this.updateTestsForm = this.fb.group({
      test: [""],
      value: [null],
      comment: [null],
      id: [""],
    });

    this.reasonForm = this.fb.group({
      cancel_reason: ["", Validators.required],
    });

    this.timePickerMin = moment().format("LT");
    this.user = JSON.parse(localStorage.getItem("user_details"));
    this.templeteForm = this.fb.group({
      header_type: [""],
      template_type: [""],
      promotionPage: [true],
    });
  }
  myControl = new FormControl();
  testControl = "";
  options = [];
  bulkUploadForm: FormGroup;
  transactionLog$: any = [];

  //  options: Observable<string[]>
  filteredOptions: Observable<any>;
  get f() {
    return this.patientRegistrationForm.controls;
  }
  get l() {
    return this.vaccineForm.controls;
  }
  getpatients(event) {
    let value = (event.target as HTMLInputElement).value;
    if (value) {
      this.healthService.getPatientsDataBySearch(value).subscribe((res) => {
        this.options = res.data.patients;
      });
    } else {
      this.options = [];
    }
  }

  myFormtest: FormGroup;
  subdivisionName: string;
  ngOnInit(): void {
    this.getHospital();
    this.getQuestionaries();
    this.getTestDetails();
    this.getTechnician();
    this.dateValue = moment(new Date()).format("DD-MM-YYYY");
    const pid = localStorage.getItem("pid");
    this.userdetails = JSON.parse(localStorage.getItem("user_details"));

    this.healthService.getUserById().subscribe((res) => {
      this.subdivisionInfo = res?.subdivisionInfo;
      this.loadBulkUploadForm();
    });
    this.getOrganizationData();
    if (pid) {
      this.hideScannerbutton = true;
      this.onFileChange(pid);
      localStorage.removeItem("pid");
      this.loadPatientMap();
    } else {
      this.loadMap();
    }
    if (
      (this.user.subdivision_id ==
        this.patientRegistrationForm.value.subdivision_id ||
        this.patientRegistrationForm.value.subdivision_id == "") &&
      this.patientRegistrationForm.value.isReferralPatient == false
    ) {
      this.isSubDivisionPatient = true;
    } else {
      this.isSubDivisionPatient = false;
    }

    if (pid) {
    }
  }
  selectOrg(info) {
    console.log(info);
    this.hospitalId = info._id;
    if (info && info._id) {
      this.referredTypeValue = "hospital";
      this.referredByValue = info._id;
      this.selectReferRole("hospital");
    } else {
      this.referredTypeValue = null;
      this.referredByValue = null;
    }
    this.informer = info.category;
    localStorage.setItem("category", info.category);
  }
  get patientTestsArr(): FormArray {
    return this.patientRegistrationForm.controls[
      "patientTestsArray"
    ] as FormArray;
  }
  assignOrg() {
    const itemmmm = localStorage.getItem("category");
    this.dialog.closeAll();
    if (this.patientRegistrationForm.value.patientTestsArray?.length > 0) {
      // let control = this.patientRegistrationForm.controls['patientTestsArray'] as FormArray;
      // this.patientTestsArr.patchValue([{referredType:itemmmm}]);
      let index = 0; // or 1 or 2
      (<FormArray>this.patientRegistrationForm.controls["patientTestsArray"])
        .at(index)
        .patchValue("example");
      // control.patchValue([referredType:itemmmm]);
      //
    }
  }
  getHospitalsData(data) {
    const dialogRef = this.dialog.open(data, {
      // width: '40%',
      data: {},
    });
  }
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getHospital();
  }

  getHospital() {
    let formData = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue;
      formData["sortOrder"] = this.sortDirection;
    }
    this.getHospitalDetails(formData);
  }

  getHospitalDetails(formData) {
    (formData["companyId"] = this.user.company),
      (formData["category"] = "hospital");
    if (this.searchValue) {
      formData["search"] = this.searchValue;
    }
    this.adminService.getSubdivision(formData).subscribe((res) => {
      this.hospitalDetails = res.data.subDivisions.sort((a, b) =>
        a.name < b.name ? -1 : 1
      );

      this.length = res.data.total_count;
    });
  }

  public sortEvent(event): void {
    if (this.sortvalue === event) {
      this.sortDirection = this.sortDirection === "ASC" ? "DASC" : "ASC";
    } else {
      this.sortDirection = "ASC";
    }

    this.sortvalue = event;

    let formData = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );

    formData["sortBy"] = this.sortvalue;
    formData["sortOrder"] = this.sortDirection;
    this.getHospitalDetails(formData);
    // this.getAgentCounselors(formData)
  }
  searchHospital() {
    if (this.searchValue.length > 0) {
      this.getHospital();
    }
    if (!this.searchValue) {
      this.getHospital();
    }
  }

  paymentChange(event) {
    this.selectedPayment = event.value;
  }
  //   percentage(event){
  //     const Amount=this.patientpaymentObj.totalAmount
  //     const discountPercentage_table = event.target.value;
  //     if(discountPercentage_table <= 100){

  //     const discountPrice_table = Amount * (discountPercentage_table / 100);
  //     this.patientpaymentObj.discountAmount = discountPrice_table.toFixed(0)
  //     // this.patientpaymentObj.discountPercentage=event.target.value
  //     this.patientpaymentObj.totalAmount=(this.patientpaymentObj.billAmount-this.patientpaymentObj.discountAmount).toFixed(0)
  //     this.patientpaymentObj.dueAmount=this.patientpaymentObj.totalAmount;
  //   }
  // }
  //   amount(){

  //   }
  loadBulkUploadForm() {
    this.Subdivision_id = this.subdivisionInfo?._id
      ? this.subdivisionInfo._id
      : "";
    this.bulkUploadForm = this.fb.group({
      subdivisionID: [
        this.subdivisionInfo?._id ? this.subdivisionInfo._id : "",
      ],
    });
  }

  // changeValidator(){

  // let changeValue=this.patientRegistrationForm.get('proofType').value;

  //  let changeValue1=this.patientRegistrationForm.get('proofValue').value;

  pacthVaccineDetails() {
    if (this.patientdetailsdata?.vaccinationDose == 1) {
      this.doseValue = "1st";
    } else {
      this.doseValue = "2nd";
    }
    this.vaccineForm.patchValue({
      vaccineName: this.patientdetailsdata?.vaccineName,
      vaccinatedDate: this.patientdetailsdata?.vaccinatedDate,
      vaccinationDose: this.doseValue == "1st" ? "1" : "2",
      noOfPersons: this.patientdetailsdata?.noOfPersons,
      vaccinationStatus:
        this.patientdetailsdata?.isVaccinated == true ? "Completed" : "Pending",
      technician_id: this.patientdetailsdata?.patientVaccineInfo?.technicianId,
    });
  }
  clearDate() {
    this.selectedBillingDate = null;
  }
  getPlaceholder(item) {
    if (
      item ===
      "క్లస్టర్ / సెంటర్ / గ్రామ పేరు - Cluster / Center / Village Name"
    ) {
      return "Select Village Name";
    } else if (item === "ఇంటర్వ్యూ భాష / Interview language") {
      return "Select Language";
    } else {
      return "select";
    }
  }
  getTests(event) {
    let value = (event.target as HTMLInputElement).value;
    console.log(value);
    console.log(this.hospitalId);

    if (value) {
      this.healthService
        .getSearchTestsPackages(value, this.hospitalId)
        .subscribe((res) => {
          console.log(this.tests);
          this.tests = res.data;
        });
    } else {
      this.options = [];
    }
  }

  open(content, item) {
    this.currentItem = item;
    if (
      this.currentItem?.value != null ||
      this.currentItem?.value != undefined
    ) {
      this.templateViewContent = this.currentItem?.value;
    } else {
      this.templateViewContent = this.currentItem?.testResult?.template;
    }
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  public isDisabled = true;

  getDefaultTestPackages() {
    this.healthService.getDefaultTestPackages().subscribe((res) => {
      this.defaultTestPackages = res.data.tests;
    });
  }
  selectDefaultTestPackages(event) {
    if (event.checked === true) {
      for (let i = 0; i < this.defaultTestPackages?.length; i++) {
        const element = this.defaultTestPackages[i];

        const array = element;
        array["defaultPackage"] = true;
        if (array?.subTests?.length === 0) {
          const filterTest = this.sampleTestArray.filter((res) => {
            return res._id === array._id;
          });
          if (filterTest.length === 0) {
            this.sampleTestArray.push(array);
          } else {
            // alert(array.name)
          }
        }

        if (array?.subTests?.length > 0) {
          for (let i = 0; i < array?.subTests?.length; i++) {
            if (array?.subTests[i].subTests?.length === 0) {
              const filterSubTest = this.sampleTestArray.filter((res) => {
                return res._id === array?.subTests[i]._id;
              });
              if (filterSubTest.length === 0) {
                const subTest = array?.subTests[i];
                subTest["defaultPackage"] = true;
                this.sampleTestArray.push(subTest);
              } else {
                // alert(array?.subTests[i])
              }
            } else {
              for (let j = 0; j < array?.subTests[i].subTests.length; j++) {
                const filterSubTest = this.sampleTestArray.filter((res) => {
                  return res._id === array?.subTests[i].subTests[j]._id;
                });
                if (filterSubTest.length === 0) {
                  const subTestSubTest = array?.subTests[i].subTests[j];
                  subTestSubTest["defaultPackage"] = true;
                  this.sampleTestArray.push(subTestSubTest);
                } else {
                  // alert(array?.subTests[i].subTests[j])
                }
              }
            }
          }
        }
      }
      this.isDefaultTestPackage = true;
    } else {
      this.isDefaultTestPackage = false;
      this.sampleTestArray = this.sampleTestArray.filter((res) => {
        return res.defaultPackage !== true;
      });
    }
    this.sampleTestArray = this.sampleTestArray.filter((res) => {
      return res.isTest === true;
    });
  }
  onChangeTestValue(event) {
    console.log(this.hospitalId);
    if (event.type === "package") {
      this.adminService.gettestpackagesByid(event._id).subscribe((res) => {
        this.filterPackages(res.data);
        console.log(res.data, "packages");
      });
    } else {
      this.healthService.getTestsById(event._id).subscribe((res) => {
        this.filterTests(res.data);
      });
    }

    this.testControl = null;
    this.tests = [];
    setTimeout(() => {
      this.enterTestPaidAmount();
    }, 1000);
  }

  filterPackages(packageInfo) {
    if (
      this.sampleTestArray.filter((test) => {
        return test?._id == packageInfo._id;
      })?.[0]
    ) {
      alert(`${packageInfo?.name} already added`);
    } else {
      let isDuplicateTest = false;
      const packageTests = this.filterPackageTests(packageInfo?.tests || []);
      packageTests.forEach((test) => {
        this.sampleTestArray.forEach((sTest, index) => {
          if (sTest._id == test._id) {
            isDuplicateTest = true;
            alert(`${test?.name}  already added`);
          }
        });
      });
      if (!isDuplicateTest) {
        const tempTests = [];
        packageTests.forEach((fp) => {
          tempTests.push(this.fb.group(fp));
        });
        this.patientTestsArray = this.patientRegistrationForm.get(
          "patientTestsArray"
        ) as FormArray;
        const obj = {
          _id: packageInfo?._id,
          name: packageInfo?.name,
          price: packageInfo?.price,
          tests: this.fb.array(packageTests),
          instructions: [""],
          paidAmount: [""],
          sampleDate: moment(new Date()).format("YYYY-MM-DD"),
          sampleTime: [],
          referredBy: [""],
          referredType: [""],
          isPackage: true,
        };
        this.patientTestsArray.push(this.fb.group(obj));
        this.sampleTestArray.push(obj);
      }
    }
  }
  filterTests(test) {
    let temp = [];
    this.sampleTestArray?.forEach((sampleTest) => {
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
      this.isDefaultTestPackage = false;
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
      this.isDefaultTestPackage = true;
      for (let i = 0; i < test?.subTests?.length; i++) {
        if (test?.subTests[i].subTests?.length === 0) {
          const filterSubTest = temp.filter((res) => {
            return res._id === test?.subTests[i]._id;
          });
          if (filterSubTest.length === 0) {
            tempTests.push(test?.subTests[i]);
          } else {
            alert(` ${test?.subTests[i].name} already added`);
          }
        } else if (test?.subTests[i].subTests?.length > 0) {
          for (let j = 0; j < test?.subTests[i].subTests.length; j++) {
            const filterSubTest = temp.filter((res) => {
              return res._id === test?.subTests[i].subTests[j]._id;
            });
            if (filterSubTest.length === 0) {
              tempTests.push(test?.subTests[i].subTests[j]);
            } else {
              alert(` ${test?.subTests[i].subTests[j].name} already added`);
            }
          }
        }
      }
    }
    const filterTempTests = tempTests.filter((res) => {
      return res.isTest === true;
    });
    this.patientTestsArray = this.patientRegistrationForm.get(
      "patientTestsArray"
    ) as FormArray;
    filterTempTests.forEach((test) => {
      const obj = {
        _id: test?._id,
        name: test?.name,
        price: test?.price,
        tests: [],
        instructions: [""],
        paidAmount: [""],
        sampleDate: moment(new Date()).format("YYYY-MM-DD"),
        sampleTime: [],
        isPackage: false,
        referredBy: [""],
        referredType: [""],
      };
      this.patientTestsArray.push(this.fb.group(obj));
      this.sampleTestArray.push(obj);
    });
    // moment().format('LT')
  }
  filterPackageTests(packageTests) {
    let tempTests = [];

    packageTests.forEach((test) => {
      if (test?.subTests?.length === 0) {
        this.isDefaultTestPackage = false;
        tempTests.push(test);
      }
      if (test?.subTests?.length > 0) {
        this.isDefaultTestPackage = true;
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
  patientsRegForm(): any {
    return this.patientRegistrationForm.get("patientTestsArray") as FormArray;
  }

  deleteTestsFromSelectionList(item, index) {
    this.sampleTestArray = this.sampleTestArray.filter((res) => {
      return res !== item;
    });
    this.patientTestsArray = this.patientRegistrationForm.get(
      "patientTestsArray"
    ) as FormArray;
    this.patientTestsArray.removeAt(index);
    this.sampleTestArray = this.sampleTestArray.filter((res) => {
      return res === item;
    });
    this.enterTestPaidAmount();
  }

  cancelTestsFromSelectionList(content, item) {
    this.selected_test_id = item?._id;
    const dialogRef = this.dialog.open(content, {
      width: "40%",
      data: {},
    });
  }

  onFileChange(event) {
    this.pid = event;
    this.value = event;
    this.age = 0;
    this.healthService.getPatientsbyPId(event).subscribe((res) => {
      this.patientdetailsdata = res.data;
      console.log(this.patientdetailsdata, "data");
      console.log("kyc " + this.patientdetailsdata.kycDetails);

      if (
        this.patientdetailsdata.tests &&
        this.patientdetailsdata.tests.length
      ) {
        this.tests = [];
        for (let i = 0; i < this.patientdetailsdata.tests.length; i++) {
          this.tests.push(this.patientdetailsdata.tests[i]["_id"]);
        }
      }
      console.log(this.tests, "res");

      // this.date = moment(res.data?.tests[0]?.sampleDate).format("YYYY-MM-DD")
      const tesstAmount = res.data?.tests.reduce((a, b) => {
        return a + b.test.price;
      }, 0);
      this.patientpaymentObj = this.patientpaymentObj;
      this.patientpaymentObj.billAmount = tesstAmount.toFixed(0);
      this.patientpaymentObj.totalAmount = tesstAmount.toFixed(0);
      this.patientpaymentObj.dueAmount = tesstAmount.toFixed(0);

      res.data["organizationPatientInfo"]
        ? (res.data["organizationPatientInfo"]["description"] = JSON.parse(
            res.data["organizationPatientInfo"]["description"]
          ))
        : "";
      this.testDetails = res.data;
      this.pacthVaccineDetails();
      // this.getQuestionaries();
      this.addFormFields();
      this.getTransactions();
      this.hideScannerbutton = true;
      this.patientCreatedBy = this.patientdetailsdata?.createdBy;
      this.patientRegistrationForm.patchValue({
        PID: this.patientdetailsdata?.pid,
        name: this.patientdetailsdata?.name,
        DOB: this.patientdetailsdata?.DOB,
        gender: this.patientdetailsdata?.gender,
        mobileNumber: this.patientdetailsdata?.mobileNumber,
        emailAddress: this.patientdetailsdata?.emailAddress,
        aadhaar: this.patientdetailsdata?.aadhaar,
        address: this.patientdetailsdata?.address,
        address2: this.patientdetailsdata?.address2,
        city: this.patientdetailsdata?.city,
        state: this.patientdetailsdata?.state,
        habits: this.patientdetailsdata?.habits,
        economicStatus: this.patientdetailsdata?.economicStatus,
        lifeStyle: this.patientdetailsdata?.lifeStyle,
        occupation: this.patientdetailsdata?.occupation,
        proofType: this.patientdetailsdata?.proofType,
        ProofValue: this.patientdetailsdata?.proofValue,
        paidAmount: this.patientdetailsdata?.paidAmount,
        passport: this.patientdetailsdata?.passport,
        isVaccinated: this.patientdetailsdata?.Vaccinated,
        subdivision_id: this.patientdetailsdata?.subdivision_id,
        isReferralPatient: this.patientdetailsdata?.isReferralPatient,
        latitude: this.patientdetailsdata?.latitude,
        longitude: this.patientdetailsdata?.longitude,
        kycDetails: this.patientdetailsdata?.kycDetails,
      });
      this.latitude = parseFloat(this.patientdetailsdata?.latitude);
      this.longitude = parseFloat(this.patientdetailsdata?.longitude);
      this.address2 = this.patientdetailsdata?.address2;
      this.getAddress(
        parseFloat(this.patientdetailsdata?.latitude),
        parseFloat(this.patientdetailsdata?.longitude)
      );
      if (
        (this.user.subdivision_id ==
          this.patientRegistrationForm.value.subdivision_id ||
          this.patientRegistrationForm.value.subdivision_id == "") &&
        this.patientRegistrationForm.value.isReferralPatient == false
      ) {
        this.isSubDivisionPatient = true;
      } else {
        this.isSubDivisionPatient = false;
      }
      this.getUploadFile();
      if (this.patientdetailsdata.DOB !== null) {
        this.onDateChange(this.patientdetailsdata?.DOB);
      }

      // this.addFormFields();
    });
  }

  keyPressNumbersWithDecimal(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  getUploadFile() {
    this.healthService
      .getPatientDocuments(this.patientdetailsdata._id)
      .subscribe((res) => {
        this.uploadFilesDetails = res.data.attachments;
      });
  }

  medicalHistoryDetailsForm(): FormGroup {
    return this.fb.group({
      medicine: [""],
      frequency: [""],
      noOfDays: [""],
      comment: [""],
    });
  }

  patientTestDetailsForm(): FormGroup {
    return this.fb.group({
      test_name: [""],
      instructions: [""],
      paidAmount: [""],
      samepleTestDate: [""],
      timings: [""],
    });
  }

  familyHistoryDetailsForm(): FormGroup {
    return this.fb.group({
      decease: [""],
      relation: [""],
      fromYears: [""],
      comment: [""],
    });
  }
  doctorReviewForm(): FormGroup {
    return this.fb.group({
      review: [""],
    });
  }

  public editTests(test, templateref: TemplateRef<any>): void {
    this.testId = test.test._id;

    this.updateTestsForm.patchValue({
      test: test.test._id,
      value: test.value,
      comment: test.comment,
      id: test._id,
    });
    this.dialog.open(templateref);
  }

  public updateTestsDetails() {
    const formData = {
      test: this.updateTestsForm.value.test,
      value: this.updateTestsForm.value.value,
      comment: this.updateTestsForm.value.comment,
    };

    // this.healthService.updatePatientTestByid(this.updateTestsForm.value.id,formData).subscribe(res=>{

    //   this.onFileChange(this.pid)
    //   this.dialog.closeAll()
    // })
  }

  public removePatientmedicalHistory(index): void {
    (this.patientRegistrationForm.get("medicalHistory") as FormArray).removeAt(
      index
    );
  }
  public removePatientfamilyHistory(index): void {
    (this.patientRegistrationForm.get("familyHistory") as FormArray).removeAt(
      index
    );
  }

  public removePatientdoctorReview(index): void {
    (this.patientRegistrationForm.get("doctorReview") as FormArray).removeAt(
      index
    );
  }

  addmedicalHistoryItem(): void {
    (this.patientRegistrationForm.get("medicalHistory") as FormArray).push(
      this.medicalHistoryDetailsForm()
    );
  }

  addfamilyHistoryItem(): void {
    (this.patientRegistrationForm.get("familyHistory") as FormArray).push(
      this.familyHistoryDetailsForm()
    );
  }
  addPatientTestsItem(): void {
    (this.patientRegistrationForm.get("sampleTestArray") as FormArray).push(
      this.patientTestDetailsForm()
    );
  }
  addDoctorReviewItem(): void {
    (this.patientRegistrationForm.get("doctorReview") as FormArray).push(
      this.doctorReviewForm()
    );
  }

  accordian(data) {
    if (data == "patient") {
      this.patientaccshow =
        this.patientaccshow === "patient" ? "patienone" : "patient";
    } else if (data === "test") {
      this.testaccshow = this.testaccshow === "test" ? "testnone" : "test";
    } else if (data === "vaccine") {
      this.vaccineaccshow =
        this.vaccineaccshow === "vaccine" ? "vaccinenone" : "vaccine";
    } else if (data === "past") {
      this.pastaccshow = this.pastaccshow === "past" ? "pastnone" : "past";
    } else if (data === "family") {
      this.familyaccshow =
        this.familyaccshow === "family" ? "familynone" : "family";
    } else if (data === "doctorReview") {
      this.doctorReviewshow =
        this.doctorReviewshow === "doctorReview"
          ? "doctorReviewnone"
          : "doctorReview";
    } else if (data === "questionnaireView") {
      this.questionnaireshow =
        this.questionnaireshow === "questionnaireReview"
          ? "questionnaireReviewnone"
          : "questionnaireReview";
    } else if (data === "billing") {
      this.billingshow =
        this.billingshow === "billing" ? "billingnone" : "billing";
    }
  }

  getTestDetails() {
    const data = {};
    this.healthService.getTest(data).subscribe((res) => {
      this.testsDetails = res.data.tests;
    });
  }

  onSelectTest(event, i) {
    if (event.target.value === "others") {
      this.testname = { name: event.target.value, index: i };
    }
  }

  onSubmit() {
    this.submitted = true;
    this.patientDynamicFormValidation();
    if (this.patientRegistrationForm.invalid) {
      Swal.fire("Please Enter Valid  Details");
      return;
    }

    let testsArray = [];
    let packageTests = [];

    const patientsTestSamples =
      this.patientRegistrationForm.value.patientTestsArray;

    patientsTestSamples.forEach((sTest) => {
      if (sTest?.isPackage == false) {
        const obj = {
          test: sTest?._id,
          value: "",
          comment: "",
          sampleDate: sTest?.sampleDate,
          sampleTime: sTest?.sampleTime,
          instructions: sTest?.instructions,
          paidAmount: sTest?.paidAmount,
          referredBy: sTest?.referredBy,
          referredType: sTest?.referredType,
        };
        testsArray.push(obj);
      }
      if (sTest?.isPackage == true) {
        // console.log('hello');

        const pTests = [];
        sTest?.tests.forEach((ptest) => {
          const testObj = {
            test: ptest?._id,
            value: "",
            comment: "",
            sampleDate: sTest?.sampleDate,
            sampleTime: sTest?.sampleTime,
            instructions: sTest?.instructions,
            paidAmount: sTest?.paidAmount,
            referredBy: sTest?.referredBy,
            referredType: sTest?.referredType,
          };
          pTests.push(testObj);
        });
        const obj = {
          package: sTest?._id,
          tests: pTests,
        };
        packageTests.push(obj);
      }
    });

    if (this.patientdetailsdata?.pid) {
      const formdata: any = {
        patientId: this.patientdetailsdata?._id,
      };
      // if (
      //   this.patientRegistrationForm.value.name !== null &&
      //   this.patientRegistrationForm.value.name !== ''
      // ) {
      formdata.name = this.patientRegistrationForm.value.name;
      // }
      // if (
      //   this.patientRegistrationForm.value.DOB !== null &&
      //   this.patientRegistrationForm.value.DOB !== ''
      // ) {
      formdata.DOB = this.patientRegistrationForm.value.DOB;
      // }
      // if (
      //   this.patientRegistrationForm.value.gender !== null &&
      //   this.patientRegistrationForm.value.gender !== ''
      // ) {
      formdata.gender = this.patientRegistrationForm.value.gender;
      // }
      // if (
      //   this.patientRegistrationForm.value.mobileNumber !== null &&
      //   this.patientRegistrationForm.value.mobileNumber !== ''
      // ) {
      formdata.mobileNumber = this.patientRegistrationForm.value.mobileNumber;
      // }
      // if (
      //   this.patientRegistrationForm.value.emailAddress !== null &&
      //   this.patientRegistrationForm.value.emailAddress !== ''
      // ) {
      formdata.emailAddress = this.patientRegistrationForm.value.emailAddress;
      // }
      // if (
      //   this.patientRegistrationForm.value.aadhaar !== null &&
      //   this.patientRegistrationForm.value.aadhaar !== ''
      // ) {
      formdata.aadhaar = this.patientRegistrationForm.value.aadhaar;
      formdata.kycDetails = this.patientRegistrationForm.value.kycDetails;
      // }
      // if (
      //   this.patientRegistrationForm.value.address !== null &&
      //   this.patientRegistrationForm.value.address !== ''
      // ) {
      formdata.address = this.patientRegistrationForm.value.address;
      formdata.address2 = this.patientRegistrationForm.value.address2;
      // }
      // if (
      //   this.patientRegistrationForm.value.city !== null &&
      //   this.patientRegistrationForm.value.city !== ''
      // ) {
      formdata.city = this.patientRegistrationForm.value.city;
      // }
      // if (
      //   this.patientRegistrationForm.value.state !== null &&
      //   this.patientRegistrationForm.value.state !== ''
      // ) {
      formdata.state = this.patientRegistrationForm.value.state;
      // }

      // if (
      //   this.patientRegistrationForm.value.latitude !== null &&
      //   this.patientRegistrationForm.value.latitude !== ''
      // ) {
      formdata.latitude = `${this.patientRegistrationForm.value.latitude}`;
      // }
      // if (
      //   this.patientRegistrationForm.value.longitude !== null &&
      //   this.patientRegistrationForm.value.longitude !== ''
      // ) {
      formdata.longitude = `${this.patientRegistrationForm.value.longitude}`;
      // }
      // if (
      //   this.patientRegistrationForm.value.referredByType !== null &&
      //   this.patientRegistrationForm.value.referredByType !== ''
      // ) {
      formdata.referredByType =
        this.patientRegistrationForm.value.referredByType;
      // }
      // if (
      //   this.patientRegistrationForm.value.referredByCode !== null &&
      //   this.patientRegistrationForm.value.referredByCode !== ''
      // ) {
      formdata.referredByCode =
        this.patientRegistrationForm.value.referredByCode;
      // }
      // if (
      //   this.patientRegistrationForm.value.referredByName !== null &&
      //   this.patientRegistrationForm.value.referredByName !== ''
      // ) {
      formdata.referredByName =
        this.patientRegistrationForm.value.referredByName;
      // }

      // if (
      //   this.patientRegistrationForm.value.habits !== null &&
      //   this.patientRegistrationForm.value.habits !== ''
      // ) {
      formdata.habits = this.patientRegistrationForm.value.habits;
      // }
      // if (
      //   this.patientRegistrationForm.value.economicStatus !== null &&
      //   this.patientRegistrationForm.value.economicStatus !== ''
      // ) {
      formdata.economicStatus =
        this.patientRegistrationForm.value.economicStatus;
      // }
      // if (
      //   this.patientRegistrationForm.value.lifeStyle !== null &&
      //   this.patientRegistrationForm.value.lifeStyle !== ''
      // ) {
      formdata.lifeStyle = this.patientRegistrationForm.value.lifeStyle;
      // }
      // if (
      //   this.patientRegistrationForm.value.occupation !== null &&
      //   this.patientRegistrationForm.value.occupation !== ''
      // ) {
      formdata.occupation = this.patientRegistrationForm.value.occupation;
      // }
      // if (
      //   this.patientRegistrationForm.value.proofType !== null &&
      //   this.patientRegistrationForm.value.proofType !== ''
      // ) {
      formdata.proofType = this.patientRegistrationForm.value.proofType;
      // }
      // if (
      //   this.patientRegistrationForm.value.proofValue !== null &&
      //   this.patientRegistrationForm.value.proofValue !== ''
      // ) {
      formdata.proofValue = this.patientRegistrationForm.value.proofValue;
      // }
      // if (
      //   this.patientRegistrationForm.value.timings !== null &&
      //   this.patientRegistrationForm.value.timings !== ''
      // ) {
      formdata.timings = this.patientRegistrationForm.value.timings;
      // }
      // if (
      //   this.patientRegistrationForm.value.samepleTestDate !== null &&
      //   this.patientRegistrationForm.value.samepleTestDate !== ''
      // ) {
      formdata.samepleTestDate =
        this.patientRegistrationForm.value.samepleTestDate;
      // }
      // if (
      //   this.patientRegistrationForm.value.passport !== null &&
      //   this.patientRegistrationForm.value.passport !== ''
      // ) {
      formdata.passport = this.patientRegistrationForm.value.passport;
      // }
      formdata.paidAmount = this.patientRegistrationForm.value.paidAmount;
      this.healthService.addPatients(formdata).subscribe((res) => {
        console.log("addpatientsformdata---", res);
        
        this.resMessage = res;

        this.cdr.detectChanges();
        if (this.resMessage?.statusCode === 200) {
          this.patientRegistrationForm.reset();
          Swal.fire({
            title: "WelCome!",
            text: `${
              this.patientRegistrationForm.value.name ??
              this.patientdetailsdata.name
            } Has Been updated Successfully`,
            icon: "success",
            confirmButtonText: "ok",
            allowEscapeKey: false,
            allowOutsideClick: false,
          }).then((result) => {
            // this.patientRegistrationForm.reset()
            this.patientRegistrationForm.reset();
            this.onFileChange(this.patientdetailsdata.pid);
            this.cdr.detectChanges();
            this.resMessage = "";
            this.sampleTestArray = [];
            this.totalAmount = 0;
          });
        }
      });

      // const tests = this.patientRegistrationForm.value.tests.filter(res => res.test !== "" && res.test !== null)
      const medicalHistory =
        this.patientRegistrationForm.value.medicalHistory.filter(
          (res) => res.medicine !== "" && res.medicine !== null
        );
      const familyHistory =
        this.patientRegistrationForm.value.familyHistory.filter(
          (res) => res.decease !== "" && res.decease !== null
        );
      const doctorReview =
        this.patientRegistrationForm.value.doctorReview.filter(
          (res) => res.review !== "" && res.review !== null
        );

      const form = this.patientRegistrationForm.value.details;
      if (
        (form.height !== null && form.height !== "") ||
        (form.weight !== null && form.weight !== "") ||
        (form.BMI !== null && form.BMI !== "") ||
        (form.BP !== null && form.BP !== "") ||
        (form.acuityOfVision !== null && form.acuityOfVision !== "") ||
        (form.bloodGroup !== null && form.bloodGroup !== "") ||
        (form.temperature !== null && form.temperature !== "")
      ) {
        this.healthService
          .addpatientsdetilsBypid(
            this.patientdetailsdata._id,
            this.patientRegistrationForm.value.details
          )
          .subscribe((res) => {});
      }
      if (testsArray.length > 0) {
        const formdata: any = {};
        formdata.tests = testsArray;
        formdata.packages = packageTests;
        formdata.paidAmount = "";

        this.healthService
          .addpatientsTestsBypid(this.patientdetailsdata._id, formdata)
          .subscribe((res) => {
            this.patientTestsArray = this.patientRegistrationForm.get(
              "patientTestsArray"
            ) as FormArray;
            while (this.patientTestsArray.length) {
              this.patientTestsArray.removeAt(0);
            }
            this.sampleTestArray = [];
          });
      }
      if (medicalHistory.length > 0) {
        const formdata: any = {};
        formdata.medicalHistory = medicalHistory;
        this.healthService
          .addpatientsMedicalHistoryBypid(this.patientdetailsdata._id, formdata)
          .subscribe((res) => {});
      }
      if (familyHistory.length > 0) {
        const formdata: any = {};
        formdata.familyHistory = familyHistory;
        this.healthService
          .addpatientsFamilyHistoryBypid(this.patientdetailsdata._id, formdata)
          .subscribe((res) => {});
      }
      if (doctorReview.length > 0) {
        const formdata: any = {};
        formdata.doctorReviews = doctorReview;
        this.healthService
          .addpatientsDoctorReviewsBypid(this.patientdetailsdata._id, formdata)
          .subscribe((res) => {});
      }
      const Obj = {
        patients: [this.patientdetailsdata?._id],
        vaccineName: this.vaccineForm.value.vaccineName,
        vaccinatedDate: this.vaccineForm.value.vaccinatedDate,
        vaccinationDose: this.vaccineForm.value.vaccinationDose,
      };

      this.healthService.vaccineInsert(Obj).subscribe((res) => {});
      this.patientRegistrationForm.reset();
      this.healthService
        .getPatientsbyPId(this.patientdetailsdata.pid)
        .subscribe((res) => {
          this.options = res.data.patients;
        });
    } else {
      // const details = this.patientRegistrationForm.value.details.filter(res=>res.test !== "")
      // const tests = this.patientRegistrationForm.value.tests.filter(res => res.test !== "" && res.test !== null)
      const medicalHistory =
        this.patientRegistrationForm.value.medicalHistory.filter(
          (res) => res.medicine !== "" && res.medicine !== null
        );
      const familyHistory =
        this.patientRegistrationForm.value.familyHistory.filter(
          (res) => res.decease !== "" && res.decease !== null
        );
      const doctorReview =
        this.patientRegistrationForm.value.doctorReview.filter(
          (res) => res.review !== "" && res.review !== null
        );
      const formdata: any = {
        // patientId:this.patientRegistrationForm.value.PID,
        // name: this.patientRegistrationForm.value.name,
        // DOB: this.patientRegistrationForm.value.DOB,
        // gender: this.patientRegistrationForm.value.gender,
        // mobileNumber: this.patientRegistrationForm.value.mobileNumber,
        // emailAddress: this.patientRegistrationForm.value.emailAddress,
        // aadhaar: this.patientRegistrationForm.value.aadhaar,
        // address: this.patientRegistrationForm.value.address,
        // city: this.patientRegistrationForm.value.city,
        // state: this.patientRegistrationForm.value.state,
        // referredByType: this.patientRegistrationForm.value.referredByType,
        // referredByCode: this.patientRegistrationForm.value.referredByCode,
        // referredByName: this.patientRegistrationForm.value.referredByName,
        // habits: this.patientRegistrationForm.value.habits,
        // economicStatus: this.patientRegistrationForm.value.economicStatus,
        // lifeStyle: this.patientRegistrationForm.value.lifeStyle,
        // occupation: this.patientRegistrationForm.value.occupation,
      };
      if (
        this.patientRegistrationForm.value.name !== null &&
        this.patientRegistrationForm.value.name !== ""
      ) {
        formdata.name = this.patientRegistrationForm.value.name;
      }
      if (
        this.patientRegistrationForm.value.DOB !== null &&
        this.patientRegistrationForm.value.DOB !== ""
      ) {
        formdata.DOB = this.patientRegistrationForm.value.DOB;
      }
      if (
        this.patientRegistrationForm.value.gender !== null &&
        this.patientRegistrationForm.value.gender !== ""
      ) {
        formdata.gender = this.patientRegistrationForm.value.gender;
      }
      if (
        this.patientRegistrationForm.value.mobileNumber !== null &&
        this.patientRegistrationForm.value.mobileNumber !== ""
      ) {
        formdata.mobileNumber =
          this.patientRegistrationForm.value.mobileNumber.toString();
      }
      if (
        this.patientRegistrationForm.value.emailAddress !== null &&
        this.patientRegistrationForm.value.emailAddress !== ""
      ) {
        formdata.emailAddress = this.patientRegistrationForm.value.emailAddress;
      }
      if (
        this.patientRegistrationForm.value.aadhaar !== null &&
        this.patientRegistrationForm.value.aadhaar !== ""
      ) {
        formdata.aadhaar = this.patientRegistrationForm.value.aadhaar;
      }
      if (
        this.patientRegistrationForm.value.address !== null &&
        this.patientRegistrationForm.value.address !== ""
      ) {
        formdata.address = this.patientRegistrationForm.value.address;
      }

      if (
        this.patientRegistrationForm.value.kycDetails !== null &&
        this.patientRegistrationForm.value.kycDetails !== ""
      ) {
        formdata.kycDetails = this.patientRegistrationForm.value.kycDetails;
      }
      if (
        this.patientRegistrationForm.value.address2 !== null &&
        this.patientRegistrationForm.value.address2 !== ""
      ) {
        formdata.address2 = this.patientRegistrationForm.value.address2;
      }
      if (
        this.patientRegistrationForm.value.city !== null &&
        this.patientRegistrationForm.value.city !== ""
      ) {
        formdata.city = this.patientRegistrationForm.value.city;
      }
      if (
        this.patientRegistrationForm.value.state !== null &&
        this.patientRegistrationForm.value.state !== ""
      ) {
        formdata.state = this.patientRegistrationForm.value.state;
      }
      if (
        this.patientRegistrationForm.value.latitude !== null &&
        this.patientRegistrationForm.value.latitude !== ""
      ) {
        formdata.latitude = `${this.patientRegistrationForm.value.latitude}`;
      }
      if (
        this.patientRegistrationForm.value.longitude !== null &&
        this.patientRegistrationForm.value.longitude !== ""
      ) {
        formdata.longitude = `${this.patientRegistrationForm.value.longitude}`;
      }
      if (
        this.patientRegistrationForm.value.referredByType !== null &&
        this.patientRegistrationForm.value.referredByType !== ""
      ) {
        formdata.referredByType =
          this.patientRegistrationForm.value.referredByType;
      }
      if (
        this.patientRegistrationForm.value.referredByCode !== null &&
        this.patientRegistrationForm.value.referredByCode !== ""
      ) {
        formdata.referredByCode =
          this.patientRegistrationForm.value.referredByCode;
      }
      if (
        this.patientRegistrationForm.value.referredByName !== null &&
        this.patientRegistrationForm.value.referredByName !== ""
      ) {
        formdata.referredByName =
          this.patientRegistrationForm.value.referredByName;
      }

      if (
        this.patientRegistrationForm.value.habits !== null &&
        this.patientRegistrationForm.value.habits !== ""
      ) {
        formdata.habits = this.patientRegistrationForm.value.habits;
      }
      if (
        this.patientRegistrationForm.value.economicStatus !== null &&
        this.patientRegistrationForm.value.economicStatus !== ""
      ) {
        formdata.economicStatus =
          this.patientRegistrationForm.value.economicStatus;
      }
      if (
        this.patientRegistrationForm.value.lifeStyle !== null &&
        this.patientRegistrationForm.value.lifeStyle !== ""
      ) {
        formdata.lifeStyle = this.patientRegistrationForm.value.lifeStyle;
      }
      if (
        this.patientRegistrationForm.value.occupation !== null &&
        this.patientRegistrationForm.value.occupation !== ""
      ) {
        formdata.occupation = this.patientRegistrationForm.value.occupation;
      }
      if (
        this.patientRegistrationForm.value.proofType !== null &&
        this.patientRegistrationForm.value.proofType !== ""
      ) {
        formdata.proofType = this.patientRegistrationForm.value.proofType;
      }
      if (
        this.patientRegistrationForm.value.proofValue !== null &&
        this.patientRegistrationForm.value.proofValue !== ""
      ) {
        formdata.proofValue = this.patientRegistrationForm.value.proofValue;
      }
      if (
        this.patientRegistrationForm.value.timings !== null &&
        this.patientRegistrationForm.value.timings !== ""
      ) {
        formdata.timings = this.patientRegistrationForm.value.timings;
      }
      if (
        this.patientRegistrationForm.value.samepleTestDate !== null &&
        this.patientRegistrationForm.value.samepleTestDate !== ""
      ) {
        formdata.samepleTestDate =
          this.patientRegistrationForm.value.samepleTestDate;
      }
      if (
        this.patientRegistrationForm.value.passport !== null &&
        this.patientRegistrationForm.value.passport !== ""
      ) {
        formdata.passport = this.patientRegistrationForm.value.passport;
      }
      const form = this.patientRegistrationForm.value.details;
      if (
        (form.height !== null && form.height !== "") ||
        (form.weight !== null && form.weight !== "") ||
        (form.BMI !== null && form.BMI !== "") ||
        (form.BP !== null && form.BP !== "") ||
        (form.acuityOfVision !== null && form.acuityOfVision !== "") ||
        (form.bloodGroup !== null && form.bloodGroup !== "") ||
        (form.temperature !== null && form.temperature !== "")
      ) {
        formdata.details = this.patientRegistrationForm.value.details;
      }

      formdata.tests = testsArray;
      formdata.packages = packageTests;
      formdata.medicalHistory = medicalHistory;
      formdata.familyHistory = familyHistory;
      formdata.doctorReviews = doctorReview;
      let testsData: any = testsArray;
      let packagesData: any = packageTests;
      formdata.paidAmount = "";
      this.healthService.addPatients(formdata).subscribe((res) => {
        if (res.statusCode === 200) {
          this.billingRes = res.data?.pid;
          // console.log(res.data.pid,'res');
          this.patientRegistrationForm.reset();

          if (testsData.length > 0) {
            const formdata: any = {};
            // this.totalAmount = 0;
            formdata.paidAmount = "";
            // this.resetPatientStepper();
            formdata.tests = testsData;
            formdata.packages = packagesData;

            this.healthService
              .addpatientsTestsBypid(res?.data._id, formdata)
              .subscribe((res) => {});
          }
          Swal.fire({
            title: "WelCome!",
            text: `${res?.message}`,
            icon: "success",
            confirmButtonText: "ok",
            allowEscapeKey: false,
            allowOutsideClick: false,
          }).then((result) => {
            if (res && res.data.pid) {
              const formData: any = {};
              formData.search = res.data.pid;
              this.healthService.transactions(formData).subscribe(
                (transactionsRes: any) => {
                  // console.log('checking');
                  this.transactions = transactionsRes?.data?.transactions || [];
                },
                (err) => {
                  console.log(err);
                }
              );
            }
            this.submitted = false;

            this.patientDynamicFormValidation();
            this.clearForm();
            this.totalAmount = 0;
            this.patientTestsArray = this.patientRegistrationForm.get(
              "patientTestsArray"
            ) as FormArray;
            while (this.patientTestsArray.length) {
              this.patientTestsArray.removeAt(0);
            }
            this.sampleTestArray = [];
            this.age = null;
            this.resetPatientStepper();
          });
        }
      });
    }
  }
  clearBilling() {
    this.transactions = [];
    this.patientpaymentObj.totalAmount = 0;
  }
  resetPatientStepper() {
    this.testaccshow = "";
    this.patientaccshow = "";
    this.vaccineaccshow = "";
    this.pastaccshow = "";
    this.familyaccshow = "";
    this.doctorReviewshow = "";
    this.questionnaireshow = "";
    this.billingshow = "";
  }
  patientDynamicFormValidation() {
    const pForm = this.patientRegistrationForm;

    const tempArray = ["", null, undefined];
    tempArray.includes(pForm.value.mobileNumber)
      ? (pForm.get("mobileNumber").clearValidators(),
        pForm.get("mobileNumber").updateValueAndValidity())
      : (pForm
          .get("mobileNumber")
          .setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]),
        pForm.get("mobileNumber").updateValueAndValidity());
    tempArray.includes(pForm.value.aadhaar)
      ? (pForm.get("aadhaar").clearValidators(),
        pForm.get("aadhaar").updateValueAndValidity())
      : (pForm
          .get("aadhaar")
          .setValidators([
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(12),
          ]),
        pForm.get("aadhaar").updateValueAndValidity());
    tempArray.includes(pForm.value.emailAddress)
      ? (pForm.get("emailAddress").clearValidators(),
        pForm.get("emailAddress").updateValueAndValidity())
      : (pForm
          .get("emailAddress")
          .setValidators([
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          ]),
        pForm.get("emailAddress").updateValueAndValidity());
    tempArray.includes(pForm.value.proofType)
      ? (pForm.get("proofValue").clearValidators(),
        pForm.get("proofValue").updateValueAndValidity())
      : (pForm.get("proofValue").setValidators([
          Validators.required,
          // Validators.maxLength(16)
          // Validators.minLength(12),
          // Validators.maxLength(12),
        ]),
        pForm.get("proofValue").updateValueAndValidity());
  }
  dobClick() {
    this.dobSelected = false;
  }
  ageClick() {
    this.ageSelected = false;
  }
  onDateChange(event) {
    if (
      this.patientRegistrationForm.value.DOB !== "" &&
      this.patientRegistrationForm.value.DOB !== null
    ) {
      var timeDiff = Math.abs(
        Date.now() - new Date(this.patientRegistrationForm.value.DOB).getTime()
      );
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(this.age);
      let today = new Date();
      console.log(today);
      let birthMonth, birthDate, birthYear;
      let birthDetails = {
        date: new Date(this.patientRegistrationForm.value.DOB).getDate(),
        month: new Date(this.patientRegistrationForm.value.DOB).getMonth() + 1,
        year: new Date(this.patientRegistrationForm.value.DOB).getFullYear(),
      };
      let currentYear = today.getFullYear();
      let currentMonth = today.getMonth() + 1;
      let currentDate = today.getDate();
      this.leapChecker(currentYear);
      if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth &&
          birthDetails.year == currentYear) ||
        (birthDetails.date > currentDate &&
          birthDetails.month == currentMonth &&
          birthDetails.year == currentYear)
      ) {
        alert("Not Born Yet");
        return;
      }
      birthYear = currentYear - birthDetails.year;
      if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
      } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
      }

      if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
      } else {
        birthMonth--;
        console.log(currentMonth);
        let days;
        if (currentMonth == 1) {
          days = this.months[0];
        } else {
          days = days + currentDate - birthDetails.date;
        }
        birthDate = days + currentDate - birthDetails.date;
        if (birthMonth < 0) {
          birthMonth = 11;
          birthYear--;
        }
      }

      console.log(
        "day :",
        birthDate,
        "month :",
        birthMonth,
        "year :",
        birthYear
      );
    } else {
      this.age = 0;
    }
  }
  getDate(event) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var dob = moment(new Date(year - this.age, month - 0, day - 0)).format(
      "YYYY-MM-DD"
    );
    this.dateValue = dob;
    if (event.target.value) {
      this.dateValue = dob;
    } else {
      this.dateValue = null;
    }
  }

  leapChecker(year) {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
      this.months[1] = 29;
    } else {
      this.months[1] = 28;
    }
  }
  getToday(): string {
    return new Date().toISOString().split("T")[0];
  }
  clearForm() {
    //  console.log(this.value);
    this.patientRegistrationForm.get("name").clearValidators();
    this.patientRegistrationForm.get("gender").clearValidators();
    this.patientRegistrationForm.value.patientTestsArray = [];
    this.patientRegistrationForm.value.patientTestsArray.length = 0;
    this.patientRegistrationForm.get("patientTestsArray")["controls"] = [];
    this.patientRegistrationForm.reset();
    this.age = null;

    this.patientdetailsdata.tests = [];

    this.selectValue = "";
    this.patientdetailsdata.pid = "";
    this.resetPatientStepper();
    // this.patientdetailsdata.details=[]
    this.totalAmount = 0;
    console.log(this.patientRegistrationForm);
    this.patientdetailsdata.createdAt = "";

    this.transactions.length = 0;
    this.value = "1234567";
    this.vaccineForm.reset();
  }
  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  getGeneratePid() {
    this.healthService.getgeneratePid().subscribe((res) => {
      this.barCodeValue = res.data.pid;
    });
  }
  printForm(printform: string) {
    this.broadcastServicde.closeSidebar.emit(true);
    if (printform === "printform") {
      const PID = this.patientRegistrationForm.value.PID;
      this.barCodeValue = PID;
      this.pid = PID;
      this.value = PID;
      this.healthService.getPatientsbyPId(PID).subscribe((res) => {
        this.patientdetailsdata = res.data;
        this.getQuestionaries();
        this.showQuestionnaireView = true;
        this.disbalePIDInput = true;
        this.addFormFields();
        this.patientRegistrationForm.patchValue({
          PID: this.patientdetailsdata?.pid,
          name: this.patientdetailsdata?.name,
          DOB: this.patientdetailsdata?.DOB,
          gender: this.patientdetailsdata?.gender,
          mobileNumber: this.patientdetailsdata?.mobileNumber,
          emailAddress: this.patientdetailsdata?.emailAddress,
          aadhaar: this.patientdetailsdata?.aadhaar,
          address: this.patientdetailsdata?.address,
          addres2: this.patientdetailsdata?.addres2,
          city: this.patientdetailsdata?.city,
          state: this.patientdetailsdata?.state,
          habits: this.patientdetailsdata?.habits,
          economicStatus: this.patientdetailsdata?.economicStatus,
          lifeStyle: this.patientdetailsdata?.lifeStyle,
          occupation: this.patientdetailsdata?.occupation,
          proofType: this.patientdetailsdata?.proofType,
          proofValue: this.patientdetailsdata?.proofValue,
          latitude: this.patientdetailsdata?.latitude,
          longitude: this.patientdetailsdata?.longitude,
        });

        this.cdr.detectChanges();
        this.getUploadFile();
        if (this.patientdetailsdata.DOB !== null) {
          this.onDateChange(this.patientdetailsdata?.DOB);
        }
      });
    } else if (printform === "reprintform") {
      this.barCodeValue = this.patientdetailsdata.pid;
      this.createdAt = this.patientdetailsdata.createdAt;
      this.showqrcode = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        // this.printerService.printCurrentWindow()
        // window.print()
      });
    }
  }
  isShown = false;
  print(printform: string) {
    if (printform == "print")
      this.healthService.getgeneratePid().subscribe((res) => {
        if (res.statusCode === 200) {
          this.barCodeValue = res.data.pid;
          this.createdAt = res.data.createdAt;
          this.showqrcode = true;
          this.getQuestionaries();

          this.cdr.detectChanges();
          setTimeout(() => {
            this.printerService.printByClassName("printident");
            // this.printerService.printCurrentWindow()
            // window.print()
          }, 250);
        }
      });
  }
  sacnEanble() {
    this.pid = "";
    this.barCodeValue = "";
    this.value = "1234567";
    this.patientRegistrationForm.reset();
    this.disbalePIDInput = null;
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
      this.patientdetailsdata ? (this.patientdetailsdata.createdAt = "") : {};
      this.age = 0;
      this.showQuestionnaireView = false;
      this.patientdetailsdata = {};
      this.details?.reset();
      this.sampleTestArray = [];
    }, 0);
  }
  onChangeForm(data) {
    if (data == "Questionnaire") {
      this.showQuestioner = this.showQuestioner == true ? false : true;
      this.showUploadFiles = false;
    } else if (data == "Upload Tests") {
      this.showQuestioner = false;
      this.showUploadFiles = this.showUploadFiles === true ? false : true;
    }

    this.testaccshow = "";
    this.patientaccshow = "";
    this.vaccineaccshow = "";
    this.pastaccshow = "";
    this.familyaccshow = "";
    this.doctorReviewshow = "";
    this.questionnaireshow = "";
    if (this.showQuestioner === false) {
      this.getQuestionaries();
      if (this.patientdetailsdata) {
        this.addFormFields();
      }
    }
  }

  createform() {
    let arr = [];
    for (let i = 0; i < this.questionariesDetails?.length; i++) {
      arr.push(this.BuildFormDynamic(this.questionariesDetails[i]));
    }
    this.myForm = this.fb.group({
      ClassDetails: this.fb.array(arr),
    });
  }
  BuildFormDynamic(product): FormArray {
    let dynamicFormArray: FormArray = new FormArray([]);

    product.questions.forEach((element) => {
      if (element.type === "checkbox") {
        dynamicFormArray.push(
          this.fb.group({
            question: [element.question],
            id: [element._id],
            answer: this.addCheckboxes(element),
            // form:this.rulesFormArray(element?.possibleAnswers),
            code: [element.code],
            type: [element.type],
            units: [element.units],
            possibleAnswers: [element?.possibleAnswers],
            subquestions: this.buildSubquestionForm(element),
          })
        );
        // this.addCheckboxes(element);
      } else {
        dynamicFormArray.push(
          this.fb.group({
            question: [element.question],
            id: [element._id],
            answer: [null],
            code: [element.code],
            type: [element.type],
            units: [element.units],
            possibleAnswers: [element?.possibleAnswers],
            subquestions: this.buildSubquestionForm(element),
          })
        );
      }
    });
    return dynamicFormArray;
  }

  private addCheckboxes(element) {
    let dynamicansFormArray: FormArray = new FormArray([]);
    element?.possibleAnswers.forEach((elemen) =>
      dynamicansFormArray.push(new FormControl(false))
    );

    return dynamicansFormArray;
  }
  buildSubquestionForm(product): any {
    let dynamicsubFormArray: FormArray = new FormArray([]);
    product.subQuestions.forEach((element) => {
      if (element.type === "checkbox") {
        dynamicsubFormArray.push(
          this.fb.group({
            question: [element.question],
            id: [element._id],
            answer: this.addCheckboxesSub(element),
            code: [element.code],
            type: [element.type],
            units: [element.units],
            possibleAnswers: [element?.possibleAnswers],
          })
        );
      } else {
        dynamicsubFormArray.push(
          this.fb.group({
            question: [element.question],
            id: [element._id],
            answer: [null],
            code: [element.code],
            type: [element.type],
            units: [element.units],
            possibleAnswers: [element?.possibleAnswers],
          })
        );
      }
    });
    return dynamicsubFormArray;
  }

  private addCheckboxesSub(element) {
    let dynamicAnsSubFormArray: FormArray = new FormArray([]);
    element?.possibleAnswers.forEach((elemen) =>
      dynamicAnsSubFormArray.push(new FormControl(false))
    );

    return dynamicAnsSubFormArray;
  }

  questionnaireForm() {
    let obj = {};
    let qarray = [];

    this.questionForm.value.forEach((element) => {
      element.questions.forEach((quest) => {
        let { id, answer } = quest;
        qarray.push({
          question: id,
          answer,
          patient: this.patientdetailsdata._id,
        });
        quest.subquestions.forEach((subquest) => {
          let { id, answer } = subquest;
          qarray.push({
            question: id,
            answer,
            patient: this.patientdetailsdata._id,
          });
        });
      });
    });

    let answrd = qarray.filter((element) => {
      return element.answer != null;
    });
    let array = [];
    for (let i = 0; i < answrd.length; i++) {
      // const element = array[i];.toString()
      array.push({
        question: answrd[i].question,
        answer: answrd[i].answer.toString(),
        patient: answrd[i].patient,
      });
    }

    this.healthService
      .adduserQuestionnaire({ questions: array })
      .subscribe((res) => {
        Swal.fire({
          title: "WelCome!",
          text: res.message,
          icon: "success",
          confirmButtonText: "ok",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
      });
  }

  addFormFields() {
    this.healthService
      .getQuestionarieByPid(this.patientdetailsdata._id)
      .subscribe((res) => {
        let fields = res.data.filter((el) => el.questions);
        fields.forEach((element) => {
          this.questionForm.value.forEach((que, formIndex) => {
            if (element.name == que.name) {
              element.questions.forEach((arr, answerInd) => {
                que.questions.forEach((quearr, index) => {
                  if (arr.question == quearr.question) {
                    let formarr = this.questionForm.controls[formIndex].get(
                      "questions"
                    ) as FormArray;

                    if (element.questions[answerInd].answer != null) {
                      if (arr.type === "checkbox") {
                        const optionsanswer =
                          element.questions[answerInd].answer?.answer;
                        const array = [];
                        var str = optionsanswer;
                        var arrSplit = str.split(",");
                        let answerform = formarr.controls[index].get(
                          "answer"
                        ) as FormArray;
                        for (let i = 0; i < arrSplit.length; i++) {
                          array.push(Boolean(JSON.parse(arrSplit[i])));
                        }
                        let answersValues = array;

                        answersValues.forEach((anselement, ansValIndex) => {
                          answerform.controls[ansValIndex].setValue(anselement);
                        });
                      } else {
                        formarr.controls[index]
                          .get("answer")
                          .setValue(
                            element.questions[answerInd].answer?.answer
                          );
                      }
                    }
                    let subQuestions = formarr.controls[index].get(
                      "subquestions"
                    ) as FormArray;
                    let subquestionValues =
                      element.questions[answerInd].subQuestions;
                    subquestionValues.forEach((subelement, subIndex) => {
                      subQuestions.value.forEach((subVal, subValIndex) => {
                        if (subelement.question == subVal.question) {
                          if (subelement.answer != null) {
                            if (subelement?.type === "checkbox") {
                              const subOptionsanswer =
                                subelement?.answer?.answer;
                              const array = [];
                              var str = subOptionsanswer;
                              var subArrSplit = str.split(",");
                              let subAnswerform = subQuestions.controls[
                                subValIndex
                              ].get("answer") as FormArray;
                              for (let i = 0; i < subArrSplit.length; i++) {
                                array.push(Boolean(JSON.parse(subArrSplit[i])));
                              }
                              let subAnswersValues = array;

                              subAnswersValues.forEach(
                                (anselement, ansValIndex) => {
                                  subAnswerform.controls[ansValIndex].setValue(
                                    anselement
                                  );
                                }
                              );
                            } else {
                              subQuestions.controls[subValIndex]
                                .get("answer")
                                .setValue(subelement.answer.answer);
                            }
                          }
                        }
                      });
                    });
                  }
                });
              });
            }
          });
        });
      });
  }
  questionForm: FormArray;
  getQuestionaries() {
    this.questionForm = new FormArray([]);
    this.healthService.getQuestionary().subscribe((res) => {
      this.questionariesDetails = res.data;
      let questions = res.data;
      let questionsData = questions.filter(
        (el) => el.questions && el.questions.length > 0
      );
      if (questionsData.length != this.questionForm.controls.length) {
        questionsData.forEach((element) => {
          let grp: FormGroup = new FormGroup({
            name: new FormControl(element.name),
            questions: this.BuildFormDynamic(element),
          });
          this.questionForm.push(grp);
        });
      }
    });
  }

  UploadFiles(event) {
    for (let i = 0; i < event.target?.files.length; i++) {
      this.uploadFilesData.push(event.target.files[i]);
    }
  }

  submitUploadFiles() {
    const formData = new FormData();
    this.uploadFilesData.forEach((element) => {
      formData.append("files", element);
    });
    this.healthService
      .addpatientsDocumentsBypid(this.patientdetailsdata._id, formData)
      .subscribe((res) => {
        this.file = null;
        this.uploadFilesData = [];
        this.getUploadFile();
      });
  }

  viewImage(item) {
    this.imageView = item.attachment;
  }

  checkedData = [];

  checkIfNumber(e) {
    e = e || window.event;
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (
      !charStr.match(/^[0-9]+$/) ||
      this.patientRegistrationForm.value.mobileNumber?.length == 10
    )
      e.preventDefault();
  }

  checkIfNumberAadhar(e) {
    e = e || window.event;
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (
      !charStr.match(/^[0-9]+$/) ||
      this.patientRegistrationForm.value.aadhaar?.length == 12
    )
      e.preventDefault();
  }

  printBarCodeLabel() {
    var printContents = document.getElementById("print-barcode").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  onTestDateChange(smapleDate) {
    this.selectedDate = smapleDate.target.value;
    if (new Date(this.selectedDate).valueOf() > new Date().valueOf()) {
      this.timePickerMin = "12:00 am";
    }
  }

  setTime(time) {
    this.scheduled_Hour = time;
  }
  // map code start
  loadPatientMap() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
  }

  // map code start
  loadMap() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
  }

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  // Map Marker DragEnd
  markerDragEnd($event: any) {
    // localStorage.removeItem('address')
    // this.patientRegistrationForm.value.address.reset()
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  //  Get Address from Map
  getAddress(latitude, longitude) {
    if (latitude && longitude) {
      this.geoCoder.geocode(
        { location: { lat: latitude, lng: longitude } },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              this.zoom = 16;
              this.address = results[0].formatted_address;
              let city = "";
              let state = "";
              results[0].address_components.forEach((address) => {
                address.types.forEach((type) => {
                  if (
                    type == "administrative_area_level_3" ||
                    type == "locality"
                  ) {
                    city = address.long_name;
                  }

                  if (type == "administrative_area_level_2") {
                    state = address.long_name;
                  }
                  if (type == "administrative_area_level_1") {
                    state = address.long_name;
                  }
                });
              });
              this.patientRegistrationForm.patchValue({
                address: this.address,
                city: city,
                state: state,
                latitude: this.latitude,
                longitude: this.longitude,
                address2: this.address2,
              });
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        }
      );
    } else {
      setTimeout(() => {
        this.setCurrentLocation();
      }, 0);
    }
  }

  CurrentAddress() {
    this.loadMap();
  }

  // map code end

  submitReason() {
    let obj = {
      tests: [this.selected_test_id],
      cancelReason: this.reasonForm.value.cancel_reason,
    };

    this.healthService.cancelPatientTest(obj).subscribe((res) => {
      if (res.statusCode == 200) {
        this.reasonForm.reset();
        this.dialog.closeAll();
        Swal.fire({
          icon: "success",
          title: `${res.message}`,
          confirmButtonText: "OK",
        });
        this.reasonForm.reset();
        this.patientRegistrationForm.reset();
        this.onFileChange(this.patientdetailsdata.pid);
      }
    });
  }
  getTechnician() {
    let obj = {
      role: "dd-technician",
      start: "",
      limit: "",
    };

    this.adminService.technicianList(obj).subscribe((resp) => {
      if (resp.statusCode == 200) {
        this.technicianListData = resp.data.users.filter(
          (user) => user.isOnline == true
        );
      }
    });
  }

  openVaccine() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.vaccineForm.invalid) {
      return;
    }
    Swal.fire({
      title: "Are you sure want to Assign Technician ?",

      icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let Obj = {
          patient: this.patientdetailsdata?._id,
          technician: this.vaccineForm.value.technician_id,
          vaccinatedDate: this.vaccineForm.value.vaccinatedDate,
          vaccineName: this.vaccineForm.value.vaccineName,
          vaccinationDose: this.vaccineForm.value.vaccinationDose,
          noOfPersons: this.vaccineForm.value.noOfPersons,
        };

        this.healthService
          .vaccinePatientAssignTechnician(Obj)
          .subscribe((res) => {
            if (res.statusCode == 200) {
              Swal.fire({
                title: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
          });
      }
    });
  }

  selectReferRole(event) {
    this.referRoleList = [];
    const role = event;
    const formData: any = {};
    if (role != "doctor") {
      (formData.companyId = this.user.company), (formData.category = role);
      this.getLaboratoryDetails(formData);
    } else {
      formData.role = role;
      this.adminService.usersList(formData).subscribe((resp) => {
        if (resp.statusCode == 200) {
          this.referRoleList = resp.data.users;
        }
      });
    }
  }

  getLaboratoryDetails(formData) {
    this.adminService.getSubdivision(formData).subscribe((res) => {
      this.referRoleList = res.data.subDivisions;
    });
  }

  clickmethod(value) {}

  openDownloadReportModel(contentModal, element) {
    this.selectedDownloadTest = element;
    const dialogRef = this.dialog.open(contentModal, {
      width: "30rem",
      data: {},
    });
  }

  downloadReport(element) {
    if (this.templeteForm.invalid) {
      return;
    }
    this.spinner.show();
    const reqObj = {
      testId: element._id,
      patientId: element.patient,
      templateId: this.templeteForm.value.template_type,
      isHeader: this.templeteForm.value.header_type,
      promotionPage: this.templeteForm.value.promotionPage,
      isReferralPatient: false,
      subdivision_id: this.userdetails?.subdivision_id,
    };

    this.healthService.downloadReport(reqObj).subscribe((res) => {
      this.spinner.hide();
      saveAs(
        res.data,
        this.patientRegistrationForm.value.name +
          "_" +
          element.test.displayName +
          ".pdf"
      );
      this.onClose();
      if (res.data)
        Swal.fire({
          title: "Downloaded SuccessFully",
          icon: "success",
          confirmButtonText: "Ok",
        });
    });
  }
  public onClose(): void {
    this.dialog.closeAll();
  }
  openDownloadReferralReportModel(contentModal, element) {
    this.selectedDownloadTest = element;
    this.data = this.patientdetailsdata;
    const dialogRef = this.dialog.open(contentModal, {
      width: "30rem",
      data: {},
    });
  }

  downloadReferralTestReport(testInfo, patientInfo) {
    this.spinner.show();
    const reqObj = {
      testId: testInfo.sidResultCode,
      patientId: patientInfo._id,
      isHeader: this.templeteForm.value.header_type,
      isReferralPatient: true,
    };

    this.health.downloadReport(reqObj).subscribe((res) => {
      this.spinner.hide();
      saveAs(res.data, testInfo.sidResultCode + ".pdf");
      this.onClose();
      if (res.data)
        Swal.fire({
          title: "Downloaded SuccessFully",
          icon: "success",
          confirmButtonText: "Ok",
        });
    });
  }
  openTestObjInfoModel(testObjInfo, element) {
    this.selectedTestInfoObj = element;
    this.data = this.testDetails;
    const dialogRef = this.dialog.open(testObjInfo, {
      width: "30rem",
      data: {},
    });
  }

  bulkupload(content) {
    this.loadBulkUploadForm();
    const dialogRef = this.dialog.open(content, {
      width: "30rem",
      data: {},
    });
  }

  onFileChanges(ev) {
    this.bulkPatients = [];
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const patients = Object.values(jsonData);
      const temp = patients.reduce((all: any, item) => all.concat(item), []);
      this.bulkPatients = temp;
      if (this.bulkPatients) {
        this.errormessage1 = "";
      }
    };
    reader.readAsBinaryString(file);
  }

  getOrganizationData() {
    const obj = {
      companyId: this.userdetails.company,
    };

    this.healthService.getOrganizationData(obj).subscribe((res) => {
      this.organizations = res.data.subDivisions;
      this.filteredOrganizations = this.organizations;
    });
  }

  selectedOrganization(id) {
    this.Subdivision_id = id;
    if (this.Subdivision_id) {
      this.errormessage = "";
    }
  }

  onSelectionChanged(value) {
    if (value) {
      this.filteredOrganizations = this.organizations.filter((org) => {
        if ([org.name].includes(value)) {
          return org;
        }

        // if (org.name.toLowerCase() == value.toLowerCase()) {
        //   return org;
        // }
      });
    }
    this.filteredOrganizations = this.organizations;
  }

  onSubmitUpload() {
    // if(this.userdetails?.role != 'admin'){
    //  this.Subdivision_id = this.userdetails?.Subdivision_id
    // }
    if (!this.bulkPatients) {
      this.errormessage = "Please Select the Organization";
      this.errormessage1 = "Please Upload Valid Excel file";

      return;
    }
    if (!this.Subdivision_id) {
      this.errormessage = "Please Select the Organization";
      return;
    }
    if (!this.bulkPatients) {
      this.errormessage1 = "Please Upload Valid Excel  File ";

      return;
    }
    if (this.bulkPatients.length === 0) {
      this.errormessage1 = "Please Upload Valid Excel  File ";
      return;
    }

    this.spinner.show();

    const obj = {
      patients: this.bulkPatients,
      subdivision_id: this.Subdivision_id,
    };

    this.healthService.addBulkPatientsOrganization(obj).subscribe((res) => {
      this.patientsOrgData = res.data.patients;
      this.invalidRecordsData = res.data.invalidRecords;
      this.invalidid = this.invalidRecordsData[0]?._id;
      this.spinner.hide();
      this.onClose();
      this.Subdivision_id = "";
      Swal.fire({
        text: `(${this.patientsOrgData?.length}) Patients Registered Successfully.`,
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#d33",
        cancelButtonText: "Okay",
        confirmButtonText: `Download (${this.invalidRecordsData?.length}) Invalid Patients Records`,
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.invalidid
            ? this.exportInvalidRecordsToexcels(this.invalidid)
            : null;
          // this.PatientbatchbulkData = res?.data?.data?.invalidRecords;
          // this.downloadInvalidRecordsAfterUpload(res?.data?.data?.batchId);
        }
      });
    });
  }

  sampleFileDownload() {
    FileSaver.saveAs(
      `${this.testReportUrl}PatientsBulkUpload.xlsx`,
      `PatientsBulkUpload.xlsx`
    );
  }

  exportInvalidRecordsToexcels(invalidid) {
    setTimeout(() => {
      / table id is passed over here /;
      const element = document.getElementById("patient-invalid-records");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      / generate workbook and add the worksheet /;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      / save to file /;
      XLSX.writeFile(wb, `Invalid Records_${moment().format("L")}.xlsx`);

      Swal.fire(` Invalid Records Downloaded Successfully `);
    }, 3000);
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  enterTestPaidAmount() {
    this.totalPaidAmount = 0;
    this.totalAmount = 0;
    const patientsTestSamples =
      this.patientRegistrationForm.value.patientTestsArray;
    console.log({ patientsTestSamples });

    patientsTestSamples.forEach((sTest) => {
      this.totalAmount += sTest?.price;
    });
  }
  changePadAmount() {
    this.totalPaidAmount = this.patientRegistrationForm.value.paidAmount;
    if (this.totalPaidAmount > this.totalAmount) {
      this.patientRegistrationForm.patchValue({
        paidAmount: this.totalAmount,
      });
    }
    this.totalPaidAmount = this.patientRegistrationForm.value.paidAmount;
  }

  getTransactions() {
    // const formData: any = PaginationUtility.getGridFilters(
    //   this.isDefault,
    //   this.pageEvent
    // );

    console.log(this.patientdetailsdata);

    const formData: any = {};
    if (this.patientdetailsdata && this.patientdetailsdata?.pid) {
      formData.search = this.patientdetailsdata?.pid;
    } else if (this.billingRes) {
      formData.search = this.billingRes;
    }
    // if (this.selectedInvoiceDate?.startDate) {
    //   formData.startDate = moment(this.selectedInvoiceDate?.startDate).format(
    //     'YYYY-MM-DD'
    //   );
    // }
    // if (this.selectedInvoiceDate.endDate) {
    //   formData.endDate = moment(this.selectedInvoiceDate?.endDate).format(
    //     'YYYY-MM-DD'
    //   );
    // }

    this.healthService.transactions(formData).subscribe(
      (transactionsRes: any) => {
        console.log("checking");
        this.transactions = transactionsRes?.data?.transactions || [];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectedInvoice(data: any) {
    this.patientpaymentObj = { ...data };
    this.patientpaymentObj.orderAmount = 0;
    if (!this.patientpaymentObj.billAmount) {
      this.patientpaymentObj.billAmount =
        this.patientpaymentObj.totalAmount - this.patientpaymentObj.orderAmount;
    }
    if (!this.patientpaymentObj.otherCharges) {
      this.patientpaymentObj.otherCharges = 0;
    }
    if (!this.patientpaymentObj.discountAmount) {
      this.patientpaymentObj.discountAmount = 0;
    }
    this.patientpaymentObj.paidAmount =
      Number(data.totalAmount || 0) - Number(data.dueAmount || 0);
    this.patientpaymentObj.paymentInfo = {};
    this.patientpaymentObj.paymentInfo.chequeNo = "";
    this.patientpaymentObj.paymentInfo.chequeDate = "";
  }

  addBillingData() {
    const data = {
      patient: this.patientdetailsdata?._id,
      tests: this.tests,
      billAmount: Number(this.patientpaymentObj.billAmount),
      totalAmount: Number(this.patientpaymentObj.totalAmount),
      orderAmount: Number(this.patientpaymentObj.orderAmount),
      dueAmount: Number(this.patientpaymentObj.dueAmount),
      discountAmount: Number(this.patientpaymentObj.discountAmount),
      otherCharges: Number(this.patientpaymentObj.otherCharges),
      comments: this.patientpaymentObj.comments,
      transactionType: this.selectedPayment,
      paymentInfo: {
        paymentType: this.selectedPayment,
        chequeNo: this.patientpaymentObj.paymentInfo.chequeNo,
        chequeDate: this.patientpaymentObj.paymentInfo.chequeDate,
        comments: this.patientpaymentObj.comments,
      },
      invoiceId: this.patientpaymentObj.invoiceId,
    };

    this.adminService.addBilling(data).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          Swal.fire({
            title: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          });
          this.patientpaymentObj = {};
          this.getTransactions();
          // this.router.navigateByUrl('/inventory/list');
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  otherChanges(event) {
    const charges = Number(this.patientpaymentObj.otherCharges);

    if (!isNaN(charges) && charges > 0 && charges) {
      this.patientpaymentObj.totalAmount = (
        Number(this.patientpaymentObj.billAmount) +
        Number(charges) -
        Number(this.patientpaymentObj.discountAmount || 0)
      ).toFixed(0);
      this.patientpaymentObj.dueAmount = (
        Number(this.patientpaymentObj.totalAmount) -
        Number(this.patientpaymentObj.orderAmount || 0)
      ).toFixed(0);
    } else {
      this.patientpaymentObj.totalAmount =
        this.patientpaymentObj.discountAmount > 0
          ? (
              Number(this.patientpaymentObj.billAmount) -
              Number(this.patientpaymentObj.discountAmount || 0)
            ).toFixed(0)
          : Number(this.patientpaymentObj.billAmount).toFixed(0);
      // this.patientpaymentObj.dueAmount = Number(this.patientpaymentObj.totalAmount).toFixed(0)
      this.patientpaymentObj.dueAmount = (
        Number(this.patientpaymentObj.totalAmount) -
        Number(this.patientpaymentObj.orderAmount || 0)
      ).toFixed(0);
      this.patientpaymentObj.otherCharges = 0;
    }
  }

  discount(type) {
    if (type === "percentage") {
      const Amount =
        Number(this.patientpaymentObj.billAmount) +
        (this.patientpaymentObj.otherCharges !== ""
          ? Number(this.patientpaymentObj.otherCharges || 0)
          : 0);
      const discountPercentage = Number(
        this.patientpaymentObj.discountPercentage
      );
      if (discountPercentage <= 100) {
        const discountPrice = Amount * (discountPercentage / 100);
        this.patientpaymentObj.discountAmount = discountPrice.toFixed(0);
        this.patientpaymentObj.totalAmount = (
          Number(this.patientpaymentObj.billAmount) -
          Number(this.patientpaymentObj.discountAmount || 0)
        ).toFixed(0);
        this.patientpaymentObj.totalAmount = (
          Number(this.patientpaymentObj.totalAmount) +
          (this.patientpaymentObj.otherCharges !== ""
            ? Number(this.patientpaymentObj.otherCharges)
            : 0)
        ).toFixed(0);
        this.patientpaymentObj.dueAmount = (
          Number(this.patientpaymentObj.totalAmount) -
          Number(this.patientpaymentObj.orderAmount || 0)
        ).toFixed(0);
      }
    } else {
      const Amount =
        Number(this.patientpaymentObj.billAmount) +
        (this.patientpaymentObj.otherCharges !== ""
          ? Number(this.patientpaymentObj.otherCharges || 0)
          : 0);
      const discountAmount = Number(this.patientpaymentObj.discountAmount || 0);
      if (discountAmount <= Amount) {
        const discountPercentage = (discountAmount / Amount) * 100;
        this.patientpaymentObj.discountPercentage =
          discountPercentage.toFixed(0);
        this.patientpaymentObj.totalAmount = (
          Number(this.patientpaymentObj.billAmount) -
          Number(this.patientpaymentObj.discountAmount || 0)
        ).toFixed(0);
        this.patientpaymentObj.totalAmount = (
          Number(this.patientpaymentObj.totalAmount) +
          (this.patientpaymentObj.otherCharges !== ""
            ? Number(this.patientpaymentObj.otherCharges || 0)
            : 0)
        ).toFixed(0);
        this.patientpaymentObj.dueAmount = (
          Number(this.patientpaymentObj.totalAmount) -
          Number(this.patientpaymentObj.orderAmount || 0)
        ).toFixed(0);
      }
    }
  }

  balancePaid() {
    const paidAmount = Number(this.patientpaymentObj.orderAmount);
    const dueAmount = Number(this.patientpaymentObj.dueAmount);
    console.log(paidAmount, dueAmount);
    if (paidAmount <= dueAmount && paidAmount) {
      this.patientpaymentObj.dueAmount = (
        Number(dueAmount) - Number(paidAmount)
      ).toFixed(0);
    } else {
      this.patientpaymentObj.dueAmount =
        paidAmount > dueAmount
          ? 0
          : Number(this.patientpaymentObj.totalAmount).toFixed(0);
    }
    // let dueAmt=this.patientpaymentObj.totalAmount-paidAmount;
    // this.patientpaymentObj.dueAmount=dueAmt
  }

  openInvoiceModel(dialogContent) {
    // this.selectedTransaction = transInfo;
    console.log(this.patientpaymentObj);
    if (!this.patientpaymentObj || !this.patientpaymentObj.orderAmount) {
      Swal.fire("Enter Paid Amount");
      return;
    }
    const dialogRef = this.dialog.open(dialogContent, {
      width: "40%",
      data: {},
    });
  }

  createPaymentLink() {
    this.spinner.show();
    const transInfo = this.patientpaymentObj;

    const params = {
      invoiceId: transInfo.invoiceId,
      orderAmount: transInfo.orderAmount,
      orderNote: "Medical Test Bill",
      customerName: transInfo.patient.name,
      customerPhone: transInfo.patient.mobileNumber,
      customerEmail: transInfo.patient.emailAddress,
      linkType: this.paymentLinkType,
    };

    this.healthService.createPaymentLink(params).subscribe(
      (res: any) => {
        this.spinner.hide();
        Swal.fire("Sent successFully!");
        this.dialog.closeAll();
      },
      (err) => {
        this.dialog.closeAll();

        this.spinner.hide();
        Swal.fire("Failed to send");
      }
    );
  }

  openTransactionLog(dialogContent, transInfo) {
    this.transactionLog$ = transInfo;
    const dialogRef = this.dialog.open(dialogContent, {
      width: "80%",
      data: {},
    });
  }
  currentMessage: any
  // dataSharing(){
    
  
  //   this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  // }
  }


function changeValidator() {
  throw new Error("Function not implemented.");
}
function year(arg0: number, year: any, arg2: number) {
  throw new Error("Function not implemented.");
}

