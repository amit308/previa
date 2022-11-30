import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-scheme-master',
  templateUrl: './scheme-master.component.html',
  styleUrls: ['./scheme-master.component.scss']
})
export class SchemeMasterComponent implements OnInit {
  displayedColumns: string[] = ['s_no', 'branch_name', 'scheme_name', 'default','inactive','option'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor() { }

  ngOnInit(): void {
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {s_no: 1, branch_name: 'Kakinada', scheme_name: 'Basic-scheme-CN', symbol: 'H'},
  {s_no: 2, branch_name: 'Visakapatnam', scheme_name: 'default scheme', symbol: 'He'},
  {s_no: 3, branch_name: 'Kakinada', scheme_name: 'default scheme', symbol: 'Li'},
  {s_no: 4, branch_name: 'Kakinada', scheme_name: 'default scheme', symbol: 'Be'},
  {s_no: 5, branch_name: 'Kakinada', scheme_name: 'default scheme', symbol: 'B'},
  {s_no: 6, branch_name: 'Kakinada', scheme_name: 'default scheme', symbol: 'C'}
];