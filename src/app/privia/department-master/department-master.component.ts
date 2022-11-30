import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import {HealthService} from './../../service/health.service';
@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.scss']
})
export class DepartmentMasterComponent implements OnInit {
  departForm: FormGroup = new FormGroup({
    vitalDepartment: new FormControl(''),
    shortName: new FormControl(''),
    name: new FormControl(''),
    order: new FormControl(''),
    report: new FormControl(''),
    validFrom: new FormControl(''),
    validTo: new FormControl(''),
    SC: new FormControl(''),
    SR: new FormControl(''),
    inactive: new FormControl(''),
  })

  departModel:any = {};
  saveDisabled :Boolean = false;
  updateDisabled :Boolean = true;
  updateId: any;
  departmentDetails: any;

  
   //pagination and api integration starts from here
   length = 100;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 50, 100];
   pageEvent: PageEvent;
   isDefault: boolean = true;
   sortDirection: string;
   sortvalue: any;
   //pagination code ends here

  ngAfterViewInit() {
  }
  constructor(private health: HealthService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  // getDepartments() {
  //   this.health.getDepartments().subscribe(res => {
  //     this.departmentDetails = res.data.departments
  //     this.dataSource = new MatTableDataSource<any>(res.data.departments);
  //   })
  // }

  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getDepartments()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }

  getDepartments(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getDepartmentsDetails(formData)
  
  }

  getDepartmentsDetails(formData){
    this.health.getDepartmentsList(formData).subscribe(res => {
          this.departmentDetails = res.data.departments
          this.length = res.data.total_count
    })
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
    this.getDepartmentsDetails(formData)
  }

  saveDept() {
    this.departForm.get('order').setValue(parseInt(this.departForm.value.order));
    this.health.saveDepart(this.departForm.value).subscribe(res => {
      if(res.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         }).then(result=>{
          this.getDepartments();
        })
     
      }
      
    })
  }

  updateDept() {
    this.health.updateDepartments(this.updateId,this.departForm.value).subscribe(res=>{
      if(res.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         }).then(result=>{
          this.getDepartments();
        })
     
      }
    })
  }

  clearDept() {
    this.departForm.reset();
    this.saveDisabled = false;
    this.updateDisabled = true;
  }

 

  editDepart(ele: any) {
    this.updateId = ele._id;
    this.departModel.vitalDepartment = ele.vitalDepartment;
    this.departModel.shortName = ele.shortName;
    this.departModel.name = ele.name;
    this.departModel.order = ele.order;
    this.departModel.report = ele.report;
    this.departModel.validFrom = ele.validFrom;
    this.departModel.validTo = ele.validTo;
    this.departModel.SC = ele.SC;
    this.departModel.SR = ele.SR;
    this.departModel.inactive = ele.inactive;

    /* to disable buttons */
    this.saveDisabled = true;
    this.updateDisabled = false;
  }

  deleteDepart(ele:any){
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.health.deleteDepartments(ele._id).subscribe(res=>{
          console.log("deleteadmin",res)
          this.getDepartments();
          Swal.fire(
            'Deleted!',
            'Department Has Been Deleted successfully.',
            'success'
          )
        })
      }})
     
   
  }

}

