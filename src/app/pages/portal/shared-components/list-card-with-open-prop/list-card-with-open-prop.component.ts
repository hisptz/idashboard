import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-card-with-open-prop',
  templateUrl: './list-card-with-open-prop.component.html',
  styleUrls: ['./list-card-with-open-prop.component.css']
})
export class ListCardWithOpenPropComponent implements OnInit {

  @Input() listObj: any;
  constructor() { }

  ngOnInit() {
  }

}
