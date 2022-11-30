import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-master-list',
  templateUrl: './test-master-list.component.html',
  styleUrls: ['./test-master-list.component.scss']
})
export class TestMasterListComponent implements OnInit {
  testMasterList: any;
  public searchText: string;
  public searchText1:string
    //pagination and api integration starts from here
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 50, 100];
    pageEvent: PageEvent;
    isDefault: boolean = true;
    sortDirection: string;
    sortvalue: any;
    //pagination code ends here

  constructor(private healthService: HealthService, private router: Router) { }

  ngOnInit(): void {
    this.getTestMasterList();
  }


  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getTestMasterList()
  }

  getTestMasterList(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getTestMasterListDetails(formData)
  
  }

  getTestMasterListDetails(formData){
    this.healthService.getTestMasterList(formData).subscribe((res) => {
          if( res.statusCode == 200 ) {
            this.testMasterList = res.data.tests;
            this.length = res.data.total_count
          }
     })
  }
  public  sortEvent(event): void{
   
    if(this.sortvalue === event){
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    }else{
      this.sortDirection = 'ASC'
    }
    this.sortvalue = event
     
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    this.getTestMasterListDetails(formData)
  }

  public editTest(testItem,val): void {
    localStorage.setItem('TestItem',JSON.stringify(testItem));
    localStorage.setItem('testVal',val);
    this.router.navigateByUrl('admin/testMaster');
  }
  createTest(){
    this.router.navigateByUrl('admin/testMaster');
  }

  public deleteTest(testItem,testType): void {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure want to delete',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((res) => {
      if(res.isConfirmed) {
        this.healthService.deleteTestsById(testItem._id).subscribe(res=>{
          if(res.statusCode === 200){
            Swal.fire({
              icon: 'success',
              title: `${res.message}`
            }).then((res) => {
              if( res.isConfirmed ) {
                this.getTestMasterList();
              }
            })
          }
        })
        
      }
    })
  }

}
