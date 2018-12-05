import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-horizontal-scrolling',
  templateUrl: './horizontal-scrolling.component.html',
  styleUrls: ['./horizontal-scrolling.component.css']
})
export class HorizontalScrollingComponent implements OnInit {

  @Input() scrollingInfo: any;
  constructor() { }

  ngOnInit() {
  }

}
