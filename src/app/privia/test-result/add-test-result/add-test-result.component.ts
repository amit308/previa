import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HealthService } from 'src/app/service/health.service';

@Component({
  selector: 'app-add-test-result',
  templateUrl: './add-test-result.component.html',
  styleUrls: ['./add-test-result.component.scss']
})
export class AddTestResultComponent implements OnInit {
  bulkPatientForm: FormGroup = new FormGroup({
    file: new FormControl('')
  })
  file: any;
  errormessage: any;

  constructor(private dialog: MatDialog,private health:HealthService) { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    console.log("event", event.target.file)
    for (var i = 0; i < event.target.files.length; i++) {
      this.file = event.target.files[i]
      console.log('event.target.files[i]', event.target.files[i])
    }
  }

  public onClose(): void {
    this.dialog.closeAll()
  }

  onSubmit(){
    if(!this.file){
      this.errormessage = "Please Upload Valid Excel file";
      return
    }
    console.log("file", this.bulkPatientForm.value)
    const formData = new FormData();
    formData.append('file', this.file)
    this.health.saveBulkResult(formData).subscribe(res => {
      console.log("patientres", res)
      this.onClose()
      alert(res.message)
    })
  }

  fileUploaded(){
    this.errormessage = " "
  }

}
