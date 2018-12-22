import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-statistics-summary',
  templateUrl: './statistics-summary.component.html',
  styleUrls: ['./statistics-summary.component.css']
})
export class StatisticsSummaryComponent implements OnInit {

  @Input() statsSummaryGroups: Array<any>;
  @Input() subPages: any;
  @Input() activeId: string;
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.activeId) {
      this.showTheActiveOption(this.activeId);
    }
  }

  trustedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  showTheActiveOption(id) {
    const navTabs = document.getElementsByClassName('nav-link');
    if (navTabs.length > 0) {
      for (let i = 0; i < navTabs.length; i++) {
        document.getElementById(navTabs[i].id).classList.remove('active');
        if (navTabs[i].id === id + '-tab') {
          try {
            document.getElementById(navTabs[i].id).classList.add('active');
            // console.log(document.getElementById(navTabs[i].id).classList)
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  }
}
