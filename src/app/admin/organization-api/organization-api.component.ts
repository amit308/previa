import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-organization-api',
  templateUrl: './organization-api.component.html',
  styleUrls: ['./organization-api.component.scss']
})
export class OrganizationApiComponent implements OnInit {
  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  ApiForm: FormGroup;
  submitted: false;
  //pagination code ends here

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.ApiForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      url: ['', Validators.required],
      referalcode: ['', Validators.required]
    })

  }
  get f() {
    return this.ApiForm.controls;
  }
  ngOnInit(): void {
  }
  onPageEvent(event) {


    this.isDefault = false;
    this.pageEvent = event;

    console.log("page", this.pageEvent?.pageIndex, this.pageEvent?.pageSize)
  }
  addApi(content) {
    this.ApiForm.reset()

    const dialogRef = this.dialog.open(content, {
      width: '30rem',
      data: {},


    });
  }
  public onClose(): void {
    this.dialog.closeAll();
  }
  submit() {

  }
  AddRow() {

  }

}
