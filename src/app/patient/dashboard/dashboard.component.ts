import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HealthService } from 'src/app/service/health.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('testModal') customTemplate: TemplateRef<any>;
  patientData: any
  userDetails: any

  constructor(
    public dialog: MatDialog,
    private healthService: HealthService    
    ) { }

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('user_details'))
    this.userDetails = user
    setTimeout( () => {
      const dialogRef = this.dialog.open(this.customTemplate, {
        width: '50%'
     });
     },1000);
  }
 
  openTests(): void { }



public onClose(): void {
  this.dialog.closeAll()
}



//loading patient data
getPatientData(){  
  let obj = {
    mobileNumber: '',
    email: ''
  }
  this.healthService.getDDTechnicians(obj).subscribe((resp)=>{
    this.patientData = resp.data
  })
}


}
