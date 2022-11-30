import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCarousel } from '@ngmodule/material-carousel';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import * as moment from 'moment';
@Component({
  selector: 'app-rider-samples',
  templateUrl: './rider-samples.component.html',
  styleUrls: ['./rider-samples.component.scss'],
})
export class RiderSamplesComponent implements OnInit {
  slides = [];
  imageBaseUrl = environment.imageBaseUrl1;
  riderSamples: any = [];
  sampleView: any;
  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  userDetailss: any;
  //pagination code ends here
  selectedDate: any = moment().format('YYYY-MM-DD');
  searchRider: any;
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getSamples();
  }

  viewSamples(content, data) {
    this.slides = [];
    data.samplesFiles.forEach((file) => {
      const imageUrl = this.imageBaseUrl + encodeURIComponent(file);
      this.slides.push({ image: imageUrl });
    });
    this.dialog.open(content, {
      width: '40%',

      data: {},
    });
  }
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getSamples();
  }
  getSamples() {
    let formData = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );
    if (this.sortvalue) {
      formData['sortBy'] = this.sortvalue;
      formData['sortOrder'] = this.sortDirection;
    }
    if (this.searchRider) {
      formData['search'] = this.searchRider;
    }
    if (this.selectedDate) {
      formData['slotDate'] = this.selectedDate;
    }
    this.getRiderSlots(formData);
  }
  getRiderSlots(formData) {
    this.adminService.getRiderSamples(formData).subscribe((res) => {
      this.riderSamples = res.data?.riderSelfSlots;
      this.length = res.data.total_count;
    });
  }
  selectDate() {
    this.getSamples();
  }
  clearData() {
    this.selectedDate = null;
    this.getSamples();
  }
  searchRiders() {
    if (this.searchRider.length > 2) {
      this.getSamples();
    }
    if (!this.searchRider) {
      this.getSamples();
    }
  }
}
