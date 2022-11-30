import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { HealthService } from "src/app/service/health.service";
import { AdminService } from "src/app/service/admin.service";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { PaginationUtility } from "src/app/shared/pagination/pagination-utility";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-labassign",
  templateUrl: "./labassign.component.html",
  styleUrls: ["./labassign.component.scss"],
})
export class LabassignComponent implements OnInit {
  checkAllPatients: Boolean = false;
  selectedPatientsDate: any = { startDate: null, endDate: null };
  checkedLabPatients: any = [];
  searchValue = "";
  materialName: any;
  bulkUploadForm: FormGroup;
  Subdivision_id: any;
  bulkPatients: any;
  errormessage1 = " ";
  testReportUrl = environment.testReportBaseurl;
  errormessage = "";
  patientsOrgData: any;
  invalidRecordsData: any;
  invalidid: any;
  isDefault = true;
  isLabDefault = true;
  labPageEvent: PageEvent;
  sortDirection: string;
  sortvalue: any;
  patientTestStatus = "AwaitingSampleTechnician";
  patientDetails: any = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  subdivisionInfo: any;
  userdetails: any;
  organizations: any;
  filteredOrganizations: any;
  disabled = null;
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  };
  user: any;
  referRoleList = [];
  selectedLab: any;
  subDivisionDetails: any;
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private healthService: HealthService,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.userdetails = JSON.parse(localStorage.getItem("user_details"));
    this.subDivisionDetails = JSON.parse(localStorage.getItem("subdivision"));
    this.selectedPatientsDate.startDate = moment()
      .subtract(1, "days")
      .startOf("day");
    this.selectedPatientsDate.endDate = moment()
      .subtract(0, "days")
      .startOf("day");
  }

  ngOnInit(): void {
    this.healthService.getUserById().subscribe((res) => {
      this.subdivisionInfo = res?.subdivisionInfo;

      this.loadBulkUploadForm();
    });
    this.getOrganizationData();
    this.getLaboratoryDetails();

    this.user = JSON.parse(localStorage.getItem("user_details"));
    console.log("subdivisionDetails", this.subDivisionDetails);
  }

  getLaboratoryDetails() {
    const formData: any = {};
    formData.companyId = this.userdetails.company;
    formData.category = "lab";
    this.adminService.getSubdivision(formData).subscribe((res) => {
      console.log(res.data);
      this.referRoleList = res.data.subDivisions;
      console.log(this.referRoleList);
    });
  }

  openInvoiceModel(dialogContent) {
    const dialogRef = this.dialog.open(dialogContent, {
      width: "40%",
      data: {},
    });
  }

  createMaterialType() {
    console.log(this.materialName);
    const params = {
      name: this.materialName,
      category: "lab",
      city: "",
      contactPerson: "",
      country: "",
      description: "",
      enableEmail: false,
      enableSMS: false,
      enableScheme: false,
      enableTokenSystem: false,
      invoiceFooter: "",
      mobile: "",
      paddingCode: "",
      password: "",
      phone: "",
      pin: "",
      portal_api: "",
      state: "",
      statusDisplayName: "",
      statusName: "",
      street: "",
      testStatus: [],
      type: "",
      user_name: "",
    };
    this.adminService.addSubdivision(params).subscribe(
      (resp: any) => {
        if (resp) {
          //console.log(resp);
          //this.dialog.closeAll();
          Swal.fire({
            title: "WelCome!",
            text: `${resp?.message}`,
            icon: "success",
            confirmButtonText: "ok",
          });
          this.materialName = null;
          this.getLaboratoryDetails();
          // this.getResultUnit();
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

  getOrganizationData() {
    const obj = {
      companyId: this.userdetails.company,
    };

    this.healthService.getOrganizationData(obj).subscribe((res) => {
      this.organizations = res.data.subDivisions;
      this.filteredOrganizations = this.organizations;
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
  sampleFileDownload() {
    FileSaver.saveAs(
      `${this.testReportUrl}PatientsBulkUpload.xlsx`,
      `PatientsBulkUpload.xlsx`
    );
  }
  public onClose(): void {
    this.dialog.closeAll();
  }
  onSubmitUpload() {
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
      this.errormessage1 = "Please Upload Valid Excel file ";

      return;
    }
    if (this.bulkPatients.length === 0) {
      this.errormessage1 = "No Patient Found In Excel ";
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
      this.getPatients();
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
        }
      });
    });
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
  submitAssign() {
    const params = {
      subDivision_id: this.selectedLab || this.subdivisionInfo._id,
      patients: this.checkedLabPatients,
    };

    this.spinner.show();
    this.healthService.labAssign(params).subscribe((res) => {
      this.spinner.hide();
      this.checkAllPatients = null;
      this.checkedLabPatients = [];
      Swal.fire("Assigned SuccessFully");
      this.changePatientsType();
      this.dialog.closeAll();
    });
  }

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

  changePatientsDate() {
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    if (this.selectedPatientsDate) {
      this.getPatients();
    } else {
      this.changePatientsType();
    }
  }
  clearDate() {
    this.selectedPatientsDate = null;
    this.changePatientsType();
  }
  changePatientsType() {
    this.spinner.show();
    this.checkAllPatients = null;
    this.checkedLabPatients = [];
    this.getPatients();
  }

  getPatients() {
    const formData: any = PaginationUtility.getGridFilters(
      this.isLabDefault,
      this.labPageEvent
    );

    if (this.sortvalue) {
      formData.sortBy = this.sortvalue;
      formData.sortOrder = this.sortDirection;
    }
    if (this.selectedPatientsDate?.startDate) {
      formData.startDate = moment(this.selectedPatientsDate?.startDate).format(
        "YYYY-MM-DD"
      );
    }
    if (this.selectedPatientsDate?.endDate) {
      formData.endDate = moment(this.selectedPatientsDate?.endDate).format(
        "YYYY-MM-DD"
      );
    }
    if (this.searchValue) {
      formData.searchString = this.searchValue;
    }
    formData.testsStatus = this.patientTestStatus;
    formData.isLabAssignPatients = true;
    this.healthService.getPatientsTestsCountsList(formData).subscribe((res) => {
      this.spinner.hide();
      this.patientDetails = res.data.patientTests;
      this.length = res.data.total_count;
    });
  }
  upload(contentModal) {
    this.errormessage1 = "";
    const dialogRef = this.dialog.open(contentModal, {
      width: "30rem",
      data: {},
    });
  }
  clear() {
    this.dialog.closeAll();
  }
  selectAllPatientsToLab(event, patientDetails) {
    this.patientDetails = this.patientDetails.map((patient) => {
      patient.isChecked = event.target.checked;
      return patient;
    });
    this.checkedLabPatients = this.patientDetails.filter((patientInfo) => {
      return patientInfo?.isChecked === true;
    });
  }
  selectPatientToLab(event, patientInfo) {
    this.patientDetails = this.patientDetails.map((patient) => {
      if (patient.sid === patientInfo.sid) {
        this.checkedLabPatients.map((checkPatient) => {
          if (checkPatient.sid === patientInfo.sid) {
            patient.isChecked = event.target.checked;
          }
          return checkPatient;
        });
        patient.isChecked = event.target.checked;
      }
      return patient;
    });
    this.checkedLabPatients = this.patientDetails.filter((patientInfo) => {
      return patientInfo?.isChecked === true;
    });
  }
  assignToLab(dialogContent) {
    const dialogRef = this.dialog.open(dialogContent, {
      width: "40%",
      data: {},
    });
  }
  onLabAssignPageEvent(event) {
    this.isLabDefault = false;
    this.labPageEvent = event;
    this.getPatients();
  }
}
