import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  addRoleForm: FormGroup;
  submitted = false;
  headerText: any;
  action: any;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.addRoleForm = this.fb.group({
      displayName: ['', Validators.required],
      roleName: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  get sinr() {
    return this.addRoleForm.controls;
  }

  addRole(content) {
    // this.addRoleForm.reset()
    this.headerText = "ADD"
    this.action = "add"
    const dialogRef = this.dialog.open(content, {
      width: '30rem',
      data: {},

    });
  }


  editRole(content) {
    this.headerText = "UPDATE"

    this.action = "update";

    const dialogRef = this.dialog.open(content, {
      width: '30rem',
      data: {},


    });
  }

  public onClose(): void {
    this.dialog.closeAll();


  }
  submit() {
    this.submitted = true;
    if (this.addRoleForm.invalid) {
      return;
    }
    let obj = {
      
      displayName: this.addRoleForm.value.displayName,
      roleName: this.addRoleForm.value.roleName
    }
    console.log(obj,"kjsdh");
    
    if(this.action === "add"){

    }else {

    }
  }
}
