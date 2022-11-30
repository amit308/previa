import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HealthService } from 'src/app/service/health.service';
import { PageEvent } from '@angular/material/paginator';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import { NgxSpinnerService } from 'ngx-spinner';
import { event } from 'jquery';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {

  vaccineData: any
  vaccinationType='all';
  vaccinatedDate=null
  vaccinationDose =null
  searchString = null
  public date: Date;

  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  //pagination code ends here

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private healthService: HealthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getVaccine()
  }

  public onClose(): void {
    this.dialog.closeAll()
  }


  openUploadVaccineModel(contentModal) {
    const dialogRef = this.dialog.open(contentModal, {
      width: '30rem',
      data: {}
    });
  }

  ViewVaccine(patient_info) {
    console.log(patient_info.id, 'pid');
    localStorage.setItem('pid', patient_info.pid)

    this.router.navigateByUrl('/admin/patient')

  }

  getPatientVaccineData(formData) {
    this.spinner.show()
    this.healthService.getPatientsListvaccine(formData).subscribe(resp => {
      this.spinner.hide()
      this.vaccineData = resp?.data?.patients
      this.length = resp.data.total_count

      console.log(this.vaccineData, 'data');

    })
  }

  getVaccine() {
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)

    formData['vaccinationPatients'] = "true"
    // formData['vaccinatedDate'] = this.vaccinatedDate
    formData['vaccinationDose'] = this.vaccinationDose
   
      formData['vaccinatedDate'] = this.vaccinatedDate
    if(this.searchString != null){
      formData['searchString'] = this.searchString
    }
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getPatientVaccineData(formData)

  }
  
  getVaccinePatients(event) {
    let value = (<HTMLInputElement>event.target).value;
    if (value) {
      this.searchString = value
      this.getVaccine()
    } else {
    }

  }

  changeVaccinatedDate(){
    this.getVaccine()
    }
    
  
  changeDose(event){
    console.log('Dose' , event.target.value)
    this.vaccinationDose = event.target.value
    this.getVaccine()
  }

  onPageEvent(event) {
    console.log(event, 'event');

    this.isDefault = false;
    this.pageEvent = event;
    this.getVaccine()
    console.log("page", this.pageEvent?.pageIndex, this.pageEvent?.pageSize)
  }


  public  sortEvent(event): void{
    console.log("event",event,this.sortDirection)
   
    if(this.sortvalue === event){
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    }else{
      this.sortDirection = 'ASC'
    }
    console.log("sirtdirction",this.sortDirection)
    this.sortvalue = event
     
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    formData['vaccinationPatients'] = "true"
    this.getPatientVaccineData(formData)
  }

  selectedDate(event){
    console.log(event.target.value,'hiii'); 

   }
   
   clearDate(event) {
    event.stopPropagation();
    this.vaccinatedDate = null;
    this.getVaccine()

  }
}
