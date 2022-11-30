import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HealthService } from "src/app/service/health.service";
import { PaginationUtility } from "src/app/shared/pagination/pagination-utility";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

@Component({
  selector: "app-ftp-upload",
  templateUrl: "./ftp-upload.component.html",
  styleUrls: ["./ftp-upload.component.scss"],
})
export class FtpUploadComponent implements OnInit {
  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  //pagination code ends here

  bulkPatients: any;
  ftpForm: FormGroup;
  ftpFileUploadForm: FormGroup;
  headerText: any;
  action: any;
  submitted = false;
  issubmitted = false;
  // ftpData: any
  ftpData: File = null;
  companyId: any;
  ftpFile: any;
  onloadUrl1 = "";

  errormessage1: any;
  arrayBuffer: any;
  file: File;

  fileToUpload: File | null = null;

  uploadedFiles: Array<File>;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private healthservice: HealthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.ftpForm = this.fb.group({
      company_name: ["", Validators.required],
      host: ["", Validators.required],
      port: ["", Validators.required],
      userName: ["", Validators.required],
      password: ["", Validators.required],
      folder_path: ["", Validators.required],
      emails: ["", Validators.required],
    });
    this.lodform();
    this.ftpFileUploadForm = this.fb.group({
      file_name: [""],
    });
  }

  ngOnInit(): void {
    this.getFtp();
    // this.loadFtp()
  }

  openFtpmodal(content, item) {
    this.ftpFileUploadForm.reset();

    this.companyId = item?._id;
    console.log(this.companyId);

    this.errormessage1 = " ";
    const dialogRef = this.dialog.open(content, {
      width: "30rem",
      data: {},
    });
  }

  addFtp(content) {
    this.ftpForm.reset();
    this.headerText = "ADD";
    this.action = "add";
    const dialogRef = this.dialog.open(content, {
      width: "40rem",
      data: {},
    });
  }

  editftp(content) {
    this.headerText = "UPDATE";

    this.action = "update";

    const dialogRef = this.dialog.open(content, {
      width: "30rem",
      data: {},
    });
  }

  public onClose(): void {
    this.dialog.closeAll();
    this.ftpFileUploadForm.reset();
  }

  get f() {
    return this.ftpForm.controls;
  }
  get g() {
    return this.ftpFileUploadForm.controls;
  }

  // editftp() {
  //   // this.categoryId = p._id
  //   // this.catageoryForm.patchValue({
  //   //   catagory_name: p.name,
  //   // })
  //   this.headerText = "UPDATE"

  // }

  // addftp() {
  //   this.headerText = "ADD"
  //   // this.name = "Submit";
  //   // this.catageoryForm.reset()
  // }

  lodform() {
    if (this.action === "update") {
      this.ftpForm.patchValue({});
    } else {
    }
  }

  submit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ftpForm.invalid) {
      return;
    }
    if (this.action === "add") {
      // console.log(this.ftpForm.value,"form");
      const contactEmails = this.ftpForm.value.emails
        ? this.ftpForm.value.emails.split(",")
        : [];
      let reqObj = {
        company_name: this.ftpForm.value.company_name,
        host: btoa(this.ftpForm.value.host),
        username: btoa(this.ftpForm.value.userName),
        password: btoa(this.ftpForm.value.password),
        folder_path: this.ftpForm.value.folder_path,
        port: this.ftpForm.value.port,
        contactEmails: contactEmails,
      };

      this.spinner.show();
      this.healthservice.createFtp(reqObj).subscribe(
        (res) => {
          this.spinner.hide();
          if (res.statusCode == 200) {
            this.getFtp();
            this.onClose();
            Swal.fire({
              title: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
    }
  }

  //  fileUploading(element) {
  //   this.file = element.target.files[0];
  //   console.log(this.file,'file');
  // this.upload()
  // }

  // upload() {

  //   this.bulkPatients = [];
  //   let fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //         this.arrayBuffer = fileReader.result;
  //         var data = new Uint8Array(this.arrayBuffer);
  //         var arr = new Array();
  //         for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  //         var bstr = arr.join("");
  //         var workbook = XLSX.read(bstr, {type:"binary"});
  //         var first_sheet_name = workbook.SheetNames[0];
  //         var worksheet = workbook.Sheets[first_sheet_name];
  //         console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
  //     }
  //     fileReader.readAsBinaryString(this.file);
  //     this.bulkPatients = this.file
  // }

  viewFiles(ftpInfo) {
    localStorage.setItem("company_id", ftpInfo?._id);
    this.router.navigateByUrl("/admin/ftp-upload-view-files");
  }

  fileUploading(event) {
    this.bulkPatients = [];
    const file = event.target.files[0];
    this.bulkPatients = file;
    console.log(this.bulkPatients, "bulk");
  }

  ftpFileSubmit() {
    this.issubmitted = true;
    if (this.ftpFileUploadForm.invalid) {
      return;
    }
    if (!this.bulkPatients) {
      this.errormessage1 = "Please Upload Valid File";
      return;
    }
    if (this.bulkPatients.length == 0) {
      this.errormessage1 = "Please Upload Valid Excel  File ";
      return;
    }
    var formData: any = new FormData();
    formData.append("company_id", this.companyId);
    formData.append("file_path", this.bulkPatients);
    this.spinner.show();
    this.healthservice.ftpUpload(formData).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.statusCode == 200) {
          this.onClose();
          Swal.fire({
            title: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  clearError() {
    this.errormessage1 = " ";
  }

  loadFtp(formData) {
    this.healthservice.getFtpData(formData).subscribe((res) => {
      console.log(res.data);
      this.ftpData = res.data.companies;
      this.length = res.data.total_count;
    });
  }

  getFtp() {
    let formData = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );

    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue;
      formData["sortOrder"] = this.sortDirection;
    }
    this.loadFtp(formData);
  }

  public sortEvent(event): void {
    // console.log("event",event,this.sortDirection)

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
    this.loadFtp(formData);
  }

  onPageEvent(event) {
    // console.log(event, 'event');

    this.isDefault = false;
    this.pageEvent = event;
    this.getFtp();
  }
}
