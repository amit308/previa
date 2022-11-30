import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddfinancemanagerComponent } from '../addfinancemanager/addfinancemanager.component';
import { AddFrontOfficeComponent } from '../dailog-componrnts/add-front-office/add-front-office.component';
@Component({
  selector: 'app-financemanager',
  templateUrl: './financemanager.component.html',
  styleUrls: ['./financemanager.component.scss']
})
export class FinancemanagerComponent implements OnInit {
  length=100;
  pageSize=10;
  pageSizeOptions=[5,10,20,50,100];
  action:any;
  userrole:any;
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  public addManager():void{
    this.action="add";
    this.userrole = "manager"
    this.addUpdateFrontOffice();
  }
  public addUpdateFrontOffice(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        role:this.userrole,
        // data: this.selectedFrontOffice,
      });
    const dialogRef = this.dialog.open(
      AddfinancemanagerComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      
    });
  }
}
