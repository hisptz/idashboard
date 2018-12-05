import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-move-item-btn',
  templateUrl: './move-item-btn.component.html',
  styleUrls: ['./move-item-btn.component.css']
})
export class MoveItemBtnComponent implements OnInit {

  @Input() isLeft: boolean;
  constructor() { }

  ngOnInit() {
  }

}
