import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
 
  selectDailog: any;
  patientForm:FormGroup;
  bulkPatientForm: FormGroup;
  file: any;
  submitted = false;
  errormessage1:any;
  constructor( private dialog:MatDialog,
    private healthService:HealthService,
    private dialogRef: MatDialogRef<AddPatientComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      this.selectDailog = data.action;
      console.log("select",this.selectDailog)

      this.bulkPatientForm = this.fb.group({
            file:[""]
      })

      this.patientForm = this.fb.group({
        image:[""],
        name: [""],
        emailAddress: [""],
        mobileNumber: [""],
        gender: [""],
        age: [""],
        address: [""],
        tests:[""]
      })
     }

  ngOnInit(): void {
  }

  get f() {
    return this.bulkPatientForm.controls;
  }


  onFileChange(event){
    // const fileName = event.target.files[i].name.split('.')
    //   console.log('size', fileName.size);
    //   console.log('type', fileName.type);
    //   let check = fileName.filter(item => {
    //     return item.toUpperCase() === 'PDF' || item.toUpperCase() === 'DOCX' || item.toUpperCase() === 'DOC' || item.toUpperCase() === 'JPEG' || item.toUpperCase() === 'JPG' || item.toUpperCase() === 'PNG'
    //   })
    // console.log("event",event.target.file)
    for (var i = 0; i < event.target.files.length; i++) {
        this.file = event.target.files[i]
        // let check = fileName.filter(item => {
        //   return item.toUpperCase() ==
        // })
        console.log('event.target.files[i]', event.target.files[i])
      }
    }
  onSubmit(){
    // this.submitted = true;
 
    // // stop here if form is invalid
    // if (this.bulkPatientForm.invalid) {
    //   return;
    // }

    if(!this.file) {
      this.errormessage1 = "Please Upload Valid Excel  File ";
      
      
        return
      }
      if(this.file.length == 0) {
        this.errormessage1 = "Please Upload Valid Excel  File ";
        
        
          return
        }
    if(this.selectDailog === "addbulk"){
      console.log("file",this.bulkPatientForm.value)
      const formData = new FormData();
      formData.append('file', this.file)
      this.healthService.addBulkPatients(formData).subscribe(res=>{
        console.log("patientres",res)
        this.onClose()
        Swal.fire(res.message)
      })
    }else{
      console.log("patient",this.patientForm.value)

      const formData ={
        "name": this.patientForm.value.name,
        "emailAddress": this.patientForm.value.emailAddress,
        "mobileNumber": this.patientForm.value.mobileNumber,
        "gender": this.patientForm.value.gender,
        "age": this.patientForm.value.age,
        "address": this.patientForm.value.address,
        "tests": [
          this.patientForm.value.tests
        ]
      }
      this.healthService.addPatients(formData).subscribe((res)=>{
        console.log("addPatient",res)
        Swal.fire(res.message)
        this.onClose()
      })
    }
    

  }

  public onClose(): void{
    this.dialog.closeAll()
  }

  fileUpload(){
  
    
    this.errormessage1 = " ";
      
  
  }

}
