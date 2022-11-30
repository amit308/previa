import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';

@Component({
  selector: 'app-technician-pending-completed',
  templateUrl: './technician-pending-completed.component.html',
  styleUrls: ['./technician-pending-completed.component.scss']
})
export class TechnicianPendingCompletedComponent implements OnInit {

  panelOpenState = false;
  technicianInfo:any
  technicianSlots:any
  technicianListData:any
  mySelect = "Pending";
  status = "pending"
  page: number = 1;
  data:any

  technicianForm: FormGroup

  constructor( private service:AdminService, private healthService:HealthService,
    private fb: FormBuilder) {
      this.technicianForm = this.fb.group({
        selected_technician: [''],
        sampleCollectionDate: ['']
      })
     }

  ngOnInit(): void {
    this.getTechnicians();
  this.getTechnicianSlots(this.status,this.technicianForm.value.selected_technician)
  }

  
 public statuss = [
  {
    viewName: "Completed",
    status: "collected"
  },
  {
    viewName: "Pending",
    status: "pending"
  },
  {
    viewName: "All",
    status: ""
  },
  
]


  getTechnicians() {
    let obj = {
      role: 'dd-technician'
    }
    this.service.technicianList(obj).subscribe((resp) => {
      if (resp.statusCode == 200) {
        this.technicianListData = resp?.['data']?.['users'];
        console.log(this.technicianListData, 'ordersInfoDatafddf');
      }
    })
  }




getTechnicianSlots(selectType,id) {

  const technician_ID = this.technicianForm.value.selected_technician

  console.log(technician_ID,'technician_ID');
  
  let obj = {
    id: technician_ID,
  
  }
  
  let status = ""

  if (selectType === "Completed") {
    status = "collected"
  }
  if (selectType === "Pending") {
    status = "pending"
  }
  if (selectType === "All") {
    status = ""
  }
    this.healthService.getTechnicianSlots({id: technician_ID,status}).subscribe(res => {
   
    if (res.statusCode == 200) {
      res ? (this.technicianSlots = res?.data?.slots) : null
      console.log(this.technicianSlots,"ravindra");
      
    }else{
      this.technicianSlots = []
    }
  })
}

selectChange(event) {
  this.page = 1
  this.status = event.target.value
  this.getTechnicianSlots(this.status,this.technicianForm.value.selected_technician)
  
  
}
}
