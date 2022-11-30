import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HealthService } from 'src/app/service/health.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent implements OnInit {
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  invoiveCreatedDate: any = { staertDate: null, endDate: null };
  user: any;
  subDivisions: [];
  selectedOrganization: any;
  pageEvent: PageEvent;
  isDefault = true;
  b2bInvoices: any = [];
  b2bInvoicesLength = 100;
  imageBaseUrl = environment.invoiceImageUrl;
  selectedInvoice: any;
  tests: any = [];
  totalAmount = 0;
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
  };
  constructor(
    private adminservice: AdminService,
    private spinner: NgxSpinnerService,
    private healthService: HealthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user_details'));
    this.getSubDivisions('hospital');
    this.invoiveCreatedDate.startDate = moment()
      .subtract(1, 'days')
      .startOf('day');
    this.invoiveCreatedDate.endDate = moment()
      .subtract(0, 'days')
      .startOf('day');
  }

  ngOnInit(): void {}

  getSubDivisions(value) {
    const role = value;
    const formData: any = {};
    formData.companyId = this.user.company;
    formData.category = role;
    this.getLaboratoryDetails(formData);
  }
  clearDate() {
    this.invoiveCreatedDate = null;
  }

  getLaboratoryDetails(formData) {
    this.adminservice.getSubdivision(formData).subscribe((res) => {
      this.subDivisions = res.data.subDivisions;
    });
  }

  submit() {
    this.totalAmount = 0;
    this.adminservice
      .getB2BInvoiceInfo({
        fromDate: moment(this.invoiveCreatedDate.startDate).format(
          'YYYY-MM-DD'
        ),
        toDate: moment(this.invoiveCreatedDate.endDate).format('YYYY-MM-DD'),
        organization: this.selectedOrganization,
      })
      .subscribe(
        (res) => {
          const tests = res.data.patientTests;
          this.tests = [];
          tests.forEach((test) => {
            const obj = {
              testId: test?.testMasterObj?._id,
              test: test?.testMasterObj?.name,
              quantity: 1,
              price: test?.testInfo?.price,
            };
            this.totalAmount += obj.price;
            const checkTest = this.tests.findIndex(
              (item) => item.testId === test?.testMasterObj?._id
            );
            if (checkTest !== -1) {
              this.tests[checkTest].quantity += 1;
              this.tests[checkTest].price += obj.price;
            } else {
              this.tests.push(obj);
            }
          });
        },
        (err) => {
          Swal.fire('Failed to Create');
        }
      );
  }

  createInvoice() {
    this.spinner.show();
    this.adminservice
      .createB2bInvoice({
        fromDate: moment(this.invoiveCreatedDate.startDate).format(
          'YYYY-MM-DD'
        ),
        toDate: moment(this.invoiveCreatedDate.endDate).format('YYYY-MM-DD'),
        organization: this.selectedOrganization,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          Swal.fire('Invoice Created SuccessFully');
          this.router.navigateByUrl('b2-b/invoices');
        },
        (err) => {
          this.spinner.hide();
          Swal.fire('Invoice Create failed');
        }
      );
  }
  backToList() {
    this.router.navigateByUrl('b2-b/invoices');
  }
}
