import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDoctorComponent } from 'src/app/privia/add-doctor/add-doctor.component';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  doctorsProfile = [
    {name:"Dr. Sophie",image:"http://medic-app-react.next-item.com/content/doctor-400-1.jpg",specilist:"Gynecologist"},
    {name:"Dr. Liam",image:"http://medic-app-react.next-item.com/content/doctor-400-2.jpg",specilist:"Dentist"},
    {name:"Dr. Noah",image:"http://medic-app-react.next-item.com/content/doctor-400-3.jpg",specilist:"Nursing"},
    {name:"Dr. Emma",image:"http://medic-app-react.next-item.com/content/doctor-400-4.jpg",specilist:"Audiology"},
    {name:"Dr. James",image:"http://medic-app-react.next-item.com/content/doctor-400-7.jpg",specilist:"Physical Therapy"},
    {name:"Dr. Sophie",image:"http://medic-app-react.next-item.com/content/doctor-400-1.jpg",specilist:"Gynecologist"},
    {name:"Dr. Liam",image:"http://medic-app-react.next-item.com/content/doctor-400-2.jpg",specilist:"Dentist"},
    {name:"Dr. Noah",image:"http://medic-app-react.next-item.com/content/doctor-400-3.jpg",specilist:"Nursing"},
    {name:"Dr. Emma",image:"http://medic-app-react.next-item.com/content/doctor-400-4.jpg",specilist:"Audiology"},
    {name:"Dr. James",image:"http://medic-app-react.next-item.com/content/doctor-400-7.jpg",specilist:"Physical Therapy"}
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addDoctor(){
    const dialogRef = this.dialog.open(AddDoctorComponent, {
      width: '500px',
      data: {}
    });
  }

}
