import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { HealthService } from "src/app/service/health.service";
import * as XLSX from "xlsx";
@Component({
  selector: "app-add-test-master-list-b2b",
  templateUrl: "./add-test-master-list-b2b.component.html",
  styleUrls: ["./add-test-master-list-b2b.component.scss"],
})
export class AddTestMasterListB2bComponent implements OnInit {
  bulkPatientForm: FormGroup = new FormGroup({
    file: new FormControl(""),
  });
  file: any;
  errormessage: any;
  bulkPatients: any;
  errormessage1 = " ";
  constructor(private dialog: MatDialog, private health: HealthService) {}

  ngOnInit(): void {}

  // onFileChange(event) {
  //   console.log("event", event.target.file);
  //   for (var i = 0; i < event.target.files.length; i++) {
  //     this.file = event.target.files[i];
  //     console.log("event.target.files[i]", event.target.files[i]);
  //   }
  // }

  onFileChange(ev) {
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
      console.log(this.bulkPatients);
      if (this.bulkPatients) {
        this.errormessage1 = "";
      }
    };
    reader.readAsBinaryString(file);
  }

  public onClose(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (!this.bulkPatients) {
      this.errormessage = "Please Upload Valid Excel file";
      return;
    }
    console.log("bulk upload data", this.bulkPatients);
    // this.health.saveBulkResult(formData).subscribe((res) => {
    //   console.log("patientres", res);
    //   this.onClose();
    //   alert(res.message);
    // });
  }

  fileUploaded() {
    this.errormessage = " ";
  }
}
