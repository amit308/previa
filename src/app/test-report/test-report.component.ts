import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { HealthService } from '../service/health.service';
@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss'],
})
export class TestReportComponent implements OnInit {
  name: string;
  testName: string;
  testId: any;
  patientId: any;
  subdivision_id:any
  constructor(public health: HealthService, public router: ActivatedRoute) {
    this.router.queryParams.subscribe((data) => {
      this.testId = data?.testId;
      this.patientId = data?.patientId;
      this.name = data?.name;
      this.testName = data?.test;
      this.subdivision_id = data?.subdivision_id
      this.downloadPdf();
    });
  }

  ngOnInit(): void {}
  downloadPdf() {
    const reqObj = {
      testId: this.testId,
      patientId: this.patientId,
      isHeader: true,
      isReferralPatient: true,
      subdivision_id: this.subdivision_id
    };
    
    this.health.downloadReport(reqObj).subscribe((res) => {
      const fileName = this.name + '_' + this.testName
      saveAs(res.data, fileName + '.pdf');
    });
  }
}
