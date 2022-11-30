import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  @ViewChild('drawer')
  drawer: any;
  showFiller = false;
  constructor() { }

  ngOnInit(): void {
  }

  drawerToggle(){
    // this.showFiller = !this.showFiller;
    console.log("========================clicked")
    this.drawer.toggle();
  }

}
