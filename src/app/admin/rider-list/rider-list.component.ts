import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddRiderComponent } from '../add-rider/add-rider.component';
import { HealthService } from 'src/app/service/health.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
// import { } from 'googlemaps';
declare var google: any;



@Component({
  selector: 'app-rider-list',
  templateUrl: './rider-list.component.html',
  styleUrls: ['./rider-list.component.scss']
})
export class RiderListComponent implements OnInit {

     //pagination and api integration starts from here
     length = 100;
     pageSize = 10;
     pageSizeOptions: number[] = [5, 10, 25, 50, 100];
     pageEvent: PageEvent;
     isDefault: boolean = true;
     sortDirection: string;
     sortvalue: any;
     //pagination code ends here

  selectedPatientsType = 'all'
  selectedRider: any
  action: string;
  userrole: string;
  riderListData: any
  zoom: number
  address: string;
  private geoCoder;
  model: NgbDateStruct;
  modelDate: any
  public chekInMinDate = undefined
  places = []

  deliverylat: any
  deliverylang: any

  addressIndex: any
  addressTypeFlag = false
  addressList = []
  user: any;
  order_id: any;
  dealer_id: any;
  OIL_COMPANY_NAME: any;
  show: boolean = false;
  deliveryAddress: any

  currentAddressObj: any


  latitude: number;
  longitude: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

// rider view code start 
  riderdata: any
  status = "CollectedByRider";
  mySelect = "CollectedByRider";
  riderSlots: any
  panelOpenState = false;
// rider view code end 

  constructor(
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private service: AdminService,
    public dialog: MatDialog,
    private healthService: HealthService,
    private authService:AuthService,
    private spinner: NgxSpinnerService,
    
  ) { }

  ngOnInit(): void {
    this.getRider()
    this.user = JSON.parse(localStorage.getItem('userDetails'))
    this.getUserAddress()
    this.riderListUpdate()

    

    this.mapLoading()
    const selectAddress = JSON.parse(localStorage.getItem('address'))
    if (selectAddress) {
      if (selectAddress.index == null) {
        this.addressIndex = null
        this.addressTypeFlag = false
      } else {
        this.latitude = selectAddress.lat
        this.latitude = selectAddress.lang
        this.addressIndex = selectAddress.index
        this.addressTypeFlag = true
      }
    } else {

    }

  }
  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  //Api Integration Starts from here
  onPageEvent(event) {
    console.log(event,'event');
    
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
    this.loadRiderList(formData)

  }

  riderListUpdate(){
    this.service.riderListUpdate.subscribe(data =>{
    console.log(data,'riderupdate');
    this.getRider()
    
    })
  }


  loadRiderList(formData) {
    this.service.ridersListDetails(formData).subscribe((resp) => {
      console.log("riderListData", resp)
      // this.riderListData = resp?.['data']?.['users'];
      this.riderListData = resp.data.users

      this.length = resp.data.total_count
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
    formData['role'] = "rider"
    this.loadRiderList(formData)
  }

  openDialog() {
    this.dialog.open(AddRiderComponent);
  }

  CurrentAddress() {
    this.mapLoading()
    this.addressIndex = null
    this.addressTypeFlag = false
  }


  public editRider(Rider): void {
    this.selectedRider = Rider;
    this.action = "update";
    this.userrole = "rider"
    this.addUpdateRider();
    this.dialog.open(AddRiderComponent);

  }

  public addRider(): void {
    this.action = "add";
    this.userrole = "rider"
    this.addUpdateRider();
    this.dialog.open(AddRiderComponent, {
      // width: '500px',
      // height: '450px'
    });

  }
  /* Add technician */
  public addUpdateRider(): void {
    const data = {
      action: this.action,
      role: this.userrole,
      data: this.selectedRider,
    }

    localStorage.setItem("Rider", JSON.stringify(data))


  }



  // Map Marker DragEnd
  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.addressIndex = null
    this.addressTypeFlag = false
    this.deliverylang = this.longitude
    this.deliverylat = this.latitude
    this.getAddress(this.latitude, this.longitude);

  }

  //  GET User Address
  getUserAddress() {
    // const obj = {
    //   "user_id": this.user.USER_ID
    // }

    // this.consumerService.getAddress(obj).subscribe(response => {
    //   if (response.status_code == 200) {
    //     this.addressList = response.data
    //   } else if (response.status_code == 304) {
    //     this.addressList.length = 0;
    //   }
    // })

  }

  getCurrentAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          // this.zoom = 12;
          const address = results[0].formatted_address;

          this.currentAddressObj = {
            order_address: address,
            order_latitude: latitude,
            order_longitude: longitude
          }

          localStorage.setItem('currentAddressObj', JSON.stringify(this.currentAddressObj))

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });


  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.zoom = 12;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.deliverylat = this.latitude
        this.deliverylang = this.longitude
        this.getAddress(this.latitude, this.longitude);
        this.getCurrentAddress(this.latitude, this.longitude)


      });
    }
  }
  // Map Loading
  mapLoading() {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
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
          this.addressIndex = null
          this.addressTypeFlag = false
          this.deliverylang = this.longitude
          this.deliverylat = this.latitude
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });

  }

  //  Get Address from Map
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.deliveryAddress = this.address

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }



  selcetDealerInMap(info) {
    console.log(info, 'info');

  }


  deleteRider(item) {
    console.log(item);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteRider(item._id).subscribe((res) => {
          this.getRider()
          Swal.fire(
            'Deleted!',
            'Rider Has Been Deleted Successfully.',
            'success'
          )
        })
      }
    })

  }

  onToggle(event, id) {
    console.log(event.checked)
    const formData = {
      "isOnlineStatusUpdate": true,
      "isOnline": event.checked,
    }
    this.service.riderUpdate(id, formData).subscribe((resp) => {
      if (resp.statusCode == 200) {
        this.getRider()
        Swal.fire('Status Updated Successfully');

      }
    })
  }

  selectChange(event) {
    // this.page = 1
    this.status = event.target.value
    this.getRiderSlots(this.status, this.riderdata._id)
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


    this.getRiderSlots("Pending", riderSlot?._id)
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
      } else {
        this.riderSlots = []
      }
    })
  }
  resendPassword(data){
    Swal.fire({
      title: 'Are you sure want send password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        this.authService.reSendPassword({userId:data._id}).subscribe((res :any) =>{
          this.spinner.hide()
          Swal.fire(res.message)
        },
        (err)=>{
         this.spinner.hide()
        }
        )
      }})
   
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


