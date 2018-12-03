import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  isDropdownOpen: boolean;

  @Input() dropdownList = [{ name: 'Dashboard', url: '' }, { name: 'About', url: 'pages/about' }];

  constructor(private router: Router, private location: Location) {
    this.isDropdownOpen = false;
  }

  ngOnInit() {}

  toggleDropDownOpen() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToSelectedRoute(item) {
    if (item.url === 'back') {
      this.location.back();
    } else if (item.url === 'print') {
      (window as any).print();
    } else {
      this.router.navigate([item.url]);
    }

    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
