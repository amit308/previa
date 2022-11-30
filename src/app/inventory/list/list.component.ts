import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/service/admin.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  [x: string]: any;
  selectedDate:any={startDate:null,endDate:null}
  searchValue: any;
  searchInventory: any;
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  inventoryDetails: any;
  action: string;
  selectedInventory: any;
  userToken: any;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  constructor(private router: Router, private adminservice: AdminService,
     private spinner: NgxSpinnerService) {
     this. selectedDate.startDate = moment().subtract(1, 'days').startOf('day');
     this. selectedDate.endDate = moment().subtract(0, 'days').startOf('day');
  }

  ngOnInit(): void {
    this.getinventoryList()
    const token = localStorage.getItem('user_token')
    this.userToken = jwt_decode(token)
  }
  changeInventory() {
    // let value = (<HTMLInputElement>event.target).value;
    if (this.searchInventory.length > 2) {

      this.getinventoryList();
    }
    if (!this.searchInventory) {
      this.getinventoryList();
    }
  }

  changeInventoryDate() {
    if (this.selectedDate) {

      this.getinventoryList()
    }
  }
  clearDate() {
    this.selectedDate = null;
    this.getinventoryList()
  }
  updateInventory(inventory) {
    this.action = "update"
    this.selectedInventory = inventory;
    this.addUpdateInventory()
  }
  addinventory() {
    this.action = "add";
    this.addUpdateInventory()
  }
  addUpdateInventory() {
    const data = {
      action: this.action,
      data: this.selectedInventory
    }
    localStorage.setItem("Inventory", JSON.stringify(data))
    this.router.navigateByUrl('/inventory/add');
  }
  deleteInventory(item) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminservice.deleteInventory(item._id).subscribe((res) => {
          this.spinner.hide();
          this.getinventoryList()
          Swal.fire(
            'Deleted!',
            'Inventory Has Been Deleted Successfully.',
            'success'
          )
        })
      }
    })

  }

  onPageEvent(event) {
    this.spinner.show();
    this.isDefault = false;
    this.pageEvent = event;
    this.getinventoryList()
    console.log("page", this.pageEvent?.pageIndex, this.pageEvent?.pageSize)
  }

  getinventoryList() {
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    if(this.selectedDate.startDate){
      formData['startDate'] = moment(this.selectedDate.startDate).format("YYYY-MM-DD");
      }
      if(this.selectedDate.endDate){
        formData['endDate'] = moment(this.selectedDate.endDate).format("YYYY-MM-DD");
        }

    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection

    }
    if (this.searchInventory) {
      formData["search"] = this.searchInventory;
    }
    this.getInventoryDetails(formData)
  }

  getInventoryDetails(formData) {
    this.spinner.show();
    this.adminservice.getInventory(formData).subscribe((res) => {
      this.spinner.hide();
      console.log("inventory", res.data.inventory)
      this.inventoryDetails = res.data.inventory
      this.length = res.data.total_count
    })
  }
  checkPageAccess(value: any): any {
    return this.userToken?.authorities ? this.userToken.authorities.includes(value)  ? true :false: false
 }

}
