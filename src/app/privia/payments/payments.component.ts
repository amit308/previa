import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddPaymentsComponent } from './add-payments/add-payments.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['bill', 'patient', 'doctor', 'date','charges','tax','discount','total'];
  dataSource:any

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    let data = [
      {bill:'111',patient:'Pooja Patel	',doctor:'Juan Freeman',date:'12/10/2020',charges:'320',tax:'10',discount:'5',total:'340'},
      {bill:'112',patient:'Pooja Patel	',doctor:'Juan Freeman',date:'12/10/2020',charges:'320',tax:'10',discount:'5',total:'340'},
      {bill:'113',patient:'Pooja Patel	',doctor:'Juan Freeman',date:'12/10/2020',charges:'320',tax:'10',discount:'5',total:'340'},
      {bill:'114',patient:'Pooja Patel	',doctor:'Juan Freeman',date:'12/10/2020',charges:'320',tax:'10',discount:'5',total:'340'},
      {bill:'115',patient:'Pooja Patel	',doctor:'Juan Freeman',date:'12/10/2020',charges:'320',tax:'10',discount:'5',total:'340'},
     
    ];
    this.dataSource = new MatTableDataSource<any>(data);
  }
  addPayments(){
    const dialogRef = this.dialog.open(AddPaymentsComponent, {
      width: '500px',
      data: {}
    });
  }

}
