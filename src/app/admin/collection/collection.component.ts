import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  table: any = 'collection';


  pendingTests: any;
  collectedTests: any;
  receivedTests: any;
  riderCollectedTests = []
  checkedPendingIds = [];

  //pagination and api integration starts from here
  pendinglength = 100;
  collectedlength = 100;
  receivedlength = 100;
  riderCollectedlength = 100;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  pendingpageEvent: PageEvent;
  collectedpageEvent: PageEvent;
  riderCollectedpageEvent: PageEvent;
  receivedpageEvent: PageEvent;
  pendingisDefault: boolean = true;
  collectedisDefault: boolean = true;
  riderCollectedisDefault: boolean = true;
  receivedisDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  status: any;
  statusflag: boolean;
  //pagination code ends here

  AwaitingSampleDefault: boolean = true
  AwaitingSamplePageEvent: PageEvent;
  AssignedToTechnicianDefault: boolean = true
  AssignedToTechnicianPageEvent: PageEvent
  CollectedByTechnicianDefault: boolean = true
  CollectedByTechnicianPageEvent: PageEvent
  SampleAssignedToRiderDefault: boolean = true
  SampleAssignedToRiderPageEvent: PageEvent
  CollectedByRiderDefault: boolean = true
  CollectedByRiderPageEvent: PageEvent
  DeliveredByRiderDefault: boolean = true
  DeliveredByRiderPageEvent: PageEvent
  AwaitingForSampleRecviceDefault: boolean = true
  AwaitingForSampleRecvicePageEvent: PageEvent
  SampleRecivedDefault: boolean = true
  SampleRecivedPageEvent: PageEvent

  AwaitingSampleTests: any;
  AwaitingSamplelength = 100;
  AssignedToTechnicianTests: any;
  AssignedToTechnicianlength = 100;
  CollectedByTechnicianTests: any;
  CollectedByTechnicianlength = 100;
  SampleAssignedToRiderTests: any;
  SampleAssignedToRiderlength = 100;
  CollectedByRiderTests: any;
  CollectedByRiderlength = 100;
  DeliveredByRiderTests: any;
  DeliveredByRiderlength = 100;
  AwaitingForSampleRecviceTests: any;
  AwaitingForSampleRecvicelength = 100;
  SampleRecivedTests: any;
  SampleRecivedlength = 100;

  testsMoveStep: string = ''
  constructor(
    private healthService: HealthService,
    private spinner : NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.getCollections('AwaitingSample');
    this.getCollections('AssignedToTechnician');
    this.getCollections('CollectedByTechnician');
    this.getCollections('SampleAssignedToRider');
    this.getCollections('CollectedByRider');
    this.getCollections('DeliveredByRider');
    this.getCollections('AwaitingForSampleReceive');
    this.getCollections('SampleReceived');


  }

  tableType(type: String) {
    this.table = type;
  }



  //Api Integration Starts from here
  
  onPageEventAwaitingSample(event, status) {
    this.AwaitingSampleDefault = false;
    this.AwaitingSamplePageEvent = event;
    this.getCollections(status)
  }
  onPageEventAssignedToTechnician(event, status) {
    this.AssignedToTechnicianDefault = false;
    this.AssignedToTechnicianPageEvent = event;
    this.getCollections(status)
  }
  onPageEventCollectedByTechnician(event, status) {
    this.CollectedByTechnicianDefault = false;
    this.CollectedByTechnicianPageEvent = event;
    this.getCollections(status)

  }
  onPageEventSampleAssignedToRider(event, status) {
    this.SampleAssignedToRiderDefault = false;
    this.SampleAssignedToRiderPageEvent = event;
    this.getCollections(status)
  }
  onPageEventCollectedByRider(event, status) {
    this.CollectedByRiderDefault = false;
    this.CollectedByRiderPageEvent = event;
    this.getCollections(status)
  }
  onPageEventDeliveredByRider(event, status) {
    this.DeliveredByRiderDefault = false;
    this.DeliveredByRiderPageEvent = event;
    this.getCollections(status)
  }
  onPageEventAwaitingForSampleRecived(event, status) {
    this.AwaitingForSampleRecviceDefault = false;
    this.AwaitingForSampleRecvicePageEvent = event;
    this.getCollections(status)
  }
  onPageEventSampleRecived(event, status) {
    this.SampleRecivedDefault = false;
    this.SampleRecivedPageEvent = event;
    this.getCollections(status)
  }



  getCollections(status) {
    if (status === 'AwaitingSample') {
      var formData = PaginationUtility.getGridFilters(this.AwaitingSampleDefault, this.AwaitingSamplePageEvent)
    } else if (status === 'AssignedToTechnician') {
      var formData = PaginationUtility.getGridFilters(this.AssignedToTechnicianDefault, this.AssignedToTechnicianPageEvent)
    } else if (status === 'CollectedByTechnician') {
      var formData = PaginationUtility.getGridFilters(this.CollectedByTechnicianDefault, this.CollectedByTechnicianPageEvent)
    }
    else if (status === 'SampleAssignedToRider') {
      var formData = PaginationUtility.getGridFilters(this.SampleAssignedToRiderDefault, this.SampleAssignedToRiderPageEvent)
    }
    else if (status === 'CollectedByRider') {
      var formData = PaginationUtility.getGridFilters(this.CollectedByRiderDefault, this.CollectedByRiderPageEvent)
    }
    else if (status === 'DeliveredByRider') {
      var formData = PaginationUtility.getGridFilters(this.DeliveredByRiderDefault, this.DeliveredByRiderPageEvent)
    }
    else if (status === 'AwaitingForSampleReceive') {
      var formData = PaginationUtility.getGridFilters(this.AwaitingForSampleRecviceDefault, this.AwaitingForSampleRecvicePageEvent)
    }
    else if (status === 'SampleReceived') {
      var formData = PaginationUtility.getGridFilters(this.SampleRecivedDefault, this.SampleRecivedPageEvent)
    }

    formData['status'] = status
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getCollectionsDetails(formData)

  }

  getCollectionsDetails(formData) {

    this.healthService.getCollections(formData).subscribe((res) => {
      if (res.statusCode == 200) {
        if (formData.status == 'AwaitingSample') {
          this.AwaitingSampleTests = res.data.patientTests;
          this.AwaitingSamplelength = res.data.total_count
        } else if (formData.status == 'AssignedToTechnician') {
          this.AssignedToTechnicianTests = res.data.patientTests;
          this.AssignedToTechnicianlength = res.data.total_count
        } else if (formData.status == 'CollectedByTechnician') {
          this.CollectedByTechnicianTests = res.data.patientTests;
          this.CollectedByTechnicianlength = res.data.total_count
        }
        else if (formData.status == 'SampleAssignedToRider') {
          this.SampleAssignedToRiderTests = res.data.patientTests;
          this.SampleAssignedToRiderlength = res.data.total_count
        }
        else if (formData.status == 'CollectedByRider') {
          this.CollectedByRiderTests = res.data.patientTests;
          this.CollectedByRiderlength = res.data.total_count
        }
        else if (formData.status == 'DeliveredByRider') {
          this.DeliveredByRiderTests = res.data.patientTests;
          this.DeliveredByRiderlength = res.data.total_count
        }
        else if (formData.status == 'AwaitingForSampleReceive') {
          this.AwaitingForSampleRecviceTests = res.data.patientTests;
          this.AwaitingForSampleRecvicelength = res.data.total_count
        }
        else if (formData.status == 'SampleReceived') {
          this.SampleRecivedTests = res.data.patientTests;
          this.SampleRecivedlength = res.data.total_count
        }
      }

    })
  }
  public sortEvent(status, event): void {
    if (this.sortvalue === event || this.status === status) {
      this.status = status
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    } else {
      this.status = status
      this.sortDirection = 'ASC'
    }
    this.sortvalue = event
    if (status === 'AwaitingSampleTechnician') {
      var formData = PaginationUtility.getGridFilters(this.AwaitingSampleDefault, this.AwaitingSamplePageEvent)
    } else if (status === 'AssignedToTechnician') {
      var formData = PaginationUtility.getGridFilters(this.AssignedToTechnicianDefault, this.AssignedToTechnicianPageEvent)
    } else if (status === 'CollectedByTechnician') {
      var formData = PaginationUtility.getGridFilters(this.CollectedByTechnicianDefault, this.CollectedByTechnicianPageEvent)
    }
    else if (status === 'SampleAssignedToRider') {
      var formData = PaginationUtility.getGridFilters(this.SampleAssignedToRiderDefault, this.SampleAssignedToRiderPageEvent)
    }
    else if (status === 'CollectedByRider') {
      var formData = PaginationUtility.getGridFilters(this.CollectedByRiderDefault, this.CollectedByRiderPageEvent)
    }
    else if (status === 'DeliveredByRider') {
      var formData = PaginationUtility.getGridFilters(this.DeliveredByRiderDefault, this.DeliveredByRiderPageEvent)
    }
    else if (status === 'AwaitingForSampleReceive') {
      var formData = PaginationUtility.getGridFilters(this.AwaitingForSampleRecviceDefault, this.AwaitingForSampleRecvicePageEvent)
    }
    else if (status === 'SampleReceived') {
      var formData = PaginationUtility.getGridFilters(this.SampleRecivedDefault, this.SampleRecivedPageEvent)
    }
    formData["status"] = status

    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    this.getCollectionsDetails(formData)
  }

  toggle(item, e, testsMoveStep) {
    this.testsMoveStep = testsMoveStep
    let id = item._id;
    if (e.checked == true) {
      this.checkedPendingIds.push(id);
    } else if (e.checked == false) {
      this.checkedPendingIds = this.checkedPendingIds.filter((id) => {
        return id != item._id;
      })
    }
  }

  moveToAssignTechnician() {
    if (['step1', 'step2'].includes(this.testsMoveStep)) {
      let req = {
        tests: this.checkedPendingIds,
        isSamplesMove: true
      }
      this.spinner.show()
      this.healthService.moveToSampleAssignedToTechnician(req).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: `${resp.message}`
          }).then((res) => {
            if (res.isConfirmed) {
              this.getCollections('AwaitingSample');
              this.getCollections('AssignedToTechnician');
              this.getCollections('CollectedByTechnician');
              this.getCollections('SampleAssignedToRider');
              this.getCollections('CollectedByRider');
              this.getCollections('DeliveredByRider');
              this.getCollections('AwaitingForSampleReceive');
              this.getCollections('SampleReceived');
              this.checkedPendingIds = [];
            }
          })
        }
      }, (err)=>{this.spinner.hide()})
    } else {
      alert('please select samples to move')
    }


  }
  backToAwatingSampleTechnician() {
    if (['step1', 'step2'].includes(this.testsMoveStep)) {
      let req = {
        tests: this.checkedPendingIds,
        isSamplesMove: false
      }
      this.spinner.show()
      this.healthService.moveToSampleAssignedToTechnician(req).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: `${resp.message}`
          }).then((res) => {
            if (res.isConfirmed) {
              this.getCollections('AwaitingSample');
              this.getCollections('AssignedToTechnician');
              this.getCollections('CollectedByTechnician');
              this.getCollections('SampleAssignedToRider');
              this.getCollections('CollectedByRider');
              this.getCollections('DeliveredByRider');
              this.getCollections('AwaitingForSampleReceive');
              this.getCollections('SampleReceived');
              this.checkedPendingIds = [];
            }
          })
        }
      }, (err)=>{this.spinner.hide()})
    } else {
      alert('please select samples to move')

    }
  }

  moveToCollectedTechnician() {
    if (['step3', 'step4'].includes(this.testsMoveStep)) {
      let req = {
        tests: this.checkedPendingIds,
        isSamplesMove: true
      }
      this.spinner.show()
      this.healthService.moveToSampleCollectedTechnician(req).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: `${resp.message}`
          }).then((res) => {
            if (res.isConfirmed) {
              this.getCollections('AwaitingSample');
              this.getCollections('AssignedToTechnician');
              this.getCollections('CollectedByTechnician');
              this.getCollections('SampleAssignedToRider');
              this.getCollections('CollectedByRider');
              this.getCollections('DeliveredByRider');
              this.getCollections('AwaitingForSampleReceive');
              this.getCollections('SampleReceived');
              this.checkedPendingIds = [];
            }
          })
        }
      },(err)=>{this.spinner.hide()})
    } else {
      alert('please select samples to move')
    }
  }
  backeToAssignedTechnician() {
    if (['step3', 'step4'].includes(this.testsMoveStep)) {
      let req = {
        tests: this.checkedPendingIds,
        isSamplesMove: false
      }
      this.spinner.show()
      this.healthService.moveToSampleCollectedTechnician(req).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: `${resp.message}`
          }).then((res) => {
            if (res.isConfirmed) {
              this.getCollections('AwaitingSample');
              this.getCollections('AssignedToTechnician');
              this.getCollections('CollectedByTechnician');
              this.getCollections('SampleAssignedToRider');
              this.getCollections('CollectedByRider');
              this.getCollections('DeliveredByRider');
              this.getCollections('AwaitingForSampleReceive');
              this.getCollections('SampleReceived');
              this.checkedPendingIds = [];
            }
          })
        }
      },(err)=>{this.spinner.hide()})
    } else {
      alert('please select samples to move')
    }
  }

  moveToSampleRecived() {
    if (['step5', 'step6'].includes(this.testsMoveStep)) {
      let req = {
        tests: this.checkedPendingIds,
        isSamplesMove: true
      }
      this.spinner.show()
      this.healthService.moveToSamplesReceived(req).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: `${resp.message}`
          }).then((res) => {
            if (res.isConfirmed) {
              this.getCollections('AwaitingSample');
              this.getCollections('AssignedToTechnician');
              this.getCollections('CollectedByTechnician');
              this.getCollections('SampleAssignedToRider');
              this.getCollections('CollectedByRider');
              this.getCollections('DeliveredByRider');
              this.getCollections('AwaitingForSampleReceive');
              this.getCollections('SampleReceived');
              this.checkedPendingIds = [];
            }
          })
        }
      },(err)=>{this.spinner.hide()})
    } else {
      alert('please select samples to move')
    }
  }
  backToAwatingSampleRecive() {
    if (['step5', 'step6'].includes(this.testsMoveStep)) {
      let req = {
        tests: this.checkedPendingIds,
        isSamplesMove: false
      }
      this.spinner.show()
      this.healthService.moveToSamplesReceived(req).subscribe((resp) => {
        this.spinner.hide()
        if (resp.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: `${resp.message}`
          }).then((res) => {
            if (res.isConfirmed) {
              this.getCollections('AwaitingSample');
              this.getCollections('AssignedToTechnician');
              this.getCollections('CollectedByTechnician');
              this.getCollections('SampleAssignedToRider');
              this.getCollections('CollectedByRider');
              this.getCollections('DeliveredByRider');
              this.getCollections('AwaitingForSampleReceive');
              this.getCollections('SampleReceived');
              this.checkedPendingIds = [];
            }
          })
        }
      },(err)=>{this.spinner.hide()})
    } else {
      alert('please select samples to move')
    }
  }

  public pendingToCollected(): void {
    let req = {
      tests: this.checkedPendingIds
    }
    this.healthService.moveToSamplesCollectd(req).subscribe((resp) => {
      if (resp.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: `${resp.message}`
        }).then((res) => {
          if (res.isConfirmed) {
            this.getCollections('pending');
            this.getCollections('collected');
            this.getCollections('received');
            this.getCollections('rider_collected');
            this.checkedPendingIds = [];
          }
        })
      }
    })
  }

  // public collectedToRiderCollected(): void {
  //   let req = {
  //     tests: this.checkedPendingIds
  //   }
  //   this.healthService.moveToSamplesCollectd(req).subscribe((resp) => {
  //     console.log("pendingToCollected resp", resp);
  //     if (resp.statusCode == 200) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: `${resp.message}`
  //       }).then((res) => {
  //         if (res.isConfirmed) {
  //           this.getCollections('pending');
  //           this.getCollections('collected');
  //           this.getCollections('received');
  //           this.checkedPendingIds = [];
  //         }
  //       })
  //     }
  //   })
  // }
  // public pendingToRiderCollected(): void {
  //   let req = {
  //     tests: this.checkedPendingIds
  //   }
  //   this.healthService.moveToSamplesCollectd(req).subscribe((resp) => {
  //     console.log("pendingToCollected resp", resp);
  //     if (resp.statusCode == 200) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: `${resp.message}`
  //       }).then((res) => {
  //         if (res.isConfirmed) {
  //           this.getCollections('pending');
  //           this.getCollections('collected');
  //           this.getCollections('received');
  //           this.getCollections('rider_collected');
  //           this.checkedPendingIds = [];
  //         }
  //       })
  //     }
  //   })
  // }
  // public riderCollectedToReceived(): void {
  //   let req = {
  //     tests: this.checkedPendingIds
  //   }
  //   this.healthService.moveToSamplesReceived(req).subscribe((resp) => {
  //     console.log("pendingToCollected resp", resp);
  //     if (resp.statusCode == 200) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: `${resp.message}`
  //       }).then((res) => {
  //         if (res.isConfirmed) {
  //           this.getCollections('received');
  //           this.getCollections('collected');
  //           this.getCollections('pending');
  //           this.getCollections('rider_collected');
  //           this.checkedPendingIds = [];
  //         }
  //       })
  //     }
  //   })
  // }

  // public collectedToReceived(): void {
  //   let req = {
  //     tests: this.checkedPendingIds
  //   }
  //   this.healthService.moveToSamplesReceived(req).subscribe((resp) => {
  //     console.log("pendingToCollected resp", resp);
  //     if (resp.statusCode == 200) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: `${resp.message}`
  //       }).then((res) => {
  //         if (res.isConfirmed) {
  //           this.getCollections('received');
  //           this.getCollections('collected');
  //           this.getCollections('pending');
  //           this.checkedPendingIds = [];
  //         }
  //       })
  //     }
  //   })
  // }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
];