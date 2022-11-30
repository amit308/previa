import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-sample-reciept-details',
  templateUrl: './sample-reciept-details.component.html',
  styleUrls: ['./sample-reciept-details.component.scss']
})
export class SampleRecieptDetailsComponent implements OnInit {
  displayedColumns: string[] = ['s_no', 'branch', 'sid_no', 'sid_date','patient_name','age','suffix','specimen','container'];
  dataSource = new MatTableDataSource<any>([{}]);

  displayedColumns2: string[] = [ 'test_names','selected'];
  dataSource2 = new MatTableDataSource<any>([{}]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator;

  }
  constructor() { }

  ngOnInit(): void {
  }

}
