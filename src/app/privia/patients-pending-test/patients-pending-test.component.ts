import { MapsAPILoader } from '@agm/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-patients-pending-test',
  templateUrl: './patients-pending-test.component.html',
  styleUrls: ['./patients-pending-test.component.scss'],
})
export class PatientsPendingTestComponent implements OnInit {
  icon =
    'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00c9d1';

  technicianListData: any;
  length = 100;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault = true;
  sortDirection: string;
  sortvalue: any;

  addressIndex: any;
  addressTypeFlag = false;
  zoom: number;
  address: string;
  private geoCoder;
  latitude: number;
  longitude: number;
  deliverylat: any;
  deliverylang: any;
  deliveryAddress: any;
  currentAddressObj: any;
  selectedPatients = [];
  pendingPatients = [];
  @ViewChild('search')
  public searchElementRef: ElementRef;
  patientForm: FormGroup;
  patientsArray: FormArray;
  patientTestsArray: FormArray;
  startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  selectedAssignTests = [];

  technicianInfo: any;
  technicians = [];
  patients = [];
  arrayData = [];
  dataa = [];
  disabled: Boolean = true;
  unique: any;

  constructor(
    private service: AdminService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private healthservice: HealthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTech();
    this.mapLoading();
    this.loadPatientForm();
    this.getPatientTests();
  }

  getTechnician(formData) {
    this.service.technicianList(formData).subscribe((resp) => {
      if (resp.statusCode === 200) {
        this.technicianListData = resp.data.users.filter(
          (user) => user.isOnline === true
        );
        this.length = resp.data.total_count;
      }
    });
  }

  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getTech();
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

  CurrentAddress() {
    this.mapLoading();
    this.addressIndex = null;
    this.addressTypeFlag = false;
  }
  // Map Marker DragEnd
  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.addressIndex = null;
    this.addressTypeFlag = false;
    this.deliverylang = this.longitude;
    this.deliverylat = this.latitude;
    this.getAddress(this.latitude, this.longitude);
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.zoom = 12;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.deliverylat = this.latitude;
        this.deliverylang = this.longitude;
        this.getAddress(this.latitude, this.longitude);
        this.getCurrentAddress(this.latitude, this.longitude);
      });
    }
  }

  getCurrentAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            // this.zoom = 12;
            const address = results[0].formatted_address;

            this.currentAddressObj = {
              order_address: address,
              order_latitude: latitude,
              order_longitude: longitude,
            };

            localStorage.setItem(
              'currentAddressObj',
              JSON.stringify(this.currentAddressObj)
            );
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  // Map Loading
  mapLoading() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.addressIndex = null;
          this.addressTypeFlag = false;
          this.deliverylang = this.longitude;
          this.deliverylat = this.latitude;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
  }

  //  Get Address from Map
  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
            this.deliveryAddress = this.address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  getPatientTests() {
    const obj = {
      status: 'AwaitingSample',
      sampleDate: this.startDate,
    };
    this.healthservice.getCollections(obj).subscribe((data) => {
      console.log("=====pendingdata", data);
      
      this.pendingPatients = data?.data?.patientTests || [];

      const temp = [];
      this.pendingPatients.forEach((test) => {
        const filterPatient = temp.filter((tempTest) => {
          return tempTest?.patientId === test?.patientId;
        });
        if (filterPatient.length === 0) {
          const obj = {
            patient: test?.patient,
            patientId: test?.patientId,
            tests: [test],
          };
          temp.push(obj);
        }
        if (filterPatient.length > 0) {
          temp.forEach((tempTest, index) => {
            if (tempTest?.patientId === test?.patientId) {
              temp[index].tests.push(test);
            }
          });
        }
      });
      this.pendingPatients = temp;

      this.patientsArray = this.patientForm.get('patientsArray') as FormArray;

      for (const pendingPatient of this.pendingPatients) {
        const temptests = [];

        pendingPatient.isCheck = false;
        for (const patientTest of pendingPatient.tests) {
          patientTest.isCheck = true;
          patientTest.instructions = patientTest?.instructions;
          temptests.push(this.fb.group(patientTest));
        }
        this.patientsArray.push(
          this.fb.group({
            _id: [pendingPatient?.patient?._id],
            name: [pendingPatient?.patient?.name],
            pid: [pendingPatient?.patient?.pid],
            address: [pendingPatient?.patient?.address],
            isCheck: [pendingPatient.isCheck],
            patientTestsArray: this.fb.array(temptests),
          })
        );
      }
    });
  }

  selectPatientInMap(patientInfo) {
    this.patientsArray = this.patientForm.get('patientsArray') as FormArray;
    const filterPatient = this.patientsArray.value.filter((patient) => {
      return patient?._id === patientInfo?.patientId;
    })?.[0];

    if (!filterPatient) {
      const temptests = [];
      patientInfo.tests.forEach((fp) => {
        fp.isCheck = true;
        temptests.push(this.fb.group(fp));
      });

      this.patientsArray.push(
        this.fb.group({
          _id: [patientInfo?.patient?._id],
          name: [patientInfo?.patient?.name],
          pid: [patientInfo?.patient?.pid],
          address: [patientInfo?.patient?.address],
          patientTestsArray: this.fb.array(temptests),
        })
      );
    }
  }

  changeSampleDate() {
    this.loadPatientForm();
    this.getPatientTests();
  }

  loadPatientForm() {
    this.patientForm = this.fb.group({
      patientsArray: this.fb.array([]),
    });
  }

  patientsForm(): FormArray {
    return this.patientForm.get('patientsArray') as FormArray;
  }

  patientTests(pi): FormArray {
    return this.patientsForm().at(pi).get('patientTestsArray') as FormArray;
  }

  checkTests() {}

  SelectTechnician(content) {
    let count = 0;
    const patientsArray = this.patientForm.value.patientsArray;
    patientsArray.forEach((patient) => {
      if (patient.isCheck) {
        count = count + 1;
      }
    });
    if (count === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Please Select Patients',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: true,
      });
      return;
    }
    const dialogRef = this.dialog.open(content, {
      width: '40%',
      data: {},
    });
  }

  submitAssign() {
    const patients = [];
    const patientsArray = this.patientForm.value.patientsArray;

    patientsArray.forEach((patient) => {
      if (patient.isCheck) {
        const tests = [];
        const packageTests = [];
        patient.patientTestsArray.forEach((pt) => {
          if (!pt.isPackage) {
            tests.push({
              test: pt?._id,
              value: '',
              comment: '',
              instructions: pt?.instructions,
              sid: pt?.sid || '',
            });
          }
          if (pt.isPackage) {
            const pTests = [];
            pt?.tests.forEach((ptest) => {
              const testObj = {
                test: ptest?._id,
                value: '',
                comment: '',
                instructions: pt?.instructions,
                sid: ptest?.sid || '',
              };
              pTests.push(testObj);
            });
            const obj = {
              package: pt?._id,
              tests: pTests,
            };
            packageTests.push(obj);
          }
        });
        const obj = {
          patient: patient?._id,
          location: patient?.address,
          date: moment(new Date(this.startDate)).format('MM/DD/YYYY h:mm a'),
          tests,
          packages: packageTests,
        };
        patients.push(obj);
      }
    });
    const obj = {
      techincin: this.technicianInfo,
      patients,
    };
    this.healthservice.technicianAssign(obj).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: `${res.message}`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: true,
      }).then((result) => {
        this.technicianInfo = null;
        this.dialog.closeAll();
        this.patients = [];
        this.getTech();
        this.mapLoading();
        this.loadPatientForm();
        this.getPatientTests();
      });
    });
  }

  select_Technician(event) {
    this.technicianInfo = event.target.value;
    console.log(event.target.value);
    this.disabled = false;
  }

  removeTest(index) {
    this.patientsArray = this.patientForm.get('patientsArray') as FormArray;
    this.patientsArray.removeAt(index);
  }
}
