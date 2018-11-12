import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-header-menu',
  templateUrl: './top-header-menu.component.html',
  styleUrls: ['./top-header-menu.component.css']
})
export class TopHeaderMenuComponent implements OnInit {

  @Input() portalPages: any;
  constructor() {
  }

  ngOnInit() {
  }


  setActiveClass(id) {
    const items = document.getElementsByClassName('top-btn');
    for (let count = 0; count < items.length; count++) {
      // document.getElementById(items[count].id).style.backgroundColor = '#2390D2';
    }
    // document.getElementById(id).style.backgroundColor = '#3779B6';
  }

  executeForNavigation () {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
}
