import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.scss']
})
export class AddPaymentsComponent implements OnInit {

  constructor( private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  public onClose(): void{
    this.dialog.closeAll()
  }

}
