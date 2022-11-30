import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-pehlebotomy',
  templateUrl: './pehlebotomy.component.html',
  styleUrls: ['./pehlebotomy.component.scss']
})
export class PehlebotomyComponent implements OnInit {
  displayedColumns: string[] = ['s_no', 'suffix', 'specimen', 'container','select'];
  dataSource = new MatTableDataSource<any>([{}]);

  displayedColumns2: string[] = ['s_no', 'test_names','selected'];
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
];
