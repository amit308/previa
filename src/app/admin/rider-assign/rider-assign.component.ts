import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment'

@Component({
  selector: 'app-rider-assign',
  templateUrl: './rider-assign.component.html',
  styleUrls: ['./rider-assign.component.scss']
})
export class RiderAssignComponent implements OnInit {

  icon = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00c9d1'

  // maxDate = "2021-09-08"
  minDate = moment(new Date()).format('YYYY-MM-DD');

  picUpMapIcon = '../../../assets/images/picUpIcon.png'
  dropMapIcon = '../../../assets/images/dropIcon.png'
  selected_rider: any
  riderDropDate: any
  panelOpenState = false;
  riderdata: any
  riderSlots: any
  riderAssignForm: FormGroup
  patientsTestsArray: FormArray
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  groupLatitude: number;
  groupLongitude: number;
  gropZoom: number;
  groupAddress: string
  private geoCoder;
  riderListData: any
  submitted = false;
  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  //pagination code ends here

  riderInfo: any
  collectedTests = []

  mySelect = "SampleAssignedToRider";
  status = "SampleAssignedToRider";
  @ViewChild('testsSearch', { static: false })
  public testsSearchElementRef: ElementRef;
  @ViewChild('pickUpAddressSearch', { static: false })
  public pickUpAddressSearchElementRef: ElementRef;
  @ViewChild('dropAddressSearch', { static: false })
  public dropAddressSearchElementRefe: ElementRef;
  selectedSearchAddress: any
  user: any
  labs = []
  hospitals = []
  isFirstTimeLoad = false
  testsGroupForm: FormGroup
  groups = []
  selectedGroupTest: any
  collectedPatients: any = []
  constructor(
    private service: AdminService,
    private healthService: HealthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    this.loadMap()
    this.isFirstTimeLoad = true
    this.riderDropDate = new Date();

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_details'))
    this.getPatientTests()
    this.getLabSubDivisions()
    this.loadRiderAssignForm()
    this.loadTestsGroupForm()
    this.getRider()
  }

  get l() {
    return this.testsGroupForm.controls;
  }
  
  loadMap() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.testsSearchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
      let pickUpAutocompleted = new google.maps.places.Autocomplete(this.pickUpAddressSearchElementRef.nativeElement);
      pickUpAutocompleted.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = pickUpAutocompleted.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.groupLatitude = place.geometry.location.lat();
          this.groupLongitude = place.geometry.location.lng();
          this.gropZoom = 12;
          console.log('lat', this.groupLatitude, this.longitude, this.groupAddress)
          this.getSeachAddress(this.groupLatitude, this.groupLongitude);
        });
      });
      let droAautocomplete = new google.maps.places.Autocomplete(this.dropAddressSearchElementRefe.nativeElement);
      droAautocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = droAautocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.groupLatitude = place.geometry.location.lat();
          this.groupLongitude = place.geometry.location.lng();
          this.gropZoom = 12;
          this.getSeachAddress(this.groupLatitude, this.groupLongitude);
        });
      });
    });

  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.groupLatitude = position.coords.latitude;
        this.groupLongitude = position.coords.longitude;
        this.gropZoom = 8;
        this.getAddress(this.latitude, this.longitude);
        this.getSeachAddress(this.groupLatitude, this.groupLongitude)
      });
    }
  }
  markerDragEnd($event: any, index: number, isPickUp: string) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    const obj = {
      index: index,
      isPickUp: isPickUp == 'true' ? true : false
    }
    this.selectedSearchAddress = obj
    this.getAddress(this.latitude, this.longitude);
  }

  // markerDragEnds($event: any, index: number, isPickUp: string) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   const obj = {
  //     index: index,
  //     isPickUp: isPickUp == 'true' ? true : false
  //   }
  //   this.selectedSearchAddress = obj
  //   this.getAddress(this.latitude, this.longitude);
  // }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          // const tests = this.riderAssignForm.get('patientsTestsArray') as FormArray;
          // if (this.selectedSearchAddress?.isPickUp) {
          //   this.testsGroupForm.patchValue({
          //     pickUpAddress: this.address,
          //     pickUpLatitude: this.latitude,
          //     pickUpLongitude: this.longitude
          //   })
          //   // tests.at(this.selectedSearchAddress?.index).patchValue({
          //   //   pickUpAddress: this.address,
          //   //   pickUpLatitude: this.latitude,
          //   //   pickUpLongitude: this.longitude,

          //   // })
          // }
          // if (!this.selectedSearchAddress?.isPickUp) {
          //   if (this.selectedSearchAddress != undefined && this.selectedSearchAddress != null) {
          //     this.testsGroupForm.patchValue({
          //       dropAddress: results[0].formatted_address,
          //       dropLatitude: this.latitude,
          //       dropLongitude: this.longitude,
          //       pickUpAddress: this.address,
          //       pickUpLatitude: this.latitude,
          //       pickUpLongitude: this.longitude
          //     })
          //   }
          //   // tests.at(this.selectedSearchAddress?.index).patchValue({
          //   //   dropAddress: results[0].formatted_address,
          //   //   dropLatitude: this.latitude,
          //   //   dropLongitude: this.longitude,
          //   // })
          // }
          // if (this.isFirstTimeLoad) {
          //   this.isFirstTimeLoad = false
          //   this.testsGroupForm.patchValue({
          //     dropAddress: results[0].formatted_address,
          //     dropLatitude: this.latitude,
          //     dropLongitude: this.longitude
          //   })
          // tests.value.forEach((test, index) => {
          //   tests.at(index).patchValue({
          //     pickUpAddress: this.address,
          //     pickUpLatitude: this.latitude,
          //     pickUpLongitude: this.longitude,
          //     dropAddress: this.address,
          //     dropLatitude: this.latitude,
          //     dropLongitude: this.longitude,
          //   })
          // })
          // }


        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  loadRiderAssignForm() {
    this.riderAssignForm = this.fb.group({
      patientsTestsArray: this.fb.array([])
    })
  }

  loadPatientsTestsArray() {
    this.patientsTestsArray = this.riderAssignForm.get('patientsTestsArray') as FormArray;
    this.collectedTests.forEach(test => {
      this.patientsTestsArray.push(this.fb.group({
        patientName: test?.patient?.name,
        latitude: test?.patient?.latitude,
        longitude: test?.patient?.longitude,
        patientId: test?.patient?._id,
        testName: test?.test?.name,
        testId: test?._id,
        pickUpAddress: this.address,
        pickUpLatitude: this.latitude,
        pickUpLongitude: this.longitude,
        dropAddress: this.address,
        dropLatitude: this.latitude,
        dropLongitude: this.longitude,
        hospital: '',
        lab: '',
        isChecked: ''
      }))
    })



  }

  getLabSubDivisions() {

    const labObj = {
      category: 'lab',
      companyId: this.user?.company
    }

    this.service.getSubdivision(labObj).subscribe(data => {
      console.log({ data })
      this.labs = data?.data?.subDivisions
    })
    const hosipitalObj = {
      category: 'hospital',
      companyId: this.user?.company
    }

    this.service.getSubdivision(hosipitalObj).subscribe(hosipitalData => {
      console.log({ hosipitalData })
      this.hospitals = hosipitalData?.data?.subDivisions
    })

  }
  getHosiptalSubDivisions() {
    const hosipitalObj = {
      category: 'hospital',
      companyId: this.user?.company
    }

    this.service.getSubdivision(hosipitalObj).subscribe(hosipitalData => {
      console.log({ hosipitalData })
    })
  }

  //pagenation code start 
  onPageEvent(event) {
    console.log(event, 'event');

    this.isDefault = false;
    this.pageEvent = event;
    this.getRider()
    console.log("page", this.pageEvent?.pageIndex, this.pageEvent?.pageSize)
  }


  getRider() {
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)

    formData['role'] = "rider"
    if (this.sortvalue) {
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.loadriderList(formData)

  }
  //pagenation code end 



  loadriderList(formData) {
    this.service.ridersListDetails(formData).subscribe((resp) => {
      console.log("riderListData", resp)
      this.riderListData = resp?.['data']?.['users']?.filter(user => { return user?.isOnline == true });
      this.length = resp.data.total_count
    })
  }

  // loadriderList() {
  //   let obj = {
  //     role: 'rider'
  //   }
  //   this.service.ridersList(obj).subscribe((resp) => {
  //     if (resp.statusCode == 200) {
  //       this.riderListData = resp?.['data']?.['users'];
  //       // this.length = resp.data.total_count
  //       console.log(this.riderListData, 'riderListData');
  //     }
  //   })
  // }

  selectRider(rider) {
    this.riderInfo = rider
    this.loadMap()
  }


  getPatientTests() {
    const obj = {
      status: 'CollectedByTechnician'
    }
    this.healthService.getCollections(obj).subscribe(data => {
      this.collectedTests = data?.data?.patientTests || []

      let temp = []
      this.collectedTests.forEach(test => {
        console.log({ test })
        const filterPatient = temp.filter(tempTest => {
          return tempTest?.patientId == test?.patientId
        })
        if (filterPatient.length == 0) {
          const obj = {
            patient: test?.patient,
            patientId: test?.patientId,
            tests: [test]
          }
          temp.push(obj)
        }
        if (filterPatient.length > 0) {
          temp.forEach((tempTest, index) => {
            if (tempTest?.patientId == test?.patientId) {
              temp[index].tests.push(test)
            }
          })
        }


      })
      this.collectedPatients = temp
      console.log('collectedTest', this.collectedTests)
      console.log('temp', temp)
      // this.loadPatientsTestsArray()

    })
  }

  checkAssignTest(index, event) {
    const tests = this.riderAssignForm.get('patientsTestsArray') as FormArray;
    tests.at(index).patchValue({
      isChecked: event.target.checked
    })

  }

  assignToRiderPrevious() {
    
    const patientTestsForm = this.riderAssignForm.value.patientsTestsArray || []

    if (patientTestsForm.length > 0) {
      this.spinner.show()
      const patientTests = patientTestsForm.filter(test => { return test?.isChecked == true })

      const tests = []
      patientTests.forEach(test => {
        const obj = {
          testId: test?.testId,
          pickupLocation: {
            address: test?.pickUpAddress,
            latitude: test?.pickUpLatitude,
            longitude: test?.pickUpLongitude,
            id: test?.hospital._id,
          },
          deliveryLocation: {
            address: test?.dropAddress,
            latitude: test?.dropLatitude,
            longitude: test?.dropLongitude,
            id: test?.lab._id,
          }
        }
        tests.push(obj)
      })

      const assignObj = {
        riderId: this.riderInfo._id,
        date: "",
        tests: tests
      }
    
      this.healthService.assignRider(assignObj).subscribe(data => {
        this.spinner.hide()
        this.getPatientTests()
        this.loadRiderAssignForm()
        this.testsGroupForm.reset()
        this.riderInfo = null
        this.address = null
        this.latitude = null,
          this.longitude = null
        this.loadMap()
        Swal.fire('Assigned SuccessFully')
      })
    } else {
      alert('Please select assign tests')
    }
  }

  backToRiders() {
    if (this.riderInfo) {
      const tempdata = this.riderListData.filter(rider => { return rider._id != this.riderInfo._id });
      this.riderListData = tempdata
      this.riderListData.push(this.riderInfo);
      this.riderListData.reverse()
    }
  }


  public statuss = [
    {
      viewName: "SampleAssignedToRider",
      status: "SampleAssignedToRider"
    },
    {
      viewName: "CollectedByRider",
      status: "CollectedByRider"
    },
    {
      viewName: "DeliveredByRider",
      status: "DeliveredByRider"
    },
    {
      viewName: "All",
      status: ""
    },

  ]

  openTests(content, riderSlot: any) {
    this.riderdata = riderSlot
    console.log(this.riderdata, "ravi");


    this.getRiderSlots("SampleAssignedToRider", riderSlot?._id)
    const dialogRef = this.dialog.open(content, {
      width: '100%',
      data: {},
    });

  }
  getRiderSlots(selectType, id) {

    let status = ""

    if (selectType === "CollectedByRider") {
      status = "CollectedByRider"
    }
    if (selectType === "SampleAssignedToRider") {
      status = "SampleAssignedToRider"
    }
    if (selectType === "DeliveredByRider") {
      status = "DeliveredByRider"
    }
    if (selectType === "All") {
      status = ""
    }
    this.healthService.getRiderSlots({ id: id, status }).subscribe(res => {

      if (res.statusCode == 200) {
        res ? (this.riderSlots = res?.data?.riderSlots) : null
        console.log(this.riderSlots, 'riderSlots');
        console.log(this.riderSlots[0]?.deliveryLocation?.address)
      } else {
        this.riderSlots = []
      }
    })
  }
  CurrentAddress() {
    this.loadMap()
  }
  // New 
  selectChange(event) {
    // this.page = 1
    this.status = event.target.value
    this.getRiderSlots(this.status, this.riderdata._id)
  }
  selcetTestInMap(patient) {
    console.log({ patient })
    const temp = []
    const testids = patient?.tests.map(mapTest => {
      return mapTest?._id
    })
    // patient?.tests?.forEach(patientTest => {
    //   console.log({ patientTest })
    this.collectedTests.forEach(test => {
      console.log({ test })
      // == patientTest?._id
      if (testids.includes(test._id)) {
        test['isCheck'] = true
      }
      temp.push(test)
    })
    // })
    this.collectedTests = []
    console.log('testss', this.collectedTests)
    this.collectedTests = temp
    console.log('collectedTests', this.collectedTests)
  }

  loadTestsGroupForm() {
    this.testsGroupForm = this.fb.group({
      pickUpAddress: this.groupAddress,
      pickUpLatitude: this.groupLatitude,
      pickUpLongitude: this.groupLongitude,
      dropAddress: this.groupAddress,
      dropLatitude: this.groupLatitude,
      dropLongitude: this.groupLongitude,
      hospital: '',
      lab: ['',Validators.required],
    })
  }

  dragPickUpORDropLocationMarker($event, isPickUpLocation) {
    this.groupLatitude = $event.coords.lat;
    this.groupLongitude = $event.coords.lng;
    const obj = {
      isPickUp: isPickUpLocation == 'true' ? true : false
    }
    this.selectedSearchAddress = obj
    this.getSeachAddress(this.groupLatitude, this.groupLongitude);

  }

  getSeachAddress(latitude, longitude) {
    console.log('address', latitude, longitude)
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.groupAddress = results[0].formatted_address;
          console.log(this.groupAddress, this.groupLatitude, this.groupLongitude, 'searchAddress')
          console.log('address', this.selectedSearchAddress)
          if (this.selectedSearchAddress?.isPickUp) {
            this.testsGroupForm.patchValue({
              pickUpAddress: this.groupAddress,
              pickUpLatitude: this.groupLatitude,
              pickUpLongitude: this.groupLongitude
            })

          }
          if (!this.selectedSearchAddress?.isPickUp) {
            if (this.selectedSearchAddress != undefined && this.selectedSearchAddress != null) {
              this.testsGroupForm.patchValue({
                dropAddress: results[0].formatted_address,
                dropLatitude: this.groupLatitude,
                dropLongitude: this.groupLongitude,

              })
            }
          }
          if (this.isFirstTimeLoad) {
            this.isFirstTimeLoad = false
            this.testsGroupForm.patchValue({
              dropAddress: results[0].formatted_address,
              dropLatitude: this.groupLatitude,
              dropLongitude: this.groupLongitude,
              pickUpAddress: results[0].formatted_address,
              pickUpLatitude: this.groupLatitude,
              pickUpLongitude: this.groupLongitude
            })
          }


        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  labOnChange(lab) {
    const street = lab?.street
    const city = lab?.city
    const pin = lab?.pin
    const state = lab?.state
    const country = lab?.country
    this.healthService.addressToLatLang(`${street},${city},${state},${pin},${country}`).subscribe(data => {
      if (data) {
        let lat = data?.results[0]?.geometry?.location?.lat
        let lang = data?.results[0]?.geometry?.location?.lng
        let formatAddress = data?.results[0]?.formatted_address
        this.testsGroupForm.patchValue({
          dropAddress: formatAddress,
          dropLatitude: lat,
          dropLongitude: lang,
        })
      } else {
        alert('address not found')
      }

    })
  }
  hospitalOnChange(hospital) {
    const street = hospital?.street
    const city = hospital?.city
    const pin = hospital?.pin
    const state = hospital?.state
    const country = hospital?.country
    this.healthService.addressToLatLang(`${street},${city},${state},${pin},${country}`).subscribe(data => {
      if (data) {
        let lat = data?.results[0]?.geometry?.location?.lat
        let lang = data?.results[0]?.geometry?.location?.lng
        let formatAddress = data?.results[0]?.formatted_address
        this.testsGroupForm.patchValue({
          pickUpAddress: formatAddress,
          pickUpLatitude: lat,
          pickUpLongitude: lang,
        })
      } else {
        alert('address not found')
      }
    })
  }
  sampleAddress(isPickUp) {
    console.log({ isPickUp })
    const obj = {
      isPickUp: isPickUp == 'true' ? true : false
    }
    this.selectedSearchAddress = obj
  }
  addGroup() {
    this.submitted = true;
    if (this.testsGroupForm.invalid) {
      return;
    }
    console.log(this.testsGroupForm.value)
    const { pickUpAddress, pickUpLatitude, pickUpLongitude, dropAddress, dropLatitude, dropLongitude, hospital, lab } = this.testsGroupForm.value
    const tests = this.collectedTests.filter(collectTest => { return collectTest?.isCheck == true });
    this.collectedTests = this.collectedTests.filter(collectTest => { return collectTest?.isCheck != true });
    const obj = {
      groupId: uuidv4(),
      pickUpAddress,
      pickUpLatitude,
      pickUpLongitude,
      dropAddress,
      dropLatitude,
      dropLongitude,
      hospital: hospital,
      lab: lab,
      tests: tests
    }
    if (tests?.length > 0) {
      this.groups.push(obj)
    }
    if (tests?.length == 0) {
      alert('Please Select Tests')
    }
  }
  editGroup(index) {
    const editGrop = this.groups.filter((group, groupIndex) => {
      console.log({ groupIndex, index })
      return groupIndex == index
    })?.[0]
    console.log({ editGrop })
    const { pickUpAddress, pickUpLatitude, pickUpLongitude, dropAddress, dropLatitude, dropLongitude, hospital, lab } = editGrop
    this.testsGroupForm.reset()
    this.testsGroupForm.patchValue({
      pickUpAddress: pickUpAddress,
      pickUpLatitude: pickUpLatitude,
      pickUpLongitude: pickUpLongitude,
      dropAddress: dropAddress,
      dropLatitude: dropLatitude,
      dropLongitude: dropLongitude,
      hospital: '',
      lab: '',
    })
    console.log('patchForm', this.testsGroupForm.value)
  }
  deleteGroup(index: number) {
    this.groups[index].tests.forEach(groupTest => {
      this.collectedTests.push(groupTest)
    })
    this.groups = this.groups.filter((group, groupIndex) => {
      console.log({ groupIndex, index })
      return groupIndex != index
    })
    console.log('afterDelete', this.groups)
  }

  openRiderTests(content, selectedGroupTest) {
    this.selectedGroupTest = selectedGroupTest
    console.log('groupTest', this.selectedGroupTest)
    const dialogRef = this.dialog.open(content, {
      width: '100%',
      data: {},
    });

  }

  deleteTestFromGroup(groupId, groupTest) {
    const filterGroups = []
    this.groups.forEach(group => {
      if (group.groupId == groupId) {
        groupTest['isCheck'] = false
        this.collectedTests.push(groupTest)
        group['tests'] = group?.tests.filter(gTest => { return gTest?._id != groupTest?._id })
      }
      if (group?.tests.length > 0) {
        filterGroups.push(group)
      }
    })
    this.groups = filterGroups
  }

  assignToRider() {
 
    const created_date = moment(this.riderDropDate).format('MM/DD/YYYY')    

    console.log('groups', this.groups)
    if (this.groups.length == 0) {
      alert('Please Add Group(s) With Test(s)')
    } else {
      const riderGroups = []
      this.groups.forEach(group => {
        const { dropAddress, dropLatitude, dropLongitude, hospital, lab, pickUpAddress, pickUpLatitude, pickUpLongitude, tests } = group
        const filterTests = tests?.map(test => {
          return test?._id
        })
        const obj = {
          pickupLocation: {
            address: pickUpAddress,
            latitude: pickUpLatitude,
            longitude: pickUpLongitude,
            id: hospital?._id
          },
          deliveryLocation: {
            address: dropAddress,
            latitude: dropLatitude,
            longitude: dropLongitude,
            id: lab?._id
          },
          tests: filterTests
        }
        riderGroups.push(obj)
      })
      const assignObj = {
        riderId: this.selected_rider,
        isSelfRide: this.selected_rider ? this.selected_rider == 0 : true ?  this.selected_rider == '' : false,
        date: created_date,
        riderGroups: riderGroups
      }
      console.log(assignObj ,'abc')
      this.healthService.assignRider(assignObj).subscribe(data => {
        console.log({ data })
        this.spinner.hide()
        this.getPatientTests()
        this.loadRiderAssignForm()
        this.testsGroupForm.reset()
        this.riderInfo = null
        this.address = null
        this.latitude = null,
          this.longitude = null
        this.groupAddress = '',
          this.groupLatitude = null,
          this.groupLongitude = null
        this.loadMap()
        this.groups = []
        Swal.fire('Assigned SuccessFully')
      })
    }
  }

  dropDate(date){
     this.riderDropDate = date.target.value
  }

  selectedRider(event){
    console.log(event.target.value);
    this.selected_rider = event.target.value
    
      }
    
     
}

