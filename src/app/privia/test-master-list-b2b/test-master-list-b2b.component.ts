import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HealthService } from "src/app/service/health.service";
import Swal from "sweetalert2";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AddTestMasterListB2bComponent } from "./add-test-master-list-b2b/add-test-master-list-b2b.component";
import { NgxPrinterService } from "ngx-printer";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import { saveAs } from "file-saver";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-test-master-list-b2b",
  templateUrl: "./test-master-list-b2b.component.html",
  styleUrls: ["./test-master-list-b2b.component.scss"],
})
export class TestMasterListB2bComponent implements OnInit {
  constructor(
    public health: HealthService,
    public dialog: MatDialog,
    private printerService: NgxPrinterService,
    private cdf: ChangeDetectorRef,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  uploadResults() {
    const dialogRef = this.dialog.open(AddTestMasterListB2bComponent, {
      width: "30rem",
      data: {},
    });
  }
}
