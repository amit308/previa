import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promea',
  templateUrl: './promea.component.html',
  styleUrls: ['./promea.component.scss']
})
export class PromeaComponent implements OnInit {
  pdfSrc = ''
  constructor(private acRoute: ActivatedRoute) {
    this.acRoute.queryParams.subscribe(data => {
      console.log({data})
       const fileName =  Object.keys(data)
      this.pdfSrc = `https://portal.previahealth.in/promea/${fileName}`

    })

  }

  ngOnInit(): void {
  }

}
