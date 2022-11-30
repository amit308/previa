import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { HealthService } from 'src/app/service/health.service';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.scss'],
})
export class TechnicianListComponent implements OnInit {
  technicianListData: any;
  action: string;
  userrole: string;
  selectedTechnician: any;
  technicianSlots: any;
  vaccineSlots: any;
  vaccineInfo: any;
  technicianInfo: any;
  // pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault = true;
  sortDirection: string;
  sortvalue: any;
  // Jquery<bootstrapToggle>(): any;
  // pagination code ends here
  panelOpenState = false;
  mySelect = 'AssignedToTechnician';
  status = 'AssignedToTechnician';
  selectedDate:any;
  public statuss = [
    {
      viewName: 'CollectedByTechnician',
      status: 'CollectedByTechnician',
    },
    {
      viewName: 'AssignedToTechnician',
      status: 'AssignedToTechnician',
    },
    {
      viewName: 'All',
      status: '',
    },
  ];

  constructor(
    private router: Router,
    private service: AdminService,
    private healthService: HealthService,
    public dialog: MatDialog,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getTech();
  }
  clearDate(){
    this.selectedDate=null
  }
  public editTechnician(Technician): void {
    this.selectedTechnician = Technician;
    this.action = 'update';
    this.userrole = 'dd-technician';
    this.addUpdateTechnician();
  }

  public addTechnician(): void {
    this.action = 'add';
    this.userrole = 'dd-technician';
    this.addUpdateTechnician();
  }
  /* Add technician */
  public addUpdateTechnician(): void {
    const data = {
      action: this.action,
      role: this.userrole,
      data: this.selectedTechnician,
    };

    localStorage.setItem('Technician', JSON.stringify(data));

    this.router.navigateByUrl('/admin/technician');
  }

  getTechnician(formData) {
    this.service.technicianList(formData).subscribe((resp) => {
      if (resp.statusCode === 200) {
        this.technicianListData = resp.data.users;
        this.length = resp.data.total_count;
        console.log(this.technicianListData, 'technicianListData');
      }
    });
  }

  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getTech();
    console.log('page', this.pageEvent?.pageIndex, this.pageEvent?.pageSize);
  }

  getTech() {
    const formData: any = PaginationUtility.getGridFilters(
      this.isDefault,
      this.pageEvent
    );

    formData.role = 'dd-technician';
    if (this.sortvalue) {
      formData.sortBy = this.sortvalue;
      formData.sortOrder = this.sortDirection;
    }
    this.getTechnician(formData);
  }

  deleteTechnician(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteTechnician(item._id).subscribe((res) => {
          this.getTech();
          Swal.fire(
            'Deleted!',
            'Technician Has Been Deleted Successfully.',
            'success'
          );
        });
      }
    });
  }

  onToggle(event, id) {
    console.log(event.checked);
    const formData = {
      isOnlineStatusUpdate: true,
      isOnline: event.checked,
    };
    this.service.technicianUpdate(id, formData).subscribe((resp) => {
      if (resp.statusCode === 200) {
        Swal.fire('Status Updated Successfully');
        this.getTech();
      }
    });
  }

  openTests(content, technicianSlot: any) {
    this.technicianInfo = technicianSlot;

    this.getTechnicianSlots('AssignedToTechnician', technicianSlot?._id);
    const dialogRef = this.dialog.open(content, {
      width: '100%',
      data: {},
    });
  }

  // getTechnicianSlots(id) {
  //   this.healthService.getTechnicianSlots({ id: id, status: 'AssignedToTechnician' }).subscribe(res => {
  //     res ? (this.technicianSlots = res?.data?.slots) : null
  //   })
  // }

  getTechnicianSlots(selectType, id) {
    let status = '';

    if (selectType === 'CollectedByTechnician') {
      status = 'CollectedByTechnician';
    }
    if (selectType === 'AssignedToTechnician') {
      status = 'AssignedToTechnician';
    }
    if (selectType === 'All') {
      status = '';
    }

    this.healthService.getTechnicianSlots({ id, status }).subscribe((res) => {
      if (res.statusCode === 200) {
        res ? (this.technicianSlots = res?.data?.slots) : null;
      } else {
        this.technicianSlots = [];
      }
    });
  }

  selectChange(event) {
    this.page = 1;
    this.status = event.target.value;
    this.getTechnicianSlots(this.status, this.technicianInfo._id);
  }

  selectVaccineChange(event) {
    this.page = 1;
    this.status = event.target.value;
    this.loadTechnicianVaccineSlots(this.status, this.technicianInfo._id);
  }

  openVaccine(content, vaccineSlots: any) {
    this.technicianInfo = vaccineSlots;

    this.loadTechnicianVaccineSlots('AssignedToTechnician', vaccineSlots?._id);
    const dialogRef = this.dialog.open(content, {
      width: '100%',
      data: {},
    });
  }

  loadTechnicianVaccineSlots(selectType, id) {
    let status = '';

    if (selectType === 'CollectedByTechnician') {
      status = 'CollectedByTechnician';
    }
    if (selectType === 'AssignedToTechnician') {
      status = 'AssignedToTechnician';
    }
    if (selectType === 'All') {
      status = '';
    }

    this.healthService
      .technicianVaccineSlots({ id, status })
      .subscribe((res) => {
        if (res.statusCode === 200) {
          res ? (this.vaccineSlots = res?.data?.slots) : null;
        } else {
          this.vaccineSlots = [];
        }
      });
  }

  resendPassword(data) {
    Swal.fire({
      title: 'Are you sure want send password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send it!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.authService.reSendPassword({ userId: data._id }).subscribe(
          (res: any) => {
            this.spinner.hide();
            Swal.fire(res.message);
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  removeTest(test) {
    const params = {
      _id: test._id,
      tests: [],
    };
    test.tests.forEach((element) => {
      params.tests.push(element.sid);
    });

    Swal.fire({
      title: 'Are you sure want send Remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.healthService.removeTechnicianSlots(params).subscribe(
          (resp: any) => {
            this.spinner.hide();
            Swal.fire(resp.message);
            this.dialog.closeAll();
            this.getTech();
            // this.getTechnicianSlots(
            //   'AssignedToTechnician',
            //   this.technicianInfo?._id
            // );
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }
}
