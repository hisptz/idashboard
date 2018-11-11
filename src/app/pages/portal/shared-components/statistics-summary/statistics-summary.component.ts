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
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  trustedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
