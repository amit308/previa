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
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  // selectedToDate: any = moment().format("YYYY-MM-DD");
  selectedInvoiceDate: any = { startDate: null, endDate: null };
  user: any;
  subDivisions: [];
  selectedOrganization: any;
  pageEvent: PageEvent;
  isDefault = true;
  b2bInvoices: any = [];
  // b2bInvoicesLength = 100;
  imageBaseUrl = environment.invoiceImageUrl;
  selectedInvoice: any;
  noRecordsFlag = false;
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
  paymentLinkType = 'email';

  selectedPayment = 'Cash';
  paymentTypes = ['Cash', 'Cheque', 'PaymentLink'];
  constructor(
    private adminservice: AdminService,
    private spinner: NgxSpinnerService,
    private healthService: HealthService,
    private dialog: MatDialog
  ) {
    this.user = JSON.parse(localStorage.getItem('user_details'));
    this.getSubDivisions('hospital');
    this.selectedInvoiceDate.startDate = moment()
      .subtract(1, 'days')
      .startOf('day');
    this.selectedInvoiceDate.endDate = moment()
      .subtract(0, 'days')
      .startOf('day');
  }

  ngOnInit(): void {
    // this.getB2bInvoices()
  }
  onPageEvent(event) {
    this.pageEvent = event;
    this.isDefault = false;
    this.getB2bInvoices();
  }
  clearDate() {
    this.selectedInvoiceDate = null;
  }
  // clearFromDate() {
  //   this.selectedInvoiceDate = null;
  // }

  getSubDivisions(value) {
    const role = value;
    const formData: any = {};
    (formData.companyId = this.user.company), (formData.category = role);
    this.getLaboratoryDetails(formData);
  }

  getLaboratoryDetails(formData) {
    this.adminservice.getSubdivision(formData).subscribe((res) => {
      this.subDivisions = res.data.subDivisions;
    });
  }

  changeOrganization() {
    console.log('test', this.selectedOrganization);
  }

  submit() {
    this.getB2bInvoices();
  }
  getB2bInvoices() {
    const formData: any = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );

    if (
      this.selectedInvoiceDate.startDate &&
      this.selectedInvoiceDate.endDate
    ) {
      formData.fromDate = moment(this.selectedInvoiceDate.startDate).format(
        'YYYY-MM-DD'
      );
      formData.toDate = moment(this.selectedInvoiceDate.endDate).format(
        'YYYY-MM-DD'
      );
    }
    if (this.selectedOrganization) {
      formData.organization = this.selectedOrganization;
    }
    this.adminservice
      .getB2BInvoices(formData)
      .subscribe((transactionsRes: any) => {
        this.b2bInvoices = transactionsRes?.data?.transactions || [];
        this.length = transactionsRes?.data?.total_count;
        this.noRecordsFlag = true;
      });
  }

  downloadInvoice(transInfo) {
    this.spinner.show();
    this.healthService
      .downloadInvoice({
        invoiceId: transInfo?.invoiceId,
        isSendToMail: false,
        b2b: 'true',
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          FileSaver.saveAs(
            `${this.imageBaseUrl}${res.data.path}`,
            `${res.data.path}`
          );
          Swal.fire('Invoice downloaded successFully');
        },
        (err) => {
          this.spinner.hide();

          Swal.fire('Failed to download');
        }
      );
  }

  openInvoiceModel(dialogContent, transInfo) {
    this.selectedInvoice = transInfo;
    this.selectedInvoice.paymentInfo = {};
    const dialogRef = this.dialog.open(dialogContent, {
      width: '40%',
      data: {},
    });
  }
  sendInvoice() {
    this.spinner.show();

    const transInfo = this.selectedInvoice;
    this.healthService
      .downloadInvoice({
        invoiceId: transInfo?.invoiceId,
        isSendToMail: true,
        emailAddress: transInfo.organization?.emailAddress,
        type: this.paymentLinkType,
        customerPhone: transInfo.organization.mobileNumber,
        customerName: transInfo.organization.name,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          Swal.fire('Sent successFully!');
          this.dialog.closeAll();
        },
        (err) => {
          this.dialog.closeAll();

          this.spinner.hide();
          Swal.fire('Failed to send');
        }
      );
  }

  addBillingData() {
    const data = {
      billAmount: Number(this.selectedInvoice.billAmount),
      totalAmount: Number(this.selectedInvoice.totalAmount),
      orderAmount: Number(this.selectedInvoice.orderAmount),
      dueAmount: Number(this.selectedInvoice.dueAmount),
      discountAmount: Number(this.selectedInvoice.discountAmount),
      otherCharges: Number(this.selectedInvoice.otherCharges),
      comments: this.selectedInvoice.comments,
      transactionType: this.selectedPayment,
      paymentInfo: {
        paymentType: this.selectedPayment,
        chequeNo: this.selectedInvoice.paymentInfo.chequeNo,
        chequeDate: this.selectedInvoice.paymentInfo.chequeDate,
        comments: this.selectedInvoice.comments,
      },
      invoiceId: this.selectedInvoice.invoiceId,
    };
    console.log(data);
    this.adminservice.addBilling(data).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          Swal.fire({
            title: `${res.message}`,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.selectedInvoice = {};
          this.dialog.closeAll();
          this.getB2bInvoices();
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
