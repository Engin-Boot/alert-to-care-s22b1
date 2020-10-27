import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bed-layout-display',
  templateUrl: './bed-layout-display.component.html',
  styleUrls: ['./bed-layout-display.component.css']
})
export class BedLayoutDisplayComponent implements OnInit {
  Arr = Array; //Array type captured in a variable
  array=Array;
  cnum:number = 4;
  rnum:number=4;
  constructor() { }

  ngOnInit(): void {
  }

}
