import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  isDropdownOpen: boolean;

  @Input() dropdownList = [{ name: 'Dashboard', url: '' }, { name: 'About', url: 'pages/about' }];

  constructor(private router: Router) {
    this.isDropdownOpen = false;
  }

  ngOnInit() {}

  toggleDropDownOpen() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToSelectedRoute(item) {
    this.router.navigateByUrl(item.url);
  }
}
