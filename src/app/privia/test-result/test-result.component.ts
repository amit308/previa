import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HealthService } from "src/app/service/health.service";
import Swal from "sweetalert2";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AddTestResultComponent } from "./add-test-result/add-test-result.component";
import { NgxPrinterService } from "ngx-printer";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import { saveAs } from "file-saver";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-test-result",
  templateUrl: "./test-result.component.html",
  styleUrls: ["./test-result.component.scss"],
})
export class TestResultComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "test",
    "Result/Remarks",
    "flag",
    "unit",
    "Reference Range",
    "comments",
    "templates",
    "Updated Time",
    "option",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  obj: any = {};
  options: any;
  templeteForm: FormGroup;
  data: any;
  search = new FormControl("");
  patientDetailsData: any;
  testDetails: any;
  TestReportDetails: any;
  age: number;
  editTemplateFlag: boolean = false;
  public Editor = ClassicEditor;
  currentItem: any;
  templateViewContent: any;
  globalTemplate: string;
  selectedDownloadTest: any;
  selectedTestResultTemplate: any;
  ngAfterViewInit() {}
  p_id: any;
  closeResult = "";
  docViweEditorFlag: boolean = false;
  public isDisabled = true;
  userdetails: any;
  doc =
    "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc";
  organizationPatientInfo: any;
  selectedTestInfoObj = {};
  constructor(
    public health: HealthService,
    public dialog: MatDialog,
    private printerService: NgxPrinterService,
    private cdf: ChangeDetectorRef,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.hide();
    this.templeteForm = this.fb.group({
      header_type: [""],
      template_type: [""],
      promotionPage: [true],
    });
  }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem("user_details"));
  }

  open(content, item) {
    this.currentItem = item;
    this.editTemplateFlag = false;
    this.isDisabled = true;
    if (
      this.currentItem?.value != null ||
      this.currentItem?.value != undefined
    ) {
      // if (this.globalTemplate != null || this.globalTemplate != undefined) {
      //   this.templateViewContent = this.globalTemplate;
      // } else {
      this.templateViewContent = this.currentItem?.value;
      // }
    } else {
      // if (this.globalTemplate != null || this.globalTemplate != undefined) {
      // this.templateViewContent = this.globalTemplate;
      // } else {
      this.templateViewContent = this.currentItem?.testResult?.template;
      // }
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

  toggleDisabled() {
    this.editTemplateFlag = !this.editTemplateFlag;
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled === true) {
      this.globalTemplate = null;
    }
  }

  public changedTemplateContent({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.globalTemplate = data;
  }

  saveTemplateEditData(reason) {
    this.modalService.dismissAll();
    this.templateViewContent = this.globalTemplate;

    let req = {
      tests: [
        {
          test: this.currentItem._id,
          value: this.templateViewContent,
        },
      ],
    };
    this.health.updatePatientTestByPid(req).subscribe((res) => {
      console.log("test update resp", res);
      if (res.statusCode === 200) {
        Swal.fire({
          title: "WelCome!",
          text: `${res?.message}`,
          icon: "success",
          confirmButtonText: "ok",
        }).then((result) => {
          this.globalTemplate = null;
          this.health.getPatientsbyPId(this.search.value).subscribe((res) => {
            if (res.statusCode === 200) {
              if (res.data.isReferralPatient) {
                res.data["organizationPatientInfo"]
                  ? (res.data["organizationPatientInfo"]["description"] =
                      JSON.parse(
                        res.data["organizationPatientInfo"]["description"]
                      ))
                  : "";
                this.testDetails = res.data;
              } else {
                this.testDetails = res.data.tests.filter((res) => {
                  return (
                    res.status === "received" || res.status === "completed"
                  );
                });
                this.dataSource = new MatTableDataSource<any>(this.testDetails);
                this.dataSource.paginator = this.paginator;
              }
            }
          });
        });
      }
    });
  }

  crossClick() {
    this.modalService.dismissAll();
    this.globalTemplate = null;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.globalTemplate = null;
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.globalTemplate = null;
      console.log("backdrop");
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  editDocView() {
    this.docViweEditorFlag = true;
  }

  submit() {
    console.log(this.search.value);
    this.health.getPatientsbyPId(this.search.value).subscribe((res) => {
      if (res.statusCode === 200) {
        if (res.data.isReferralPatient) {
          res.data["organizationPatientInfo"]
            ? (res.data["organizationPatientInfo"]["description"] = JSON.parse(
                res.data["organizationPatientInfo"]["description"]
              ))
            : "";
          this.testDetails = res.data;
          this.dataSource = new MatTableDataSource<any>(this.testDetails);
          console.log("testDetails", this.testDetails);
        } else {
          this.testDetails = res.data.tests.filter((res) => {
            return (
              res.status === "SampleReceived" || res.status === "completed"
            );
          });
          this.dataSource = new MatTableDataSource<any>(this.testDetails);
          this.dataSource.paginator = this.paginator;
        }
        Swal.fire({
          title: "WelCome!",
          text: `${res?.message}`,
          icon: "success",
          confirmButtonText: "ok",
        }).then((result) => {});
      }
    });
  }

  update(el: any) {
    this.obj.test = el._id;
    if (this.globalTemplate != null || this.globalTemplate != undefined) {
      this.obj.value = this.globalTemplate;
    } else if (
      this.globalTemplate == null ||
      this.globalTemplate == undefined
    ) {
      this.obj.value = el.value;
    }

    this.obj.comment = el.comment;
    this.obj.templateId = el.templateId;

    let req = {
      tests: [this.obj],
    };
    this.health.updatePatientTestByPid(req).subscribe((res) => {
      if (res.statusCode === 200) {
        Swal.fire({
          title: "WelCome!",
          text: `${res?.message}`,
          icon: "success",
          confirmButtonText: "ok",
        }).then((result) => {
          this.globalTemplate = null;
          this.health.getPatientsbyPId(this.search.value).subscribe((res) => {
            if (res.statusCode === 200) {
              if (res.data.isReferralPatient) {
                res.data["organizationPatientInfo"]
                  ? (res.data["organizationPatientInfo"]["description"] =
                      JSON.parse(
                        res.data["organizationPatientInfo"]["description"]
                      ))
                  : "";
                this.testDetails = res.data;
                console.log("testDetails", this.testDetails);
              } else {
                this.testDetails = res.data.tests.filter((res) => {
                  return (
                    res.status === "received" || res.status === "completed"
                  );
                });
                this.dataSource = new MatTableDataSource<any>(this.testDetails);
                this.dataSource.paginator = this.paginator;
              }
            }
          });
        });
      }
    });
  }

  getpatients(event) {
    let value = (<HTMLInputElement>event.target).value;
    if (value) {
      this.health.getPatientsDataBySearch(value).subscribe((res) => {
        this.options = res.data.patients;
      });
    } else {
      this.options = [];
    }
  }

  onFileChange(event) {
    this.health.getPatientsbyPId(event).subscribe((res) => {
      this.patientDetailsData = res.data;
    });
  }

  // addBulkPatients():void{
  //   console.log("======================")
  //   const dialogRef = this.dialog.open(AddTestResultComponent, {
  //     width: '250px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  uploadResults() {
    const dialogRef = this.dialog.open(AddTestResultComponent, {
      width: "30rem",
      data: {},
    });
  }
  printReport(testreport) {
    this.TestReportDetails = testreport;
    if (
      this.TestReportDetails?.value != null ||
      this.TestReportDetails?.value != undefined
    ) {
      console.log("if caseeeeeee");
      this.templateViewContent = this.TestReportDetails?.value;
    } else {
      console.log("else caseeeeeee");
      this.templateViewContent = this.TestReportDetails?.testResult?.template;
    }
    this.cdf.detectChanges();
    console.log("..", this.TestReportDetails);
    this.printerService.printByClassName("printReport");
  }
  calculate(date) {
    var timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    // console.log("date", event, this.age)
    // return Math.abs(age.getUTCFullYear() - 1970);
    return age;
  }
  openDownloadReportModel(contentModal, element) {
    this.selectedDownloadTest = element;
    this.data = this.testDetails;
    const dialogRef = this.dialog.open(contentModal, {
      width: "30rem",
      data: {},
    });
  }
  openDownloadReferralReportModel(contentModal, element) {
    this.selectedDownloadTest = element;
    this.data = this.testDetails;
    const dialogRef = this.dialog.open(contentModal, {
      width: "30rem",
      data: {},
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

  selectedTestTemplate(template) {
    this.selectedTestResultTemplate = template?._id;
  }

  downloadReport(element) {
    if (this.templeteForm.invalid) {
      return;
    }
    this.spinner.show();
    const reqObj = {
      testId: element._id,
      patientId: element.patient,
      isHeader: this.templeteForm.value.header_type,
      isReferralPatient: false,
      promotionPage: this.templeteForm.value.promotionPage,
      subdivision_id: this.userdetails?.subdivision_id,
    };
    this.health.downloadReport(reqObj).subscribe((res) => {
      this.spinner.hide();
      saveAs(
        res.data,
        this.patientDetailsData?.name +
          "_" +
          element.test.testMaster.displayName +
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

  public onClose(): void {
    this.dialog.closeAll();
  }
}
