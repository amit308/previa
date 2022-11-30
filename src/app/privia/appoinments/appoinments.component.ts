import {AfterViewInit,ViewChild, Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditAppointmentComponent} from './../edit-appointment/edit-appointment.component';
import {AddAppointmentComponent} from './../add-appointment/add-appointment.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss']
})
export class AppoinmentsComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'name', 'email', 'date','Visit_time','number','doctor','condition','Actions'];
  dataSource:any

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
   let data = [
      {photo:'',name:'Liam',email:'liam@gmail.com',date:'18 Dec 2018',Visit_time:'10:15 - 10:30',number:'0126596578',doctor:'Dr. Sophie',condition:'allergy'}
     
    ];
    this.dataSource = new MatTableDataSource<any>(data);
  }

  editAppointment(){
    const dialogRef = this.dialog.open(EditAppointmentComponent, {
      width: '500px',
      data: {}
    });
  }

  addAppointment(){
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '500px',
      data: {}
    });
  }

}


